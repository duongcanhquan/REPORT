/* --- Cài đặt chung & Font chữ --- */
:root {
    --primary-color: #0056b3;
    --primary-hover: #004a99;
    --background-color: #f0f2f5;
    --container-bg: #ffffff;
    --text-color: #333;
    --border-color: #ccc;
    --success-color: #28a745;
    --error-color: #dc3545;
}

body {
    font-family: 'Be Vietnam Pro', sans-serif; /* Sử dụng font mới */
    background-color: var(--background-color);
    color: var(--text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    font-size: 16px; /* Tăng kích thước chữ cơ bản */
}

/* --- Bố cục chính --- */
.container {
    background-color: var(--container-bg);
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 600px;
    text-align: center;
    transition: all 0.3s ease;
}

.logo {
    max-width: 180px;
    margin-bottom: 24px;
}

h1 {
    color: var(--primary-color);
    font-size: 2em; /* Chữ to và rõ */
    margin-bottom: 1rem;
    font-weight: 700;
}

p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
}

/* --- Form và các thành phần --- */
.form-group {
    margin-bottom: 1.5rem;
    text-align: left;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 1.1rem;
}

input, select, textarea {
    width: 100%;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    box-sizing: border-box;
    font-size: 1rem;
    font-family: 'Be Vietnam Pro', sans-serif;
    transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.2);
}

button {
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    border: none;
    background-color: var(--primary-color);
    color: white;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}

button:hover {
    background-color: var(--primary-hover);
    transform: translateY(-2px);
}

button:disabled {
    background-color: #999;
    cursor: not-allowed;
}

/* --- Các lớp tiện ích --- */
.hidden {
    display: none;
}

#other-detail-input {
    margin-top: 10px; /* Thêm khoảng cách khi ô này hiện ra */
}

#message {
    margin-top: 20px;
    font-weight: 500;
    font-size: 1.1rem;
}

.success { color: var(--success-color); }
.error { color: var(--error-color); }

/* --- Responsive cho điện thoại --- */
@media (max-width: 600px) {
    body {
        padding: 10px;
    }
    .container {
        padding: 20px;
    }
    h1 {
        font-size: 1.5em;
    }
}
