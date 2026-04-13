@echo off
title Subir Cambios a GitHub (LinkSurprise)
color 0A

echo ==================================================
echo       LINK SURPRISE - SUBIDA A GITHUB ACTIVA      
echo ==================================================
echo.

:: 1. Agrega todos los archivos nuevos y modificados
echo [+] Detectando archivos modificados...
git add -A

:: 2. Pide un mensaje al usuario para guardar en el historial
echo.
set /p mensaje="Escribe el resumen de tus cambios (Ej: Subiendo panel admin) o presiona Enter para usar autoguardado: "

:: Si no pone nada, usa la fecha y hora por defecto
if "%mensaje%"=="" (
    echo [*] Guardando con mensaje automatico de fecha y hora...
    git commit -m "Auto-guardado: %date% %time%"
) else (
    echo [*] Guardando cambios con tu mensaje...
    git commit -m "%mensaje%"
)

:: 3. Lo envía a GitHub
echo.
echo [+] Subiendo a la nube (GitHub)...
git push

echo.
echo ==================================================
echo          ¡SUBIDO CON EXITO A GITHUB! ✅           
echo ==================================================
pause
