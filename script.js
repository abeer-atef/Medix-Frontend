/* ============================================================
   MEDICARE PRO - COMPLETE JAVASCRIPT
   ============================================================ */

'use strict';

// ==================== PAGE NAVIGATION ====================

function showPage(pageId) {
    // 1. إخفاء كل الصفحات عن طريق إزالة كلاس active
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });

    // 2. إظهار الصفحة اللي اليوزر اختارها (بنضيف كلمة page- قبل الـ id)
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        console.error("Page with id 'page-" + pageId + "' not found!");
    }

    // 3. تحديث روابط الناف بار (عشان اللون يتغير للرابط النشط)
    const allLinks = document.querySelectorAll('.nav-link');
    allLinks.forEach(link => {
        link.classList.remove('active');
        // لو النص بتاع الرابط أو الـ onclick جواه نفس اسم الصفحة، بنخليه active
        if (link.getAttribute('onclick').includes(`'${pageId}'`)) {
            link.classList.add('active');
        }
    });

    // 4. قفل منيو الموبايل (الـ Hamburger) تلقائياً بعد الاختيار
    const navLinks = document.getElementById('navLinks');
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }

    // 5. السكرول يطلع فوق خالص أول ما الصفحة تتغير
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // حركة ناعمة للسكرول
    });
}

function updateNavLinks(pageId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const map = {
        'home': 0, 'doctors': 2, 'pharmacy': 3, 'about': 4
    };
    const navLinks = document.querySelectorAll('.nav-link');
    if (map[pageId] !== undefined && navLinks[map[pageId]]) {
        navLinks[map[pageId]].classList.add('active');
    }
}

function showDoctorLogin() {
    showPage('doctor-login');
}

function showAdminLogin() {
    showPage('admin-login');
}

// ==================== NAVBAR ====================

window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    if (navLinks) {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    }
}

// Close menu on outside click
document.addEventListener('click', (e) => {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    if (navLinks && hamburger) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('open');
        }
    }
});

// ==================== AUTH FORMS ====================

function toggleAuthForm(formId) {
    // إخفاء كل الفورمات الأول
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => form.classList.remove('active'));

    // إظهار الفورم المطلوبة
    const targetForm = document.getElementById(formId);
    if (targetForm) {
        targetForm.classList.add('active');
    }
}

