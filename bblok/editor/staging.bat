call build.bat

echo staging:
echo ========
xcopy .\dist\index.html .\build
xcopy .\dist\bundle.js .\build

pause
pause