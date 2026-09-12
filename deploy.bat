@echo off
echo ===================================================
echo   ToolCraftKit - Deploy to Vercel
echo ===================================================
echo.

cd /d J:\TOOLKRAFKIT\toolcraftkit

echo Adding all changes...
git add -A

echo.
echo Committing...
git commit -m "update %date% %time:~0,5%"

echo.
echo Pushing to GitHub (triggers Vercel auto-deploy)...
git push origin main

echo.
echo ===================================================
echo   Done! Vercel will auto-deploy in ~2 minutes.
echo ===================================================
echo.
pause
