document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 0. LOAD DEFAULT & ADMIN-MANAGED DATA ON START
    // ==========================================
    const savedP1Fee = localStorage.getItem("adminFeeP1P3");
    if (savedP1Fee) {
        const targetCell = document.querySelector("#feeModal tbody tr:first-child td:nth-child(2)");
        if (targetCell) targetCell.textContent = savedP1Fee;
        const adminInput = document.getElementById("adminFeeP1P3");
        if (adminInput) adminInput.value = savedP1Fee;
    }

    // Default News & Events
    if (!localStorage.getItem("schoolNews")) {
        const defaultNews = [
            { title: "Inter-House Athletics & Sports Day", desc: "Join us this coming Friday as our four school houses compete in track events, football, and netball.", meta: "📅 Date: March 20, 2026 | 📍 School Main Grounds", photo: "" },
            { title: "Term 1 Mid-Term Examinations", desc: "Mid-term assessments for Primary 1 through Primary 7 will commence on Monday. Parents are reminded to clear school balances.", meta: "📅 Date: Starting Next Monday", photo: "" }
        ];
        localStorage.setItem("schoolNews", JSON.stringify(defaultNews));
    }

    // Default Gallery Photos (Feature 1)
    if (!localStorage.getItem("schoolGallery")) {
        const defaultGallery = [
            { title: "Modern Computer Laboratory", photo: "https://images.unsplash.com/photo-1562774053-701939374585?w=500&auto=format&fit=crop&q=60" },
            { title: "School Assembly Ground", photo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=500&auto=format&fit=crop&q=60" },
            { title: "Primary Science Practical Session", photo: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&auto=format&fit=crop&q=60" }
        ];
        localStorage.setItem("schoolGallery", JSON.stringify(defaultGallery));
    }

    // Default Staff / Workers
    if (!localStorage.getItem("schoolWorkers")) {
        const defaultWorkers = [
            { name: "Mr. Okello James", role: "Headteacher", bio: "Over 15 years of educational administration leadership in Northern Uganda.", photo: "" },
            { name: "Mrs. Akello Grace", role: "Deputy Headteacher (Academics)", bio: "Oversees curriculum delivery, examinations, and teacher performance.", photo: "" }
        ];
        localStorage.setItem("schoolWorkers", JSON.stringify(defaultWorkers));
    }

    renderContent();

    // ==========================================
    // 1. RENDER DYNAMIC CONTENT (NEWS, GALLERY, WORKERS)
    // ==========================================
    function renderContent() {
        const newsContainer = document.getElementById("newsContainer");
        const galleryContainer = document.getElementById("galleryContainer");
        const workersContainer = document.getElementById("workersContainer");

        // Render News
        let newsList = JSON.parse(localStorage.getItem("schoolNews")) || [];
        if (newsContainer) {
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

        // Render Gallery (Feature 1)
        let galleryList = JSON.parse(localStorage.getItem("schoolGallery")) || [];
        if (galleryContainer) {
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

        // Render Workers
        let workersList = JSON.parse(localStorage.getItem("schoolWorkers")) || [];
        if (workersContainer) {
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

    // ==========================================
    // 2. ADMIN FORMS (ADD NEWS, GALLERY, WORKERS)
    // ==========================================
    const adminNewsForm = document.getElementById("adminNewsForm");
    if (adminNewsForm) {
        adminNewsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("newsTitle").value.trim();
            const desc = document.getElementById("newsDesc").value.trim();
            const meta = document.getElementById("newsMeta").value.trim();
            const photo = document.getElementById("newsPhoto").value.trim();

            let newsList = JSON.parse(localStorage.getItem("schoolNews")) || [];
            newsList.unshift({ title, desc, meta, photo });
            localStorage.setItem("schoolNews", JSON.stringify(newsList));

            adminNewsForm.reset();
            renderContent();
            alert("Success! News published.");
        });
    }

    const adminGalleryForm = document.getElementById("adminGalleryForm");
    if (adminGalleryForm) {
        adminGalleryForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const title = document.getElementById("galleryTitle").value.trim();
            const photo = document.getElementById("galleryPhoto").value.trim();

            let galleryList = JSON.parse(localStorage.getItem("schoolGallery")) || [];
            galleryList.unshift({ title, photo });
            localStorage.setItem("schoolGallery", JSON.stringify(galleryList));

            adminGalleryForm.reset();
            renderContent();
            alert("Success! Photo added to campus gallery.");
        });
    }

    const adminWorkerForm = document.getElementById("adminWorkerForm");
    if (adminWorkerForm) {
        adminWorkerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("workerName").value.trim();
            const role = document.getElementById("workerRole").value.trim();
            const bio = document.getElementById("workerBio").value.trim();
            const photo = document.getElementById("workerPhoto").value.trim();

            let workersList = JSON.parse(localStorage.getItem("schoolWorkers")) || [];
            workersList.unshift({ name, role, bio, photo });
            localStorage.setItem("schoolWorkers", JSON.stringify(workersList));

            adminWorkerForm.reset();
            renderContent();
            alert("Success! Staff member added.");
        });
    }

    // ==========================================
    // 3. FEATURE 4: LIVE COUNTDOWN TIMER LOGIC
    // ==========================================
    function updateCountdown() {
        const examDate = new Date("December 10, 2026 09:00:00").getTime();
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

    // ==========================================
    // 4. FEATURE 2: STUDENT REPORT CARD CHECKER MODAL
    // ==========================================
    const reportModal = document.getElementById("reportModal");
    const closeReportModal = document.querySelector(".close-report-modal");

    window.openReportModal = function() {
        if (reportModal) reportModal.style.display = "block";
    };
    if (closeReportModal) {
        closeReportModal.addEventListener("click", () => reportModal.style.display = "none");
    }

    const reportForm = document.getElementById("reportForm");
    if (reportForm) {
        reportForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const studentId = document.getElementById("reportStudentId").value.trim();
            const resultBox = document.getElementById("reportResultBox");

            if (studentId.toUpperCase() === "STU-2026") {
                resultBox.style.display = "block";
            } else {
                alert("Student ID not found in database. Try using ID: STU-2026");
                resultBox.style.display = "none";
            }
        });
    }

    // ==========================================
    // 5. ADMISSION MODAL & NOTES FILTERING
    // ==========================================
    const admissionModal = document.getElementById("admissionModal");
    const closeAdmissionModal = document.querySelector(".close-admission-modal");

    window.openAdmissionModal = function() {
        if (admissionModal) admissionModal.style.display = "block";
    };
    if (closeAdmissionModal) closeAdmissionModal.addEventListener("click", () => admissionModal.style.display = "none");

    const admissionForm = document.getElementById("admissionForm");
    if (admissionForm) {
        admissionForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Admission application submitted successfully! Admissions office will contact you.");
            admissionForm.reset();
            admissionModal.style.display = "none";
        });
    }

    const classFilter = document.getElementById("classFilter");
    const subjectFilter = document.getElementById("subjectFilter");

    function filterNotes() {
        const selectedClass = classFilter ? classFilter.value : "all";
        const selectedSubject = subjectFilter ? subjectFilter.value : "all";
        const noteCards = document.querySelectorAll(".portal-section #notesContainer .note-card");

        noteCards.forEach(card => {
            const cardClass = card.getAttribute("data-class");
            const cardSubject = card.getAttribute("data-subject");
            if (!cardClass || !cardSubject) return;

            const matchesClass = selectedClass === "all" || cardClass === selectedClass;
            const matchesSubject = selectedSubject === "all" || cardSubject === selectedSubject;
            card.style.display = (matchesClass && matchesSubject) ? "block" : "none";
        });
    }

    if (classFilter) classFilter.addEventListener("change", filterNotes);
    if (subjectFilter) subjectFilter.addEventListener("change", filterNotes);

    // Quiz Database & Logic
    const quizDatabase = {
        scienceP5: [
            { id: "q1", question: "1. Which part of a flowering plant manufactures food through photosynthesis?", options: [{ value: "root", text: "A) Root" }, { value: "leaf", text: "B) Leaf" }, { value: "stem", text: "C) Stem" }], answer: "leaf" },
            { id: "q2", question: "2. What is the main natural source of heat and light for the earth?", options: [{ value: "moon", text: "A) The Moon" }, { value: "sun", text: "B) The Sun" }, { value: "fire", text: "C) Fire" }], answer: "sun" }
        ],
        mathP3: [
            { id: "m1", question: "1. What is 15 plus 27?", options: [{ value: "40", text: "A) 40" }, { value: "42", text: "B) 42" }, { value: "45", text: "C) 45" }], answer: "42" }
        ]
    };

    const quizCategorySelect = document.getElementById("quizCategorySelect");
    const quizFormContainer = document.getElementById("dynamicQuizForm");
    const submitQuizBtn = document.getElementById("submitQuizBtn");
    const highScoreDisplay = document.getElementById("highScoreDisplay");

    let savedHighScore = localStorage.getItem("stLawrenceHighScore") || 0;
    if (highScoreDisplay) highScoreDisplay.textContent = savedHighScore;

    function loadQuiz(categoryKey) {
        if (!quizFormContainer) return;
        quizFormContainer.innerHTML = "";
        const currentQuestions = quizDatabase[categoryKey];
        if (!currentQuestions) return;

        currentQuestions.forEach((q) => {
            let optionsHtml = "";
            q.options.forEach(opt => {
                optionsHtml += `<label><input type="radio" name="${q.id}" value="${opt.value}"> ${opt.text}</label>`;
            });
            const questionCard = document.createElement("div");
            questionCard.className = "question-card";
            questionCard.setAttribute("data-question-id", q.id);
            questionCard.innerHTML = `<p><strong>${q.question}</strong></p>${optionsHtml}`;
            quizFormContainer.appendChild(questionCard);
        });

        if (submitQuizBtn) submitQuizBtn.style.display = "block";
        const quizResult = document.getElementById("quizResult");
        if (quizResult) quizResult.style.display = "none";
    }

    if (quizCategorySelect) {
        loadQuiz(quizCategorySelect.value);
        quizCategorySelect.addEventListener("change", (e) => loadQuiz(e.target.value));
    }

    if (submitQuizBtn) {
        submitQuizBtn.addEventListener("click", () => {
            const activeCategory = quizCategorySelect.value;
            const currentQuestions = quizDatabase[activeCategory];
            let score = 0;
            let totalQuestions = currentQuestions.length;

            currentQuestions.forEach((q) => {
                const selectedOption = document.querySelector(`input[name="${q.id}"]:checked`);
                const questionCard = document.querySelector(`[data-question-id="${q.id}"]`);
                const existingFeedback = questionCard.querySelector(".quiz-feedback");
                if (existingFeedback) existingFeedback.remove();

                const feedback = document.createElement("p");
                feedback.className = "quiz-feedback";
                feedback.style.marginTop = "10px";
                feedback.style.fontSize = "14px";
                feedback.style.fontWeight = "bold";

                if (selectedOption) {
                    if (selectedOption.value === q.answer) {
                        score++;
                        feedback.textContent = "✔ Correct!";
                        feedback.style.color = "#15803d";
                    } else {
                        feedback.textContent = "✘ Incorrect.";
                        feedback.style.color = "#dc2626";
                    }
                } else {
                    feedback.textContent = "⚠ Not attempted.";
                    feedback.style.color = "#d97706";
                }
                questionCard.appendChild(feedback);
            });

            const percentage = Math.round((score / totalQuestions) * 100);
            const resultBox = document.getElementById("quizResult");
            resultBox.style.display = "block";
            resultBox.textContent = `You scored ${score} out of ${totalQuestions} (${percentage}%)!`;

            if (percentage > savedHighScore) {
                savedHighScore = percentage;
                localStorage.setItem("stLawrenceHighScore", savedHighScore);
                if (highScoreDisplay) highScoreDisplay.textContent = savedHighScore;
            }
        });
    }

    // PDF Preview Modal
    const modal = document.getElementById("pdfModal");
    const modalTitle = document.getElementById("modalTitle");
    const fileNameTarget = document.getElementById("fileNameTarget");
    const closeModal = document.querySelector(".close-modal");

    document.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("preview-btn")) {
            const btn = e.target;
            if (modalTitle) modalTitle.textContent = btn.getAttribute("data-title");
            if (fileNameTarget) fileNameTarget.textContent = btn.getAttribute("data-file");
            if (modal) modal.style.display = "block";
        }
    });

    if (closeModal) closeModal.addEventListener("click", () => modal.style.display = "none");

    const feeModal = document.getElementById("feeModal");
    const closeFeeModal = document.querySelector(".close-fee-modal");

    window.openFeeModal = function() {
        if (feeModal) feeModal.style.display = "block";
    };
    if (closeFeeModal) closeFeeModal.addEventListener("click", () => feeModal.style.display = "none");

    window.saveFeeUpdates = function() {
        const newFee = document.getElementById("adminFeeP1P3").value;
        localStorage.setItem("adminFeeP1P3", newFee);
        const targetCell = document.querySelector("#feeModal tbody tr:first-child td:nth-child(2)");
        if (targetCell) targetCell.textContent = newFee;
        alert("Success! School fees updated.");
    };

    // Secure Role Login System
    const roleLoginModal = document.getElementById("roleLoginModal");
    const closeRoleModal = document.querySelector(".close-role-modal");
    const roleLoginForm = document.getElementById("roleLoginForm");
    const modalRoleTitle = document.getElementById("modalRoleTitle");
    const modalRoleSubtitle = document.getElementById("modalRoleSubtitle");
    const targetRoleInput = document.getElementById("targetRole");
    const roleSubmitBtn = document.getElementById("roleSubmitBtn");
    const roleLoginError = document.getElementById("roleLoginError");

    window.openRoleLogin = function(role) {
        if (!targetRoleInput || !roleLoginModal) return;
        targetRoleInput.value = role;
        roleLoginError.style.display = "none";
        roleLoginForm.reset();

        if (role === "student") {
            modalRoleTitle.textContent = "Student Portal Login";
            modalRoleSubtitle.textContent = "Access your class notes, past papers, and quizzes.";
            roleSubmitBtn.style.background = "#2563eb";
        } else if (role === "teacher") {
            modalRoleTitle.textContent = "Teacher Portal Login";
            modalRoleSubtitle.textContent = "Sign in to upload and manage notes.";
            roleSubmitBtn.style.background = "#15803d";
        } else if (role === "admin") {
            modalRoleTitle.textContent = "Administrator Portal Login";
            modalRoleSubtitle.textContent = "Manage news, gallery, staff & inquiries.";
            roleSubmitBtn.style.background = "#b91c1c";
        }
        roleLoginModal.style.display = "block";
    };

    if (closeRoleModal) closeRoleModal.addEventListener("click", () => roleLoginModal.style.display = "none");

    if (roleLoginForm) {
        roleLoginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const role = targetRoleInput.value;
            const user = document.getElementById("roleUsername").value.trim();
            const pass = document.getElementById("rolePassword").value.trim();

            let isAuthenticated = false;
            const teacherDashboard = document.getElementById("teacherDashboardSection");
            const adminDashboard = document.getElementById("adminDashboardSection");
            const notesSection = document.getElementById("notes");
            const quizSection = document.getElementById("quiz-section");

            if (teacherDashboard) teacherDashboard.style.display = "none";
            if (adminDashboard) adminDashboard.style.display = "none";
            if (notesSection) notesSection.style.display = "none";
            if (quizSection) quizSection.style.display = "none";

            if (role === "student" && user === "student" && pass === "student123") {
                isAuthenticated = true;
                alert("Welcome back, Student! Unlocking notes and past PLE papers...");
                if (notesSection) notesSection.style.display = "block";
                if (quizSection) quizSection.style.display = "block";
                if (notesSection) notesSection.scrollIntoView({ behavior: 'smooth' });
            } else if (role === "teacher" && user === "teacher" && pass === "teacher123") {
                isAuthenticated = true;
                alert("Welcome, Teacher! Unlocking upload dashboard...");
                if (teacherDashboard) {
                    teacherDashboard.style.display = "block";
                    teacherDashboard.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (role === "admin" && user === "admin" && pass === "admin123") {
                isAuthenticated = true;
                alert("Welcome, Administrator! Unlocking management console...");
                if (adminDashboard) {
                    adminDashboard.style.display = "block";
                    adminDashboard.scrollIntoView({ behavior: 'smooth' });
                    loadAdminInbox();
                }
            }

            if (isAuthenticated) {
                roleLoginModal.style.display = "none";
            } else {
                roleLoginError.style.display = "block";
            }
        });
    }

    // Teacher Upload System
    const uploadModal = document.getElementById("teacherUploadModal");
    const closeUploadModal = document.querySelector(".close-upload-modal");
    const teacherUploadForm = document.getElementById("teacherUploadForm");
    const notesContainer = document.getElementById("notesContainer");

    window.openUploadModal = function() {
        if (uploadModal) uploadModal.style.display = "block";
    };
    if (closeUploadModal) closeUploadModal.addEventListener("click", () => uploadModal.style.display = "none");

    if (teacherUploadForm) {
        teacherUploadForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const cVal = document.getElementById("uploadClass").value;
            const sVal = document.getElementById("uploadSubject").value;
            const title = document.getElementById("uploadTitle").value;
            const desc = document.getElementById("uploadDesc").value;
            const fileInput = document.getElementById("uploadFile");
            const fileName = fileInput.files[0] ? fileInput.files[0].name : "sample_note.pdf";

            const classLabel = cVal.toUpperCase().replace('P', 'P.');
            let subjectFullName = sVal.toUpperCase();

            const newCard = document.createElement("div");
            newCard.className = "note-card";
            newCard.setAttribute("data-class", cVal);
            newCard.setAttribute("data-subject", sVal);
            newCard.innerHTML = `
                <span class="badge ${sVal}">${classLabel} - ${subjectFullName}</span>
                <h3>${title}</h3>
                <p>${desc}</p>
                <div class="card-actions">
                    <button class="preview-btn" data-title="${classLabel} ${subjectFullName} - ${title}" data-file="notes/${fileName}">Preview Note</button>
                    <a href="notes/${fileName}" download class="download-btn">Download</a>
                </div>
            `;

            if (notesContainer) notesContainer.prepend(newCard);
            alert("Success! Study note published.");
            teacherUploadForm.reset();
            uploadModal.style.display = "none";
        });
    }

    // Contact Form & Admin Inbox
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
        inboxContainer.innerHTML = html;
    }

    loadAdminInbox();

    // Global Modal Closer
    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
        if (e.target === feeModal) feeModal.style.display = "none";
        if (e.target === admissionModal) admissionModal.style.display = "none";
        if (e.target === reportModal) reportModal.style.display = "none";
        if (e.target === roleLoginModal) roleLoginModal.style.display = "none";
        if (e.target === uploadModal) uploadModal.style.display = "none";
    });
});