function togglePass(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const icon = input.nextElementSibling;
    if (input.type === 'password') {
        input.type = 'text';
        if (icon) icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        if (icon) icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// ==================== DASHBOARD SECTIONS ====================

function showDashSection(sectionId, linkEl) {
    document.querySelectorAll('#page-patient-dashboard .dash-section')
        .forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    if (linkEl) {
        document.querySelectorAll('#page-patient-dashboard .sidebar-link')
            .forEach(l => l.classList.remove('active'));
        linkEl.classList.add('active');
    }
}

function showDocSection(sectionId, linkEl) {
    document.querySelectorAll('#page-doctor-dashboard .dash-section')
        .forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    if (linkEl) {
        document.querySelectorAll('#page-doctor-dashboard .sidebar-link')
            .forEach(l => l.classList.remove('active'));
        linkEl.classList.add('active');
    }
}

function showAdminSection(sectionId, linkEl) {
    document.querySelectorAll('#page-admin-dashboard .dash-section')
        .forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sectionId);
    if (target) target.classList.add('active');

    if (linkEl) {
        document.querySelectorAll('#page-admin-dashboard .sidebar-link')
            .forEach(l => l.classList.remove('active'));
        linkEl.classList.add('active');
    }
}

// ==================== TABS ====================

function switchTab(tabEl, contentId) {
    const parent = tabEl.closest('.dash-section') || tabEl.closest('.dash-card') || document;
    parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    parent.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tabEl.classList.add('active');
    const content = document.getElementById(contentId);
    if (content) content.classList.add('active');
}

// ==================== DOCTOR FILTER ====================

function filterDoctors(specialty, btn) {
    if (btn) {
        document.querySelectorAll('.specialization-filter .filter-btn')
            .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
}

function filterAndGo(specialty) {
    showPage('doctors');
    setTimeout(() => {
        filterDoctorCards(specialty, null);
        const chips = document.querySelectorAll('.filter-chip');
        chips.forEach(chip => {
            chip.classList.remove('active');
            if (chip.getAttribute('onclick') && chip.getAttribute('onclick').includes(specialty)) {
                chip.classList.add('active');
            }
        });
        // Set "All" if no match
        const hasActive = Array.from(chips).some(c => c.classList.contains('active'));
        if (!hasActive && chips[0]) chips[0].classList.add('active');
    }, 100);
}

function filterDoctorCards(specialty, chipEl) {
    const cards = document.querySelectorAll('.doctor-full-card');
    cards.forEach(card => {
        const cardSpecialty = card.getAttribute('data-specialty');
        if (specialty === 'all' || cardSpecialty === specialty) {
            card.style.display = 'flex';
            card.style.animation = 'popIn 0.3s ease forwards';
        } else {
            card.style.display = 'none';
        }
    });

    if (chipEl) {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chipEl.classList.add('active');
    }
}

// ==================== BOOKING WIZARD ====================

let currentStep = 1;
let selectedDoctor = null;
let selectedDate = null;
let selectedTime = null;
let selectedPayment = 'online';

function nextStep(step) {
    // Hide current step
    document.querySelectorAll('.booking-step').forEach(s => s.classList.remove('active'));

    // Show target step
    const target = document.getElementById('booking-step-' + step);
    if (target) target.classList.add('active');

    // Update indicators
    for (let i = 1; i <= 4; i++) {
        const indicator = document.getElementById('step-indicator-' + i);
        if (!indicator) continue;
        indicator.classList.remove('active', 'done');
        if (i < step) {
            indicator.classList.add('done');
            const circle = indicator.querySelector('.step-circle');
            if (circle) circle.innerHTML = '<i class="fas fa-check"></i>';
        } else if (i === step) {
            indicator.classList.add('active');
            const circle = indicator.querySelector('.step-circle');
            if (circle) circle.textContent = i;
        } else {
            const circle = indicator.querySelector('.step-circle');
            if (circle) circle.textContent = i;
        }
    }

    // Update wizard lines
    document.querySelectorAll('.wizard-line').forEach((line, idx) => {
        if (idx < step - 1) {
            line.classList.add('done');
        } else {
            line.classList.remove('done');
        }
    });

    currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetBooking() {
    selectedDoctor = null;
    selectedDate = null;
    selectedTime = null;
    selectedPayment = 'online';

    // Reset doctor selections
    document.querySelectorAll('.doctor-card.selectable').forEach(c => c.classList.remove('selected'));

    // Reset time slots
    document.querySelectorAll('.time-slot').forEach(s => {
        if (!s.classList.contains('taken')) s.classList.remove('selected');
    });

    // Reset calendar
    document.querySelectorAll('.cal-day').forEach(d => {
        if (!d.classList.contains('disabled') && !d.classList.contains('unavailable')) {
            d.classList.remove('active');
        }
    });

    // Reset payment
    selectPayment('online');

    nextStep(1);
}

function selectDoctor(el) {
    document.querySelectorAll('.doctor-card.selectable').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    selectedDoctor = el.querySelector('strong').textContent;
    showToast('Doctor selected: ' + selectedDoctor);
}

function selectDate(el) {
    document.querySelectorAll('.cal-day').forEach(d => d.classList.remove('active'));
    el.classList.add('active');
    selectedDate = 'December ' + el.textContent + ', 2024';
}

function selectTime(el) {
    document.querySelectorAll('.time-slot').forEach(s => {
        if (!s.classList.contains('taken')) s.classList.remove('selected');
    });
    el.classList.add('selected');
    selectedTime = el.textContent;
}

function selectPayment(type) {
    selectedPayment = type;
    const onlineOpt = document.getElementById('pay-online');
    const cashOpt = document.getElementById('pay-cash');
    const cardForm = document.getElementById('card-form');

    if (!onlineOpt || !cashOpt) return;

    if (type === 'online') {
        onlineOpt.classList.add('active');
        cashOpt.classList.remove('active');
        onlineOpt.innerHTML = onlineOpt.innerHTML.replace(
            '<div class="payment-radio"></div>',
            '<div class="payment-radio"><div class="radio-dot"></div></div>'
        );

        if (cardForm) {
            cardForm.style.display = 'block';
            cardForm.style.animation = 'slideUp 0.3s ease';
        }

        // Fix radio buttons
        onlineOpt.querySelector('.payment-radio').innerHTML = '<div class="radio-dot"></div>';
        cashOpt.querySelector('.payment-radio').innerHTML = '';
    } else {
        cashOpt.classList.add('active');
        onlineOpt.classList.remove('active');

        if (cardForm) cardForm.style.display = 'none';

        onlineOpt.querySelector('.payment-radio').innerHTML = '';
        cashOpt.querySelector('.payment-radio').innerHTML = '<div class="radio-dot"></div>';
    }
}

// ==================== AVAILABILITY MANAGER ====================

function toggleDay(checkbox, day) {
    const timesDiv = document.getElementById(day + '-times');
    const badge = checkbox.closest('.avail-day-header').querySelector('.avail-badge');

    if (!timesDiv || !badge) return;

    if (checkbox.checked) {
        timesDiv.classList.remove('disabled');
        badge.textContent = 'Active';
        badge.className = 'avail-badge active';
        timesDiv.innerHTML = `
            <div class="time-range-row">
                <div class="time-input-group">
                    <label>From</label>
                    <input type="time" value="09:00" class="time-input">
                </div>
                <span class="time-separator">→</span>
                <div class="time-input-group">
                    <label>To</label>
                    <input type="time" value="17:00" class="time-input">
                </div>
                <button class="btn-icon remove" onclick="this.closest('.time-range-row').remove()">
                    <i class="fas fa-minus-circle"></i>
                </button>
            </div>
            <button class="add-slot-btn" onclick="addTimeSlot(this)">
                <i class="fas fa-plus"></i> Add Time Slot
            </button>
        `;
    } else {
        timesDiv.classList.add('disabled');
        badge.textContent = 'Day Off';
        badge.className = 'avail-badge inactive';
        timesDiv.innerHTML = `<p class="day-off-msg"><i class="fas fa-moon"></i> You are off on this day</p>`;
    }
}

function addTimeSlot(btn) {
    const container = btn.closest('.avail-times');
    if (!container) return;

    const newRow = document.createElement('div');
    newRow.className = 'time-range-row';
    newRow.innerHTML = `
        <div class="time-input-group">
            <label>From</label>
            <input type="time" value="14:00" class="time-input">
        </div>
        <span class="time-separator">→</span>
        <div class="time-input-group">
            <label>To</label>
            <input type="time" value="18:00" class="time-input">
        </div>
        <button class="btn-icon remove" onclick="this.closest('.time-range-row').remove()">
            <i class="fas fa-minus-circle"></i>
        </button>
    `;
    container.insertBefore(newRow, btn);
    showToast('New time slot added!');
}

// ==================== PRESCRIPTION WRITER ====================

function addMedicine() {
    const list = document.getElementById('medicine-list');
    if (!list) return;

    const row = document.createElement('div');
    row.className = 'medicine-row';
    row.innerHTML = `
        <div class="medicine-fields">
            <div class="form-group">
                <label>Medicine Name</label>
                <input type="text" placeholder="Enter medicine name" class="rx-input">
            </div>
            <div class="form-group">
                <label>Dosage</label>
                <input type="text" placeholder="e.g., 10mg" class="rx-input">
            </div>
            <div class="form-group">
                <label>Frequency</label>
                <select class="rx-input">
                    <option>Once daily</option>
                    <option>Twice daily</option>
                    <option>Three times daily</option>
                    <option>As needed</option>
                    <option>At bedtime</option>
                    <option>With meals</option>
                </select>
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" placeholder="e.g., 7 days" class="rx-input">
            </div>
        </div>
        <button class="remove-med-btn" onclick="removeMedicine(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    list.appendChild(row);
    row.style.animation = 'slideUp 0.3s ease';
    showToast('Medicine field added!');
}

function removeMedicine(btn) {
    const row = btn.closest('.medicine-row');
    if (row) {
        row.style.opacity = '0';
        row.style.transform = 'translateX(20px)';
        row.style.transition = 'all 0.3s ease';
        setTimeout(() => row.remove(), 300);
    }
}

// ==================== ADMIN FUNCTIONS ====================

function openAddDoctorModal() {
    const modal = document.getElementById('add-doctor-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAddDoctorModal() {
    const modal = document.getElementById('add-doctor-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function addDoctor() {
    closeAddDoctorModal();
    showToast('Doctor added & credentials sent via email!');

    // Add new row to the staff table
    const tbody = document.querySelector('#admin-staff table tbody');
    if (tbody) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><div class="table-doctor">
                <div class="avatar-mini" style="background:#6f42c1">ND</div>
                New Doctor
            </div></td>
            <td>General</td>
            <td><code>DOC-0048</code></td>
            <td>0</td>
            <td><span class="badge badge-active">Active</span></td>
            <td>
                <button class="btn-sm btn-primary">Edit</button>
                <button class="btn-sm btn-danger" onclick="deleteDoctor(this)">Delete</button>
            </td>
        `;
        newRow.style.animation = 'slideUp 0.4s ease';
        tbody.appendChild(newRow);
    }
}

function deleteDoctor(btn) {
    openConfirm(
        'Are you sure you want to delete this doctor? This action cannot be undone.',
        () => {
            const row = btn.closest('tr');
            if (row) {
                row.style.opacity = '0';
                row.style.transform = 'translateX(20px)';
                row.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    row.remove();
                    showToast('Doctor removed from system.');
                }, 300);
            }
        }
    );
}

