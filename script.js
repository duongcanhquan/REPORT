/* --- Cài đặt chung & Biến màu --- */
:root {
    --primary-color: #0056b3;
    --primary-hover: #004a99;
    --background-color: #f4f7f9; /* Màu nền nhẹ nhàng hơn */
    --container-bg: #ffffff;
    --text-color: #212529; /* Màu chữ đậm hơn, dễ đọc */
    --muted-text-color: #6c757d; /* Màu chữ phụ */
    --border-color: #dee2e6;
    --success-color: #28a745;
    --error-color: #dc3545;
}

body {
    font-family: 'Be Vietnam Pro', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    font-size: 16px;
}

/* --- Bố cục chính --- */
.container {
    background-color: var(--container-bg);
    padding: 30px 40px;
    border-radius: 12px;
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
    width: 100%;
    max-width: 700px;
    text-align: center;
}

/* --- Phần tử Thương hiệu và Văn bản --- */
.logo { 
    max-width: 220px; /* Kích thước logo vừa phải */
    height: auto;
    margin: 0 auto 25px auto;
    display: block;
}

h1 { 
    color: var(--primary-color); 
    font-size: 1.8em; /* Giảm kích thước H1 một chút */
    margin-bottom: 1rem; 
    font-weight: 700;
    text-transform: uppercase;
}

p { 
    font-size: 1rem; /* Chuẩn hóa kích thước P */
    line-height: 1.6; 
    margin-bottom: 1rem;
    color: var(--muted-text-color);
}

.instruction { 
    text-align: left; 
    margin-bottom: 1.5rem; 
    font-size: 1.1rem;
    color: var(--text-color); /* Chữ đậm hơn cho hướng dẫn */
}

/* --- Form và các Thành phần Nhập liệu --- */
.form-group { 
    margin-bottom: 2rem; 
    text-align: left; 
}

label { 
    display: block; 
    margin-bottom: 8px; 
    font-weight: 500; 
    font-size: 1rem; 
}

input, select, textarea { 
    width: 100%; 
    padding: 12px 15px; /* Giảm padding dọc một chút */
    border-radius: 8px; 
    border: 1px solid var(--border-color); 
    box-sizing: border-box; 
    font-size: 1rem; 
    font-family: 'Be Vietnam Pro', sans-serif; 
    transition: border-color 0.3s, box-shadow 0.3s; 
}

textarea { 
    min-height: 110px; 
}

input:focus, select:focus, textarea:focus { 
    outline: none; 
    border-color: var(--primary-color); 
    box-shadow: 0 0 0 4px rgba(0, 86, 179, 0.15); 
}

button { 
    width: 100%; 
    padding: 15px; 
    border-radius: 8px; 
    border: none; 
    background-color: var(--primary-color); 
    color: white; 
    font-size: 1.1rem; /* Giảm kích thước chữ nút bấm */
    font-weight: 700; 
    cursor: pointer; 
    transition: background-color 0.3s, transform 0.2s; 
    margin-top: 20px; 
}

button:hover { 
    background-color: var(--primary-hover); 
    transform: translateY(-2px); 
}

button:disabled { 
    background-color: #999; 
    cursor: not-allowed; 
    transform: none; 
}

/* --- Các Hạng mục Báo cáo (Cập nhật theo yêu cầu) --- */
.report-category {
    text-align: left;
    padding-top: 20px;
    border-top: 1px solid var(--border-color); /* Dùng đường kẻ ngang để phân chia */
    margin-top: 25px;
}

.report-category h2 {
    margin: 0;
    font-size: 1.2rem; /* Giảm kích thước H2 */
    font-weight: 700;
    color: var(--text-color);
    text-transform: uppercase; /* Tự động viết hoa */
}

.category-note {
    font-size: 0.85rem; /* Chữ nhỏ hơn */
    color: var(--muted-text-color);
    margin: 4px 0 12px 0; /* Khoảng cách hợp lý */
    font-style: italic;
    line-height: 1.5;
}

/* --- Các lớp Tiện ích --- */
.hidden { 
    display: none; 
}
#message { 
    margin-top: 20px; 
    font-weight: 500; 
    font-size: 1rem; 
}
.success { color: var(--success-color); }
.error { color: var(--error-color); }

/* --- Responsive cho Thiết bị Di động --- */
@media (max-width: 600px) {
    body { 
        padding: 10px; 
    }
    .container { 
        padding: 20px 25px; /* Điều chỉnh padding cho di động */
    }
    h1 { 
        font-size: 1.6em; 
    }
    .logo { 
        max-width: 160px; /* Logo nhỏ hơn trên điện thoại */
        margin-bottom: 20px;
    }
    button {
        padding: 14px;
        font-size: 1rem;
    }
    textarea {
        min-height: 100px;
    }
}
