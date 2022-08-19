for /d %%i in (*) do ( 
    cd %%i
    start cmd /C npm run serve
    cd ..
)
