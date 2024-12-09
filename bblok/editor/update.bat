copy c:\tsmodule\basik.d.ts .\src\dts\
rem copy c:\tsmodule\bblok.d.ts .\src\dts\
rem copy c:\tsmodule\js.d.ts .\src\dts\
rem copy c:\tsmodule\obj.d.ts .\src\dts\

@REM call uglifyjs \tsmodule\be.js \tsmodule\be.min.js
@REM copy \tsmodule\be.min.js .\web\js\be.min.js

@rem //TODO: dibundle
copy c:\tsmodule\basik.js .\build\js\
@REM copy c:\tsmodule\bblok.js .\build\js\
@REM copy c:\tsmodule\js.js .\build\js\
@REM copy c:\tsmodule\obj.js .\build\js\

@rem //TODO: copy image

pause
pause