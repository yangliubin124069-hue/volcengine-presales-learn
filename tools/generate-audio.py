#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
为火山引擎学习 PWA 的所有互动视频预生成 MP3 朗读音频
用法：
    pip install edge-tts
    python tools/generate-audio.py
        [--voice zh-CN-XiaoxiaoNeural]   # 默认晓晓（女声温柔）
        [--rate +0%]                       # 语速调节 e.g. +10% / -10%
        [--only day13]                     # 只生成单个视频（调试用）
        [--force]                          # 强制重新生成（覆盖已有 MP3）

输出：
    lessons/audio/<videoid>/<slideIdx>.mp3
    lessons/audio/manifest.json   (列出所有已生成的视频)

可选 voice（高质量中文）：
    zh-CN-XiaoxiaoNeural    (女·温柔·默认)
    zh-CN-XiaoyiNeural      (女·活泼)
    zh-CN-YunxiNeural       (男·阳光)
    zh-CN-YunyangNeural     (男·新闻)
    zh-CN-YunjianNeural     (男·浑厚)
    zh-CN-liaoning-XiaobeiNeural  (女·东北)
    zh-CN-shaanxi-XiaoniNeural    (女·陕西)
"""

import argparse
import asyncio
import json
import re
import sys
from pathlib import Path

try:
    import edge_tts
except ImportError:
    print("❌ 缺少 edge-tts，请先安装：pip install edge-tts")
    sys.exit(1)


ROOT = Path(__file__).resolve().parent.parent
LESSONS_DIR = ROOT / "lessons"
AUDIO_ROOT = LESSONS_DIR / "audio"


def extract_voices_from_html(html_path: Path):
    """
    从 video.html 文件中提取所有 slide 的 voice 文本。
    voice 字段格式：voice: '...' 单行字符串。
    返回有序列表。
    """
    text = html_path.read_text(encoding="utf-8")

    # 用非贪婪正则匹配单引号包围的 voice 字符串
    # 注意：voice 内部可能有转义的单引号 \'，但实际我们的 voice 都不含
    pattern = re.compile(r"voice:\s*'((?:[^'\\]|\\.)*)'", re.DOTALL)
    matches = pattern.findall(text)

    # 反转义
    voices = []
    for raw in matches:
        s = raw.replace("\\'", "'").replace("\\n", "\n").replace("\\\\", "\\")
        # 去掉零宽空格、控制字符
        s = re.sub(r"[​-‏﻿]", "", s).strip()
        if s:
            voices.append(s)

    return voices


def video_id_from_filename(filename: str) -> str:
    """day13-video.html → day13；comp03-video.html → comp03"""
    return filename.replace("-video.html", "")


async def generate_one(text: str, out_path: Path, voice: str, rate: str):
    """生成单条 MP3"""
    communicate = edge_tts.Communicate(text=text, voice=voice, rate=rate)
    await communicate.save(str(out_path))


async def process_video(html_path: Path, voice: str, rate: str, force: bool):
    vid = video_id_from_filename(html_path.name)
    voices = extract_voices_from_html(html_path)
    if not voices:
        print(f"  ⚠️  {html_path.name}：未提取到 voice 字段，跳过")
        return None

    out_dir = AUDIO_ROOT / vid
    out_dir.mkdir(parents=True, exist_ok=True)

    print(f"\n📺 {vid} · {len(voices)} 段 voice")
    success = 0
    failed = 0

    for i, text in enumerate(voices):
        out_path = out_dir / f"{i}.mp3"
        if out_path.exists() and not force:
            print(f"  ✓ [{i+1}/{len(voices)}] 已存在跳过")
            success += 1
            continue

        try:
            await generate_one(text, out_path, voice, rate)
            size_kb = out_path.stat().st_size // 1024
            print(f"  ✓ [{i+1}/{len(voices)}] {size_kb:>4} KB · {text[:40]}{'...' if len(text)>40 else ''}")
            success += 1
        except Exception as e:
            print(f"  ✗ [{i+1}/{len(voices)}] 失败：{e}")
            failed += 1

    return {
        "videoId": vid,
        "count": len(voices),
        "success": success,
        "failed": failed,
        "voice": voice,
    }


async def main():
    parser = argparse.ArgumentParser(description="批量生成视频朗读 MP3")
    parser.add_argument("--voice", default="zh-CN-XiaoxiaoNeural",
                        help="Edge TTS voice（默认 XiaoxiaoNeural 女声温柔）")
    parser.add_argument("--rate", default="+0%",
                        help="语速调节如 +10% / -10%（默认 +0%）")
    parser.add_argument("--only", default=None,
                        help="只生成单个视频如 day13 或 comp03")
    parser.add_argument("--force", action="store_true",
                        help="强制重新生成（覆盖已有 MP3）")
    args = parser.parse_args()

    if not LESSONS_DIR.exists():
        print(f"❌ 找不到 lessons/ 目录：{LESSONS_DIR}")
        sys.exit(1)

    AUDIO_ROOT.mkdir(parents=True, exist_ok=True)

    # 找所有 *-video.html
    html_files = sorted(LESSONS_DIR.glob("*-video.html"))
    if args.only:
        html_files = [f for f in html_files if video_id_from_filename(f.name) == args.only]
        if not html_files:
            print(f"❌ 没找到 {args.only}-video.html")
            sys.exit(1)

    print(f"🎙 voice={args.voice}  rate={args.rate}")
    print(f"📁 输出到 {AUDIO_ROOT}")
    print(f"🎬 共 {len(html_files)} 个视频文件")

    manifest = {
        "voice": args.voice,
        "rate": args.rate,
        "videos": {}
    }

    # 加载已有 manifest 合并
    manifest_path = AUDIO_ROOT / "manifest.json"
    if manifest_path.exists():
        try:
            old = json.loads(manifest_path.read_text(encoding="utf-8"))
            manifest["videos"].update(old.get("videos", {}))
        except Exception:
            pass

    total_success = 0
    total_failed = 0

    for html_path in html_files:
        result = await process_video(html_path, args.voice, args.rate, args.force)
        if result:
            manifest["videos"][result["videoId"]] = {
                "count": result["count"],
            }
            total_success += result["success"]
            total_failed += result["failed"]

    # 写 manifest
    manifest_path.write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2),
        encoding="utf-8"
    )
    print(f"\n📝 manifest 写入 {manifest_path}")
    print(f"\n✅ 完成 · 成功 {total_success} 段 · 失败 {total_failed} 段")
    print(f"\n下一步：")
    print(f"  cd {ROOT}")
    print(f"  git add lessons/audio/")
    print(f"  git commit -m 'feat(audio): 预生成 MP3 朗读音频包'")
    print(f"  git push")


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n中止")
        sys.exit(1)
