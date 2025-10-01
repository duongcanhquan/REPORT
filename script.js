document.addEventListener('DOMContentLoaded', function() {
    // Dán Web App URL MỚI NHẤT của bạn vào đây
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwA_HOPWaY2VlahMaLaQT3iqcURSzIBDDNC7Tp20qGEp5lo4S1gyXtQsnV3wIbS89M5Vg/exec';

    const loginContainer = document.getElementById('login-container');
    const reportContainer = document.getElementById('report-container');
    const reporterNameInput = document.getElementById('reporter-name');
    const reportForm = document.getElementById('report-form');
    const messageEl = document.getElementById('message');
    const continueBtn = document.getElementById('continue-btn');
    const coSoSelect = document.getElementById('co-so');
    const imageUploadInput = document.getElementById('image-upload');
    const fileListDisplay = document.getElementById('file-list-display');
    
    let reporterName = '';

    // Hiển thị danh sách file được chọn
    imageUploadInput.addEventListener('change', () => {
        fileListDisplay.innerHTML = ''; // Xóa danh sách cũ
        const files = imageUploadInput.files;
        if (files.length > 3) {
            alert('Bạn chỉ được chọn tối đa 3 ảnh.');
            imageUploadInput.value = ''; // Xóa các file đã chọn
            return;
        }
        if (files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                fileItem.textContent = files[i].name; // Đã sửa lỗi: Dùng textContent
                fileListDisplay.appendChild(fileItem);
            }
        }
    });

    continueBtn.addEventListener('click', () => {
        if (!reporterNameInput.value.trim()) {
            alert('Vui lòng nhập tên hoặc email của bạn.');
            return;
        }
        reporterName = reporterNameInput.value.trim();
        loginContainer.classList.add('hidden');
        reportContainer.classList.remove('hidden');
    });

    reportForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const files = imageUploadInput.files;
        for (let i = 0; i < files.length; i++) {
            if (files[i].size > 5 * 1024 * 1024) { 
                alert(`File "${files[i].name}" quá lớn, vui lòng chọn ảnh dưới 5MB.`);
                return;
            }
        }
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Đang xử lý...';
        messageEl.textContent = '';

        // Đọc tất cả các file dưới dạng Base64
        const filePromises = Array.from(files).map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve({
                    fileName: file.name,
                    mimeType: file.type,
                    fileData: reader.result
                });
                reader.onerror = error => reject(error);
            });
        });

        try {
            const fileInfos = await Promise.all(filePromises);
            sendData(fileInfos);
        } catch (error) {
            console.error('Error reading files:', error);
            messageEl.textContent = 'Lỗi: Không thể đọc file ảnh.';
            messageEl.className = 'error';
            submitBtn.disabled = false;
            submitBtn.textContent = 'Gửi Báo Cáo';
        }
    });

    function sendData(fileInfos) {
        const coSo = coSoSelect.value;
        if (!coSo) {
            alert('Vui lòng chọn cơ sở.');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Gửi Báo Cáo';
            return;
        }
        
        const formData = new FormData();
        formData.append('nguoiBaoCao', reporterName);
        formData.append('coSo', coSo);

        reportForm.querySelectorAll('textarea').forEach(textarea => {
            formData.append(textarea.name, textarea.value.trim());
        });
        
        // Thêm thông tin của từng file vào formData
        fileInfos.forEach((info, index) => {
            formData.append(`fileName${index+1}`, info.fileName);
            formData.append(`mimeType${index+1}`, info.mimeType);
            formData.append(`fileData${index+1}`, info.fileData);
        });

        submitBtn.textContent = 'Đang gửi...';

        fetch(SCRIPT_URL, { method: 'POST', body: formData })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    messageEl.textContent = 'Đã gửi thành công báo cáo của bạn! Cảm ơn bạn.';
                    messageEl.className = 'success';
                    reportForm.reset();
                    fileListDisplay.innerHTML = '';
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