function cancelAppointment(btn) {
    openConfirm(
        'Are you sure you want to cancel this appointment?',
        () => {
            const row = btn.closest('tr');
            if (row) {
                const statusCell = row.querySelector('.badge');
                if (statusCell) {
                    statusCell.textContent = 'Cancelled';
                    statusCell.className = 'badge badge-danger';
                }
                btn.style.display = 'none';
                showToast('Appointment cancelled.');
            }
        }
    );
}

// ==================== CONFIRM DIALOG ====================

let confirmCallback = null;

function openConfirm(message, callback) {
    const dialog = document.getElementById('confirm-dialog');
    const msgEl = document.getElementById('confirm-message');
    const yesBtn = document.getElementById('confirm-yes-btn');

    if (!dialog || !msgEl || !yesBtn) return;

    msgEl.textContent = message;
    confirmCallback = callback;
    dialog.classList.add('active');
    document.body.style.overflow = 'hidden';

    yesBtn.onclick = () => {
        closeConfirm();
        if (confirmCallback) confirmCallback();
    };
}

function closeConfirm() {
    const dialog = document.getElementById('confirm-dialog');
    if (dialog) dialog.classList.remove('active');
    document.body.style.overflow = '';
    confirmCallback = null;
}

// Close modals on overlay click
document.addEventListener('click', (e) => {
    const addModal = document.getElementById('add-doctor-modal');
    const confirmDialog = document.getElementById('confirm-dialog');

    if (addModal && e.target === addModal) closeAddDoctorModal();
    if (confirmDialog && e.target === confirmDialog) closeConfirm();
});

