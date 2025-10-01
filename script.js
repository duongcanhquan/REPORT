document.addEventListener('DOMContentLoaded', function() {
    // Dán Web App URL MỚI NHẤT của bạn vào đây
    const SCRIPT_URL = 'URL_CUA_BAN_O_DAY'; 

    const loginContainer = document.getElementById('login-container');
    const reportContainer = document.getElementById('report-container');
    const continueBtn = document.getElementById('continue-btn');
    const reporterNameInput = document.getElementById('reporter-name');
    const reportForm = document.getElementById('report-form');
    const messageEl = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const coSoSelect = document.getElementById('co-so');
    
    let reporterName = '';

    // Xử lý chuyển màn hình
    continueBtn.addEventListener('click', () => {
        if (!reporterNameInput.value.trim()) {
            alert('Vui lòng nhập tên hoặc email của bạn.');
            return;
        }
        reporterName = reporterNameInput.value.trim();
        loginContainer.classList.add('hidden');
        reportContainer.classList.remove('hidden');
    });

    // Xử lý gửi form
    reportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const coSo = coSoSelect.value;
        if (!coSo) {
            alert('Vui lòng chọn cơ sở trước khi gửi báo cáo.');
            return;
        }

        const textareas = reportForm.querySelectorAll('textarea');
        let hasContent = false;
        const formData = new FormData();

        // Thêm các thông tin cố định
        formData.append('nguoiBaoCao', reporterName);
        formData.append('coSo', coSo);

        // Lấy nội dung từ các ô textarea và thêm vào formData
        textareas.forEach(textarea => {
            const noiDung = textarea.value.trim();
            if (noiDung) {
                hasContent = true;
            }
            // Gửi cả ô trống để script xử lý
            formData.append(textarea.name, noiDung);
        });

        if (!hasContent) {
            alert('Bạn chưa nhập nội dung báo cáo nào.');
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang gửi...';
        messageEl.textContent = '';
        messageEl.className = '';

        fetch(SCRIPT_URL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    messageEl.textContent = 'Đã gửi thành công báo cáo của bạn! Cảm ơn bạn.';
                    messageEl.className = 'success';
                    reportForm.reset(); // Xóa toàn bộ nội dung đã nhập
                } else {
                    throw new Error(data.message || 'Có lỗi không xác định xảy ra.');
                }
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
