document.addEventListener('DOMContentLoaded', function() {
    // Lấy các thành phần DOM
    const loginContainer = document.getElementById('login-container');
    const reportContainer = document.getElementById('report-container');
    const continueBtn = document.getElementById('continue-btn');
    const reporterNameInput = document.getElementById('reporter-name');
    const reportForm = document.getElementById('report-form');
    const messageEl = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const hangMucSelect = document.getElementById('hang-muc');
    const chiTietSelect = document.getElementById('chi-tiet');
    const otherDetailInput = document.getElementById('other-detail-input');
    const noiDungInput = document.getElementById('noi-dung'); // Thêm textarea

    let reporterName = '';

    const subCategories = {
        "Cơ sở vật chất": ["Vệ Sinh", "An Ninh/ An toàn", "Thiết Bị Dạy Học", "Khác"],
        "Tác phong CBNV": ["Trang Phục", "Nề Nếp & Giao tiếp", "Khác"],
        "Tác phong sinh viên": ["Trang Phục", "Nề Nếp & Giao tiếp", "Khác"],
        "Các vấn đề khác": ["Vấn đề khác"]
    };

    // Xử lý chuyển từ màn hình đăng nhập sang form
    continueBtn.addEventListener('click', function() {
        if (reporterNameInput.value.trim() === '') {
            alert('Vui lòng nhập tên hoặc email của bạn.');
            return;
        }
        reporterName = reporterNameInput.value.trim();
        loginContainer.classList.add('hidden');
        reportContainer.classList.remove('hidden');
    });

    // Cập nhật dropdown Chi tiết khi Hạng mục thay đổi
    hangMucSelect.addEventListener('change', function() {
        const selectedCategory = this.value;
        chiTietSelect.innerHTML = '<option value="">-- Vui lòng chọn --</option>';
        otherDetailInput.classList.add('hidden'); // Luôn ẩn ô "Khác" khi thay đổi

        if (selectedCategory && subCategories[selectedCategory]) {
            subCategories[selectedCategory].forEach(function(sub) {
                const option = document.createElement('option');
                option.value = sub;
                option.textContent = sub;
                chiTietSelect.appendChild(option);
            });
        }
    });
    
    // Hiện ô nhập liệu khi chọn "Khác"
    chiTietSelect.addEventListener('change', function() {
        if (this.value === 'Khác') {
            otherDetailInput.classList.remove('hidden');
        } else {
            otherDetailInput.classList.add('hidden');
        }
    });


    // Xử lý gửi form
    reportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang gửi...';
        messageEl.textContent = '';
        messageEl.className = '';

        const formData = new FormData(reportForm);
        formData.append('nguoiBaoCao', reporterName);

        let chiTietValue = formData.get('chiTiet');
        if (chiTietValue === 'Khác' && !otherDetailInput.classList.contains('hidden')) {
            const otherText = otherDetailInput.value.trim();
            if (otherText) {
                formData.set('chiTiet', otherText);
            }
        }

        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwyvehKwFNITiV71iqPfwuoFSFU5R1yRWHug6_fI8iF5C3rpsA1h0i50Bhu_y98XZxNSQ/exec'; // Dán Web App URL của bạn vào đây

        fetch(SCRIPT_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // *** THAY ĐỔI CHÍNH Ở ĐÂY ***
                // Thay vì reset toàn bộ form, chúng ta chỉ xóa những gì cần thiết
                // để người dùng có thể báo cáo vấn đề tiếp theo ngay lập tức.
                messageEl.textContent = "Gửi thành công! Bạn có thể tiếp tục báo cáo vấn đề khác.";
                messageEl.className = 'success';
                
                // Reset các lựa chọn và nội dung
                hangMucSelect.value = "";
                chiTietSelect.innerHTML = '<option value="">-- Vui lòng chọn hạng mục trước --</option>';
                noiDungInput.value = "";
                otherDetailInput.value = "";
                otherDetailInput.classList.add('hidden');
                
                // Cuộn lên đầu form để người dùng thấy thông báo
                reportContainer.scrollIntoView({ behavior: 'smooth' });

            } else { throw new Error(data.message); }
        })
        .catch(error => {
            messageEl.textContent = 'Lỗi: ' + error.message;
            messageEl.className = 'error';
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Gửi Báo Cáo';
        });
    });
});
