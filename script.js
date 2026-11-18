document.addEventListener("DOMContentLoaded", () => {
    // Clear old placeholders on first clean load
    if (!localStorage.getItem("cleanStorageInitialized_v4")) {
        localStorage.removeItem("schoolNews");
        localStorage.removeItem("schoolGallery");
        localStorage.removeItem("schoolWorkers");
        localStorage.setItem("cleanStorageInitialized_v4", "true");
    }

    if (!localStorage.getItem("schoolNews")) {
        localStorage.setItem("schoolNews", JSON.stringify([]));
    }

    if (!localStorage.getItem("schoolGallery")) {
        localStorage.setItem("schoolGallery", JSON.stringify([]));
    }

    if (!localStorage.getItem("schoolWorkers")) {
        localStorage.setItem("schoolWorkers", JSON.stringify([]));
    }

    renderContent();

    function renderContent() {
        const newsContainer = document.getElementById("newsContainer");
        const galleryContainer = document.getElementById("galleryContainer");
        const workersContainer = document.getElementById("workersContainer");

        let newsList = JSON.parse(localStorage.getItem("schoolNews")) || [];
        if (newsContainer) {
            if (newsList.length === 0) {
                newsContainer.innerHTML = '<p style="color: #64748b; grid-column: 1/-1; text-align: center;">No news or events posted yet. Use the Administrator Portal to publish updates.</p>';
            } else {
                let html = "";
                newsList.forEach(item => {
                    let imgHtml = item.photo ? `<img src="${item.photo}" alt="News Photo" style="width: 100%; height: 160px; object-fit: cover; border-radius: 6px; margin-bottom: 12px;">` : "";
                    html += `
                        <div class="note-card">
                            ${imgHtml}
                            <span class="badge" style="background: #fef3c7; color: #92400e; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">School Update</span>
                            <h3>${item.title}</h3>
                            <p>${item.desc}</p>
                            <small style="color: #64748b; display: block; margin-top: 10px;">${item.meta}</small>
                        </div>
                    `;
                });
                newsContainer.innerHTML = html;
            }
        }

        let galleryList = JSON.parse(localStorage.getItem("schoolGallery")) || [];
        if (galleryContainer) {
            if (galleryList.length === 0) {
                galleryContainer.innerHTML = '<p style="color: #64748b; grid-column: 1/-1; text-align: center;">No campus gallery photos uploaded yet. Use the Administrator Portal to upload photos from your device.</p>';
            } else {
                let html = "";
                galleryList.forEach(item => {
                    html += `
                        <div class="note-card" style="text-align: center; padding: 15px;">
                            <img src="${item.photo}" alt="${item.title}" style="width: 100%; height: 180px; object-fit: cover; border-radius: 6px; margin-bottom: 10px;">
                            <h4 style="margin: 0; color: #1e3a8a; font-size: 15px;">${item.title}</h4>
                        </div>
                    `;
                });
                galleryContainer.innerHTML = html;
            }
        }

        let workersList = JSON.parse(localStorage.getItem("schoolWorkers")) || [];
        if (workersContainer) {
            if (workersList.length === 0) {
                workersContainer.innerHTML = '<p style="color: #64748b; grid-column: 1/-1; text-align: center;">No staff members added yet. Use the Administrator Portal to add staff.</p>';
            } else {
                let html = "";
                workersList.forEach(worker => {
                    let avatarHtml = worker.photo ? `<img src="${worker.photo}" alt="Staff Photo" style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; margin: 0 auto 10px auto; display: block; border: 2px solid #2563eb;">` : `<div style="font-size: 50px; margin-bottom: 10px;">👨‍💼</div>`;
                    html += `
                        <div class="note-card" style="text-align: center; padding: 25px;">
                            ${avatarHtml}
                            <h3>${worker.name}</h3>
                            <p style="color: #2563eb; font-weight: bold; font-size: 14px; margin: 5px 0;">${worker.role}</p>
                            <p style="color: #64748b; font-size: 13px;">${worker.bio}</p>
                        </div>
                    `;
                });
                workersContainer.innerHTML = html;
            }
        }
    }

    const adminNewsForm = document.getElementById("adminNewsForm");
    if (adminNewsForm) {
        adminNewsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("newsTitle").value.trim();
            const desc = document.getElementById("newsDesc").value.trim();
            const meta = document.getElementById("newsMeta").value.trim();
            const fileInput = document.getElementById("newsPhotoFile");

            const saveNews = (photoUrl = "") => {
                let newsList = JSON.parse(localStorage.getItem("schoolNews")) || [];
                newsList.unshift({ title, desc, meta, photo: photoUrl });
                localStorage.setItem("schoolNews", JSON.stringify(newsList));

                adminNewsForm.reset();
                renderContent();
                alert("Success! News published.");
            };

            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = function() {
                        const canvas = document.createElement("canvas");
                        const MAX_WIDTH = 800;
                        const MAX_HEIGHT = 800;
                        let width = img.width;
                        let height = img.height;
                        if (width > height) {
                            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                        } else {
                            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);
                        saveNews(canvas.toDataURL("image/jpeg", 0.7));
                    };
                };
                reader.readAsDataURL(fileInput.files[0]);
            } else {
                saveNews("");
            }
        });
    }

    const adminGalleryForm = document.getElementById("adminGalleryForm");
    if (adminGalleryForm) {
        adminGalleryForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("galleryTitle").value.trim();
            const fileInput = document.getElementById("galleryPhotoFile");
            
            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = function() {
                        const canvas = document.createElement("canvas");
                        const MAX_WIDTH = 800;
                        const MAX_HEIGHT = 800;
                        let width = img.width;
                        let height = img.height;
                        if (width > height) {
                            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                        } else {
                            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);

                        try {
                            let galleryList = JSON.parse(localStorage.getItem("schoolGallery")) || [];
                            galleryList.unshift({ title, photo: canvas.toDataURL("image/jpeg", 0.7) });
                            localStorage.setItem("schoolGallery", JSON.stringify(galleryList));

                            adminGalleryForm.reset();
                            renderContent();
                            alert("Success! Photo added to campus gallery.");
                        } catch (err) {
                            alert("Storage limit reached! Try a smaller image file.");
                        }
                    };
                };
                reader.readAsDataURL(fileInput.files[0]);
            }
        });
    }

    const adminWorkerForm = document.getElementById("adminWorkerForm");
    if (adminWorkerForm) {
        adminWorkerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("workerName").value.trim();
            const role = document.getElementById("workerRole").value.trim();
            const bio = document.getElementById("workerBio").value.trim();
            const fileInput = document.getElementById("workerPhotoFile");

            const saveWorker = (photoUrl = "") => {
                let workersList = JSON.parse(localStorage.getItem("schoolWorkers")) || [];
                workersList.unshift({ name, role, bio, photo: photoUrl });
                localStorage.setItem("schoolWorkers", JSON.stringify(workersList));

                adminWorkerForm.reset();
                renderContent();
                alert("Success! Staff member added.");
            };

            if (fileInput.files && fileInput.files[0]) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const img = new Image();
                    img.src = event.target.result;
                    img.onload = function() {
                        const canvas = document.createElement("canvas");
                        const MAX_WIDTH = 600;
                        const MAX_HEIGHT = 600;
                        let width = img.width;
                        let height = img.height;
                        if (width > height) {
                            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                        } else {
                            if (height > MAX_HEIGHT) { width *= MAX_HEIGHT / height; height = MAX_HEIGHT; }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);
                        saveWorker(canvas.toDataURL("image/jpeg", 0.7));
                    };
                };
                reader.readAsDataURL(fileInput.files[0]);
            } else {
                saveWorker("");
            }
        });
    }

    function updateCountdown() {
        const examDate = new Date("Monday, February 1, 2027 09:00:00").getTime();
        const now = new Date().getTime();
        const distance = examDate - now;
        const countdownElement = document.getElementById("countdownTimer");
        if (!countdownElement) return;

        if (distance < 0) {
            countdownElement.textContent = "Examinations are underway!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
    }
    setInterval(updateCountdown, 1000);
    updateCountdown();

    const reportModal = document.getElementById("reportModal");
    const closeReportModal = document.querySelector(".close-report-modal");
    window.openReportModal = () => reportModal.style.display = "block";
    if (closeReportModal) closeReportModal.addEventListener("click", () => reportModal.style.display = "none");

    const reportForm = document.getElementById("reportForm");
    if (reportForm) {
        reportForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const studentId = document.getElementById("reportStudentId").value.trim();
            const resultBox = document.getElementById("reportResultBox");
            if (studentId.toUpperCase() === "STU-2026") {
                resultBox.style.display = "block";
            } else {
                alert("Student ID not found. Try ID: STU-2026");
                resultBox.style.display = "none";
            }
        });
    }

    const admissionModal = document.getElementById("admissionModal");
    const closeAdmissionModal = document.querySelector(".close-admission-modal");
    window.openAdmissionModal = () => admissionModal.style.display = "block";
    if (closeAdmissionModal) closeAdmissionModal.addEventListener("click", () => admissionModal.style.display = "none");

    const admissionForm = document.getElementById("admissionForm");
    if (admissionForm) {
        admissionForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Admission application submitted successfully!");
            admissionForm.reset();
            admissionModal.style.display = "none";
        });
    }

    const modal = document.getElementById("pdfModal");
    const closeModal = document.querySelector(".close-modal");
    document.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("preview-btn")) {
            if (modal) modal.style.display = "block";
        }
    });
    if (closeModal) closeModal.addEventListener("click", () => modal.style.display = "none");

    const feeModal = document.getElementById("feeModal");
    const closeFeeModal = document.querySelector(".close-fee-modal");
    window.openFeeModal = () => feeModal.style.display = "block";
    if (closeFeeModal) closeFeeModal.addEventListener("click", () => feeModal.style.display = "none");

    const roleLoginModal = document.getElementById("roleLoginModal");
    const closeRoleModal = document.querySelector(".close-role-modal");
    const roleLoginForm = document.getElementById("roleLoginForm");
    const targetRoleInput = document.getElementById("targetRole");
    const roleLoginError = document.getElementById("roleLoginError");

    window.openRoleLogin = (role) => {
        targetRoleInput.value = role;
        roleLoginError.style.display = "none";
        roleLoginForm.reset();
        roleLoginModal.style.display = "block";
    };

    if (closeRoleModal) closeRoleModal.addEventListener("click", () => roleLoginModal.style.display = "none");

    if (roleLoginForm) {
        roleLoginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const role = targetRoleInput.value;
            const user = document.getElementById("roleUsername").value.trim();
            const pass = document.getElementById("rolePassword").value.trim();

            const teacherDashboard = document.getElementById("teacherDashboardSection");
            const adminDashboard = document.getElementById("adminDashboardSection");
            const notesSection = document.getElementById("notes");
            const quizSection = document.getElementById("quiz-section");

            if (teacherDashboard) teacherDashboard.style.display = "none";
            if (adminDashboard) adminDashboard.style.display = "none";
            if (notesSection) notesSection.style.display = "none";
            if (quizSection) quizSection.style.display = "none";

            if (role === "student" && user === "student" && pass === "student123") {
                if (notesSection) notesSection.style.display = "block";
                if (quizSection) quizSection.style.display = "block";
                roleLoginModal.style.display = "none";
                alert("Logged in as Student!");
            } else if (role === "teacher" && user === "teacher" && pass === "teacher123") {
                if (teacherDashboard) teacherDashboard.style.display = "block";
                roleLoginModal.style.display = "none";
                alert("Logged in as Teacher!");
            } else if (role === "admin" && user === "admin" && pass === "admin123") {
                if (adminDashboard) {
                    adminDashboard.style.display = "block";
                    loadAdminInbox();
                }
                roleLoginModal.style.display = "none";
                alert("Logged in as Administrator!");
            } else {
                roleLoginError.style.display = "block";
            }
        });
    }

    const uploadModal = document.getElementById("teacherUploadModal");
    const closeUploadModal = document.querySelector(".close-upload-modal");
    window.openUploadModal = () => uploadModal.style.display = "block";
    if (closeUploadModal) closeUploadModal.addEventListener("click", () => uploadModal.style.display = "none");

    const contactForm = document.getElementById("contactForm");
    const contactSuccess = document.getElementById("contactSuccess");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("contactName").value.trim();
            const contact = document.getElementById("contactContact").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            let messages = JSON.parse(localStorage.getItem("schoolContactMessages")) || [];
            messages.unshift({ name, contact, message, date: new Date().toLocaleDateString() });
            localStorage.setItem("schoolContactMessages", JSON.stringify(messages));

            contactSuccess.style.display = "block";
            contactForm.reset();
            loadAdminInbox();
            setTimeout(() => contactSuccess.style.display = "none", 5000);
        });
    }

    function loadAdminInbox() {
        const inboxContainer = document.getElementById("adminInboxContainer");
        if (!inboxContainer) return;
        let messages = JSON.parse(localStorage.getItem("schoolContactMessages")) || [];
        if (messages.length === 0) {
            inboxContainer.innerHTML = '<p style="font-size: 13px; color: #64748b; text-align: center; margin: 10px 0;">No new messages in inbox.</p>';
            return;
        }
        let html = "";
        messages.forEach((msg) => {
            html += `
                <div style="border-bottom: 1px solid #e2e8f0; padding: 10px 0; font-size: 13px;">
                    <div style="display: flex; justify-content: space-between; font-weight: bold; color: #1e3a8a;">
                        <span>${msg.name} (${msg.contact})</span>
                        <span style="font-weight: normal; color: #64748b; font-size: 11px;">${msg.date}</span>
                    </div>
                    <p style="margin: 5px 0 0 0; color: #334155;">${msg.message}</p>
                </div>
            `;
        });
        inboxContainer.html = html; // Fixed property assignment
        inboxContainer.innerHTML = html;
    }

    loadAdminInbox();

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
        if (e.target === feeModal) feeModal.style.display = "none";
        if (e.target === admissionModal) admissionModal.style.display = "none";
        if (e.target === reportModal) reportModal.style.display = "none";
        if (e.target === roleLoginModal) roleLoginModal.style.display = "none";
        if (e.target === uploadModal) uploadModal.style.display = "none";
    });
});
