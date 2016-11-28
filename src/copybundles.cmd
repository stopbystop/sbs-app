echo f | xcopy %~dp0\client\outscripts\sbsbundle.js.min.js %~dp0\cordova\www\scripts\sbsbundle.min.js /F/R/Y
echo f | xcopy %~dp0\client\outscripts\sbsbundle.js %~dp0\cordova\www\scripts\sbsbundle.js /F/R/Y
echo f | xcopy %~dp0\client\content\sbsbundle.css.min.css %~dp0\cordova\www\css\sbsbundle.min.css /F/R/Y
echo f | xcopy %~dp0\client\content\sbsbundle.css %~dp0\cordova\www\css\sbsbundle.css /F/R/Y
echo f | xcopy %~dp0\client\content\fonts\*.* %~dp0\cordova\www\fonts\ /F/R/Y/S
for /r %~dp0\client\content\v1 %%f in (*.*) do @xcopy "%%f" %~dp0\cordova\www\images\ /F/R/Y

echo f | xcopy %~dp0\client\outscripts\webbundle.js %~dp0\web\client\scripts\webbundle.js /F/R/Y
echo f | xcopy %~dp0\client\outscripts\sbsbundle.js %~dp0\web\client\scripts\sbsbundle.js /F/R/Y
echo f | xcopy %~dp0\client\content\*.css %~dp0\web\client\content\ /F/R/Y
echo f | xcopy %~dp0\client\content\v1\*.* %~dp0\web\client\content\v1\ /F/R/Y/S
echo f | xcopy %~dp0\client\content\fonts\*.* %~dp0\web\client\content\fonts\ /F/R/Y/S