// ==================== PHARMACY MAP ====================

const pharmacyData = {
    1: { name: 'MediPlus Pharmacy',        address: '123 Health Ave, Suite 1',   phone: '+1 (555) 234-5678', hours: '8AM – 10PM' },
    2: { name: 'CarePoint Pharmacy',        address: '456 Medical Blvd',          phone: '+1 (555) 345-6789', hours: '7AM – 11PM' },
    3: { name: 'HealthFirst Drugs',         address: '789 Wellness Rd',           phone: '+1 (555) 456-7890', hours: '9AM – 9PM'  },
    4: { name: 'City Pharmacy',             address: '321 Downtown St',           phone: '+1 (555) 567-8901', hours: '8AM – 9PM'  },
    5: { name: 'NovaCare Pharmacy',         address: '654 North Park Ave',        phone: '+1 (555) 678-9012', hours: 'Open 24/7'  },
    6: { name: 'QuickMeds Express',         address: '987 East Side Lane',        phone: '+1 (555) 789-0123', hours: 'Closed'     }
};

function selectPharmacy(el, id) {
    // Update sidebar list
    document.querySelectorAll('.pharmacy-item').forEach(item => item.classList.remove('active'));
    el.classList.add('active');

    // Update map pins
    document.querySelectorAll('.pharm-pin').forEach(pin => pin.classList.remove('active-pin'));
    const pin = document.getElementById('pin-' + id);
    if (pin) pin.classList.add('active-pin');

    // Update info box
    const data = pharmacyData[id];
    if (data) {
        const nameEl    = document.getElementById('info-name');
        const addrEl    = document.getElementById('info-address');
        const phoneEl   = document.getElementById('info-phone');
        const hoursEl   = document.getElementById('info-hours');

        if (nameEl)  nameEl.textContent  = data.name;
        if (addrEl)  addrEl.textContent  = data.address;
        if (phoneEl) phoneEl.innerHTML   = `<i class="fas fa-phone"></i> ${data.phone}`;
        if (hoursEl) hoursEl.innerHTML   = `<i class="fas fa-clock"></i> Hours: ${data.hours}`;
    }

    // Animate info box
    const infoBox = document.getElementById('map-info-box');
    if (infoBox) {
        infoBox.style.animation = 'none';
        infoBox.offsetHeight; // reflow
        infoBox.style.animation = 'slideUp 0.3s ease';
    }
}

