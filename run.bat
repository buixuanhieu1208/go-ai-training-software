@echo off
title Khoi dong Game Co Vay AI
chcp 65001 >nul
echo ========================================================
echo     DANG KHOI DONG HE THONG CO VAY AI TU DONG...
echo ========================================================

:: 1. Kéo đầy đủ file nặng từ Git LFS nếu máy chưa tải
echo [*] Kiem tra du lieu mo hinh AI...
git lfs pull

:: 2. Kiem tra va cai thu vien Backend (Python)
echo [*] Kiem tra thu vien Backend...
cd backend_ai
pip install -r requirements.txt >nul 2>&1

:: 3. Bat Backend AI o mot cua so rieng
echo [*] Dang bat Backend AI Server...
start "Backend AI Server" cmd /k "python main.py"
cd ..

:: 4. Kiem tra va cai dat thu vien Frontend (Node.js)
echo [*] Kiem tra giao dien Frontend...
cd frontend_ui
if not exist "node_modules\" (
    echo [*] Phat hien lan dau khoi dong, dang cai dat node_modules...
    npm install
)

:: 5. Bat Frontend va tu dong mo trinh duyet
echo [*] Dang khoi chay giao dien tren trinh duyet...
start "Frontend UI" cmd /k "npm run dev"

echo ========================================================
echo   HE THONG DA KHOI DONG XONG!
echo ========================================================
pause