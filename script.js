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
    const imageUploadInput = document.getElementById('image-upload');
    const fileNameDisplay = document.getElementById('file-name-display');
    
    let reporterName = '';

    // Hiển thị tên file được chọn
    imageUploadInput.addEventListener('change', () => {
        if (imageUploadInput.files.length > 0) {
            fileNameDisplay.textContent = imageUploadInput.files[0].name;
        } else {
            fileNameDisplay.textContent = 'Chưa chọn file nào';
        }
    });

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
        
        const file = imageUploadInput.files[0];
        // Giới hạn kích thước file (ví dụ 5MB)
        if (file && file.size > 5 * 1024 * 1024) { 
            alert('Kích thước file quá lớn, vui lòng chọn ảnh dưới 5MB.');
            return;
        }
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang xử lý...';
        messageEl.textContent = '';

        if (file) {
            // Nếu có file, đọc file trước khi gửi
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const fileData = reader.result;
                const fileInfo = {
                    fileName: file.name,
                    mimeType: file.type,
                    fileData: fileData
                };
                sendData(fileInfo); // Gửi dữ liệu có kèm file
            };
            reader.onerror = error => {
                console.error('Error reading file:', error);
                messageEl.textContent = 'Lỗi: Không thể đọc file ảnh.';
                messageEl.className = 'error';
                submitBtn.disabled = false;
                submitBtn.textContent = 'Gửi Báo Cáo';
            };
        } else {
            // Nếu không có file, gửi dữ liệu như bình thường
            sendData(null);
        }
    });

    function sendData(fileInfo) {
        const coSo = coSoSelect.value;
        if (!coSo) {
            alert('Vui lòng chọn cơ sở.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Gửi Báo Cáo';
            return;
        }
        
        const textareas = reportForm.querySelectorAll('textarea');
        let hasContent = false;
        textareas.forEach(textarea => {
            if (textarea.value.trim()) {
                hasContent = true;
            }
        });

        if (!hasContent) {
            alert('Bạn chưa nhập nội dung báo cáo nào.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Gửi Báo Cáo';
            return;
        }

        const formData = new FormData();
        formData.append('nguoiBaoCao', reporterName);
        formData.append('coSo', coSo);

        // Thêm nội dung text
        textareas.forEach(textarea => {
            formData.append(textarea.name, textarea.value.trim());
        });
        
        // Thêm thông tin file nếu có
        if (fileInfo) {
            formData.append('fileName', fileInfo.fileName);
            formData.append('mimeType', fileInfo.mimeType);
            formData.append('fileData', fileInfo.fileData);
        }

        submitBtn.textContent = 'Đang gửi...';

        fetch(SCRIPT_URL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    messageEl.textContent = 'Đã gửi thành công báo cáo của bạn! Cảm ơn bạn.';
                    messageEl.className = 'success';
                    reportForm.reset();
                    fileNameDisplay.textContent = 'Chưa chọn file nào';
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
    }
});