function detectLocation() {
    if (navigator.geolocation) {
        showToast('Detecting your location...');
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                showToast('Location detected! Showing nearby pharmacies.');
            },
            () => {
                showToast('Location access denied. Showing default results.');
            }
        );
    } else {
        showToast('Geolocation not supported by your browser.');
    }
}

let mapZoom = 1;

function zoomIn() {
    mapZoom = Math.min(mapZoom + 0.15, 1.6);
    applyMapZoom();
}

function zoomOut() {
    mapZoom = Math.max(mapZoom - 0.15, 0.6);
    applyMapZoom();
}

function applyMapZoom() {
    const map = document.getElementById('map-container');
    if (map) {
        map.style.transform = `scale(${mapZoom})`;
        map.style.transformOrigin = 'center center';
        map.style.transition = 'transform 0.3s ease';
    }
}

// ==================== COPY TO CLIPBOARD ====================

function copyText(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => showToast('Copied: ' + text))
            .catch(() => fallbackCopy(text));
    } else {
        fallbackCopy(text);
    }
}

function fallbackCopy(text) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    showToast('Copied: ' + text);
}

// ==================== TOAST ====================

let toastTimer = null;

function showToast(message) {
    const toast   = document.getElementById('toast');
    const msgEl   = document.getElementById('toast-message');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ==================== AI CHATBOT ====================

const botResponses = {
    'book': {
        text: "I'll help you book an appointment! Please log in or create an account first. 📅",
        action: () => showPage('auth')
    },
    'doctors': {
        text: "We have 200+ specialist doctors across 15 departments. Let me show you our team! 👨‍⚕️",
        action: () => showPage('doctors')
    },
    'pharmacy': {
        text: "I'll show you pharmacies near your location right away! 💊",
        action: () => showPage('pharmacy')
    },
    'hours': {
        text: "Our clinic is open Monday to Sunday from 6:00 AM to 11:00 PM. Emergency services are available 24/7. 🕐",
        action: null
    },
    'hello': { text: "Hello! 😊 How can I assist you today?", action: null },
    'hi': { text: "Hi there! 👋 Welcome to MediCare Pro. How can I help?", action: null },
    'cardiology': { text: "Our Cardiology department has 12 expert doctors. Shall I show you their profiles? 🫀", action: null },
    'dentistry': { text: "Our Dentistry team specializes in cosmetic, orthodontic, and surgical procedures. 🦷", action: null },
    'emergency': { text: "For emergencies, please call our hotline: +1 (800) 911-CARE or visit our ER immediately! 🚨", action: null },
    'payment': { text: "We accept online payments (credit/debit cards), cash at the clinic, and most major insurance plans. 💳", action: null },
    'insurance': { text: "We accept most major insurance plans. Please bring your insurance card when you visit. 📋", action: null },
    'contact': { text: "You can reach us at: 📞 +1 (800) 123-4567 or ✉️ care@medicarepro.com", action: null },
    'cancel': { text: "To cancel an appointment, go to My Appointments in your patient dashboard and click Cancel. Cancellations must be made 24 hours in advance.", action: null },
    'prescription': { text: "Your digital prescriptions are available in the Prescriptions section of your patient dashboard. 💊", action: null },
    'default': { text: "I'm not sure about that, but I'm here to help! You can ask me about: booking appointments, finding doctors, pharmacy locations, clinic hours, or payment options. 😊", action: null }
};

function toggleChatbot() {
    const window   = document.getElementById('chatbot-window');
    const icon     = document.getElementById('chat-icon');
    const notif    = document.querySelector('.chat-notification');

    if (!window || !icon) return;

    const isOpen = window.classList.contains('open');

    if (isOpen) {
        window.classList.remove('open');
        icon.className = 'fas fa-robot';
    } else {
        window.classList.add('open');
        icon.className = 'fas fa-times';
        if (notif) notif.style.display = 'none';
        scrollChatToBottom();
    }
}

function quickReply(type) {
    const response = botResponses[type];
    if (!response) return;

    addUserMessage(type === 'book' ? '📅 Book Appointment' :
                   type === 'doctors' ? '👨‍⚕️ Find Doctors' :
                   type === 'pharmacy' ? '💊 Nearby Pharmacy' :
                   '🕐 Clinic Hours');

    setTimeout(() => {
        addBotMessage(response.text);
        if (response.action) {
            setTimeout(() => {
                response.action();
                toggleChatbot();
            }, 800);
        }
    }, 500);
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    if (!input || !input.value.trim()) return;

    const message = input.value.trim();
    addUserMessage(message);
    input.value = '';

    setTimeout(() => {
        const response = getBotResponse(message.toLowerCase());
        addBotMessage(response.text);
        if (response.action) {
            setTimeout(() => {
                response.action();
                toggleChatbot();
            }, 1000);
        }
    }, 600);
}

function getBotResponse(message) {
    const keywords = Object.keys(botResponses).filter(k => k !== 'default');
    for (const keyword of keywords) {
        if (message.includes(keyword)) {
            return botResponses[keyword];
        }
    }
    return botResponses['default'];
}

function addUserMessage(text) {
    const messages = document.getElementById('chat-messages');
    if (!messages) return;

    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message user';
    msgEl.innerHTML = `
        <div class="msg-avatar">U</div>
        <div class="msg-bubble">${escapeHtml(text)}</div>
    `;
    messages.appendChild(msgEl);
    scrollChatToBottom();
}

function addBotMessage(text) {
    const messages = document.getElementById('chat-messages');
    if (!messages) return;

    const msgEl = document.createElement('div');
    msgEl.className = 'chat-message bot';
    msgEl.innerHTML = `
        <div class="msg-avatar"><i class="fas fa-robot"></i></div>
        <div class="msg-bubble"><p>${text}</p></div>
    `;
    messages.appendChild(msgEl);
    scrollChatToBottom();
}

function scrollChatToBottom() {
    const messages = document.getElementById('chat-messages');
    if (messages) {
        setTimeout(() => {
            messages.scrollTop = messages.scrollHeight;
        }, 100);
    }
}

function handleChatKey(event) {
    if (event.key === 'Enter') sendMessage();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

// ==================== INIT ====================

document.addEventListener('DOMContentLoaded', () => {
    // Show home page
    showPage('home');

    // Auto-show chat notification after 3s
    setTimeout(() => {
        const notif = document.querySelector('.chat-notification');
        if (notif) notif.style.display = 'flex';
    }, 3000);

    // Animate bars when admin dashboard is opened
    document.querySelectorAll('.bar').forEach((bar, i) => {
        bar.style.opacity = '0';
        bar.style.transform = 'scaleY(0)';
        bar.style.transformOrigin = 'bottom';
        setTimeout(() => {
            bar.style.transition = 'all 0.6s ease ' + (i * 0.1) + 's';
            bar.style.opacity = '1';
            bar.style.transform = 'scaleY(1)';
        }, 300 + i * 80);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAddDoctorModal();
            closeConfirm();
            const chatWindow = document.getElementById('chatbot-window');
            if (chatWindow && chatWindow.classList.contains('open')) toggleChatbot();
        }
    });

    console.log('%c🏥 MediCare Pro Loaded Successfully!', 'color:#1a73e8;font-size:16px;font-weight:bold;');
    console.log('%cVersion 1.0.0 | Designed for healthcare excellence', 'color:#64748b;font-size:12px;');
});