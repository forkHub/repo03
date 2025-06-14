@echo off
echo off

call staging.bat

pause

set BB_DEST_DIR=D:\xampp4\htdocs\io\bblok

echo ZIP:
echo.
7z a -tzip bblok ./build/*

echo copy ke google drive
xcopy bblok.zip "G:\My Drive\blockly"

echo copy ke folder publish
xcopy .\build\* %BB_DEST_DIR% /i /s /y

pause
pause
