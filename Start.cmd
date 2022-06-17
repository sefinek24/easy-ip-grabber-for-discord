@echo off
chcp 65001
color 2
title EASY DISCORD IP GRABBER
cls

echo =============================================================================================
echo                                    EASY DISCORD IP GRABBER
echo                   https://github.com/sefinek24/easy-ip-grabber-for-discord
echo ============================================================================================= & echo.

echo Kontrola wymaganych zależności... & echo.

if not exist "%ProgramFiles%\nodejs\node.exe" (
    echo » Node.exe nie zostało odnalezione w lokalizacji %ProgramFiles%\nodejs\node.exe. & echo.
    echo Na pewno środowisko uruchomieniowe Node.js zostało zainstalowane na Twoim komputerze?
    echo https://nodejs.org/en & echo.

    set /p = Kliknij [ENTER], aby zamknąć plik wsadowy.
    exit
)

if not exist node_modules (
    echo » Katalog node_modules nie istnieje!
    echo Wymagane zależności zostaną zainstalowane za 9 sekund.
    echo Kliknij dowolny przycisk, aby zainstalować je natychmiast.
    timeout /t 9 & echo.

    echo Trwa instalacja i aktualizacja zależności... & echo.
    npm install
    npm update
    npm audit fix
    start.cmd
)

if not exist .env (
    echo » Plik .env nie został odnaleziony.

    if exist .env.default (
        echo Jednakże został odnaleziony plik .env.default!
        echo.
        set /p = Kliknij [ENTER], aby skrypt sam zmienił jego nazwę.
        echo.
        rename .env.default .env
        start notepad.exe .env

        echo Gotowe! Uruchomiłem ten dokument, abyś mógł wkleić link swojego webhooka w wyznaczone miejsce.
        echo Pamiętaj by zapisać dokument klikając CTRL + S.
        set /p = Jeżeli wykonasz tę czynności, kliknij klawisz [ENTER]. & echo.
    ) else (
        echo Pobierz ponownie pliki z repozytorium. & echo.
        pause
        exit
    )
)

echo Wszystko gra!
echo.
echo =============================================================================================
echo.

node .
echo.
echo Ups. Cos poszło nie tak ):
pause