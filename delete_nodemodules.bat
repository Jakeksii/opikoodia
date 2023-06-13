@echo off
setlocal

for /d /r %%d in (node_modules) do (
    echo Deleting "%%d"...
    rd /s /q "%%d" 2>nul
)

echo Deletion of node_modules folders completed.