SET SBS_REPO_ROOT=d:\sbs
xcopy %SBS_REPO_ROOT%\release\build.json %~dp0 /F/R/Y
xcopy %SBS_REPO_ROOT%\release\android\ant.properties %~dp0res\native\android\ /F/R/Y
xcopy %SBS_REPO_ROOT%\release\android\ant.properties %~dp0res\native\android\ /F/R/Y

