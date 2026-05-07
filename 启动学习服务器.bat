@echo off
chcp 65001 >nul
title 火山售前学习 · 本地服务器
cd /d "%~dp0"

echo.
echo ============================================================
echo   火山引擎售前学习 PWA · 本地服务器
echo ============================================================
echo.
echo  电脑访问：http://localhost:8766/
echo.

rem 自动探测本机局域网 IP（同 WiFi 下手机用此地址访问）
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /R /C:"IPv4.*192\.168\." /C:"IPv4.*10\." /C:"IPv4.*172\."') do (
    for /f "tokens=* delims= " %%b in ("%%a") do (
        echo  手机访问：http://%%b:8766/    ^(同一 WiFi 下^)
    )
)

echo.
echo  关闭此窗口即停止服务器。
echo ============================================================
echo.

python -m http.server 8766
