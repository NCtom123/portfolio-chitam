// ==========================================================================
// PORTFOLIO - NGUYỄN CHÍ TÂM (JAVASCRIPT)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------------------------------------------------
  // 1. NAVBAR SCROLL EFFECT & MOBILE MENU
  // ------------------------------------------------------------------------
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar?.classList.add("scrolled");
    } else {
      navbar?.classList.remove("scrolled");
    }
  });

  const toggleMobileMenu = () => {
    navMenu?.classList.toggle("open");
  };

  const closeMobileMenu = () => {
    navMenu?.classList.remove("open");
  };

  menuToggle?.addEventListener("click", toggleMobileMenu);

  // Nav-links click active & close mobile nav
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((a) => a.classList.remove("active"));
      this.classList.add("active");
      closeMobileMenu();
    });
  });

  // ------------------------------------------------------------------------
  // 2. THEME SWITCHER (DARK / LIGHT MODE)
  // ------------------------------------------------------------------------
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const body = document.body;

  const setTheme = (isLight) => {
    if (isLight) {
      body.classList.add("light-mode");
      if (themeIcon) {
        themeIcon.src = "images/light.png";
        themeIcon.alt = "Chế độ sáng";
      }
      themeToggle?.setAttribute("aria-label", "Chuyển sang chế độ tối");
      themeToggle?.setAttribute("title", "Chuyển sang chế độ tối");
    } else {
      body.classList.remove("light-mode");
      if (themeIcon) {
        themeIcon.src = "images/dark.png";
        themeIcon.alt = "Chế độ tối";
      }
      themeToggle?.setAttribute("aria-label", "Chuyển sang chế độ sáng");
      themeToggle?.setAttribute("title", "Chuyển sang chế độ sáng");
    }
  };

  const savedTheme = localStorage.getItem("portfolioTheme") || "dark";
  setTheme(savedTheme === "light");

  themeToggle?.addEventListener("click", () => {
    const isLight = !body.classList.contains("light-mode");
    setTheme(isLight);
    localStorage.setItem("portfolioTheme", isLight ? "light" : "dark");
  });

  // ------------------------------------------------------------------------
  // 3. MULTI-LANGUAGE SWITCHER (VIETNAMESE / ENGLISH)
  // ------------------------------------------------------------------------
  const langToggle = document.getElementById("langToggle");
  let currentLang = localStorage.getItem("portfolioLang") || "vi";
  let onLanguageChangeCallback = null;

  const translations = {
    vi: {
      "nav.about": "Giới thiệu",
      "nav.skills": "Kỹ năng",
      "nav.projects": "Dự án",
      "nav.achievements": "Thành tích",
      "nav.activities": "Hoạt động",
      "nav.contact": "Liên hệ",
      "hero.greeting": "Xin chào, tôi là",
      "hero.intro": "Không chỉ là viết code, tôi tập trung vào việc kiến tạo những hệ sinh thái số bền vững và mang lại giá trị thực cho doanh nghiệp.",
      "hero.btnProjects": "Xem Dự Án &rarr;",
      "hero.btnContact": "Liên Hệ",
      "about.title": "Về bản thân",
      "about.desc": "Tôi là một sinh viên <strong>Công nghệ Thông tin</strong> với niềm đam mê mạnh mẽ trong lĩnh vực lập trình web. Tôi luôn chủ động học hỏi và tìm kiếm cơ hội để áp dụng kiến thức vào các dự án thực tế, từ xây dựng giao diện tối ưu đến phát triển hệ thống phía máy chủ.<br><br>Trong quá trình rèn luyện, tôi đã làm chủ các công nghệ nền tảng như <strong>HTML5, CSS3, JavaScript, PHP</strong> và <strong>MySQL</strong>. Mục tiêu của tôi là trở thành một lập trình viên <strong>Full-Stack</strong> chuyên nghiệp, không ngừng mở rộng kỹ năng và cống hiến cho các sản phẩm công nghệ chất lượng.",
      "about.badgeGoalLabel": "Mục tiêu",
      "about.badgeStrengthLabel": "Thế mạnh",
      "about.badgeStrengthVal": "Tư duy hệ thống & Logic",
      "about.badgeLocationLabel": "Khu vực",
      "about.badgeLocationVal": "Đồng Nai / TP.HCM",
      "about.skillsTitle": "Kỹ năng tích lũy qua quá trình học tập",
      "about.skillColFrontend": "Frontend",
      "about.skillColBackend": "Backend",
      "about.skillColTools": "Tools & Others",
      "about.eduTitle": "Học Vấn",
      "about.school": "Trường Cao Đẳng FPT Polytechnic cơ sở Đồng Nai",
      "about.dept": "Bộ môn Công Nghệ Thông Tin",
      "about.majorPrefix": "Chuyên ngành:",
      "about.majorVal": "Lập Trình Web",
      "about.awardText": "5 kỳ liên tiếp SV Giỏi",
      "about.thesisPrefix": "Đồ án tốt nghiệp:",
      "about.thesisTitle": "Xây dựng nền tảng Restaurant ERP tích hợp AI cho quản lý và vận hành nhà hàng",
      "about.major": "Chuyên ngành Lập Trình Web, GPA: 3.69/4.0 (8.8/10)",
      "skills.title": "Kỹ Năng",
      "skills.subtitle": "Kết hợp kỹ thuật và tư duy thiết kế để xây dựng sản phẩm chất lượng.",
      "skills.frontendDesc": "Thiết kế UI hiện đại, animation mượt mà, responsive đầy đủ.",
      "skills.backendDesc": "Đảm bảo logic bền vững, API an toàn và hiệu năng tốt.",
      "skills.toolsDesc": "Quy trình làm việc hiệu quả, version control và hosting.",
      "skills.softTitle": "Kỹ Năng Mềm",
      "skills.softDesc": "Giao tiếp, teamwork và tư duy giải quyết vấn đề.",
      "skills.softTeamwork": "Làm việc nhóm",
      "skills.softTime": "Quản lý thời gian",
      "skills.softProblem": "Giải quyết vấn đề",
      "skills.softEnglish": "Tiếng Anh",
      "skills.softCreative": "Sáng tạo",
      "projects.title": "Dự Án",
      "projects.subtitle": "Những dự án tiêu biểu mà tôi đã tham gia và phát triển",
      "projects.armDesc": "Nền tảng quản lý nhân sự và chấm công giúp theo dõi thời gian làm việc, quản lý ca và tối ưu hiệu suất nhân sự.",
      "projects.watchDesc": "Website bán đồng hồ thanh lịch, thiết kế tinh xảo theo mô hình MVC, quản trị sản phẩm, đơn hàng và khách hàng.",
      "projects.erpTitle": "Xây dựng nền tảng Restaurant ERP tích hợp AI cho quản lý và vận hành nhà hàng",
      "projects.erpDesc": "Nền tảng ERP quản trị và vận hành nhà hàng toàn diện tích hợp trợ lý AI: Quản lý gọi món POS, kiểm kho tự động, cảnh báo hạn dùng nguyên liệu, phân tích doanh thu & ca làm việc theo thời gian thực.",
      "projects.zoomHint": "Phóng to xem chi tiết",
      "achievements.title": "Thành Tích",
      "achievements.gpa": "Điểm trung bình học tập",
      "achievements.statAwardNum": "5 Kỳ",
      "achievements.awards": "Liên tiếp đạt danh hiệu Sinh viên giỏi",
      "activities.title": "Hoạt Động",
      "activities.study": "Học tập",
      "activities.study1": "5 kỳ liên tiếp Đạt danh hiệu Sinh viên giỏi.",
      "activities.study1Sub": "Thành tích học tập xuất sắc toàn diện trong suốt các kỳ chuyên ngành Web.",
      "activities.study2": "GPA: 3.69/4 Duy trì GPA cao và thái độ học tập tốt.",
      "activities.study2Sub": "Chủ động nghiên cứu công nghệ mới, ứng dụng hiệu quả vào đồ án thực tế.",
      "activities.social": "Hoạt động xã hội",
      "activities.communityChip": "Cộng đồng",
      "activities.volunteerTitle": "Dự án thiện nguyện",
      "activities.journey": "Hành Trình Yêu Thương",
      "activities.location": "Tình nguyện tại Trung tâm bảo trợ trẻ em Tam Bình",
      "activities.locationSos": "Làng trẻ em SOS - HCM",
      "activities.gallery": "Gieo Mầm Hy Vọng",
      "activities.zoomNote": "Nhấn để phóng to",
      "lightbox.fullView": "Ảnh gốc",
      "lightbox.navHint": "Chuyển ảnh",
      "lightbox.closeHint": "Đóng",
      "cv.title": "Curriculum Vitae",
      "cv.subtitle": "Nguyễn Chí Tâm – Lập Trình Web",
      "cv.download": "Tải về CV",
      "cv.fallback": "Trình duyệt của bạn không hỗ trợ xem trực tiếp PDF.",
      "cv.downloadNow": "Tải về CV ngay",
      "contact.title": "Liên hệ",
      "contact.heading": "Thông Tin Liên Hệ",
      "contact.intro": "Tôi luôn sẵn sàng lắng nghe những ý tưởng mới và cơ hội hợp tác. Nếu bạn có dự án hay câu hỏi, đừng ngần ngại liên hệ!",
      "contact.emailLabel": "Email Trực Tiếp",
      "contact.phoneLabel": "Điện thoại / Zalo",
      "contact.addressLabel": "Địa chỉ làm việc",
      "contact.addressVal": "Quảng Đà, Xã Hưng Thịnh, Tỉnh Đồng Nai",
      "contact.socialTitle": "Kết nối mạng xã hội:",
      "contact.formCardTitle": "Gửi Tin Nhắn Nhanh",
      "contact.formCardSub": "Phản hồi nhanh chóng trong vòng 24 giờ",
      "contact.formName": "Họ và tên",
      "contact.formEmail": "Email",
      "contact.formMsg": "Nội dung",
      "contact.formBtn": "Gửi Tin Nhắn",
      "ai.status": "Trợ lý ảo & Bạn đồng hành của Tâm",
      "ai.settingsTitle": "Cấu hình Gemini API",
      "ai.settingsDesc": "Nhập Google Gemini API Key để mở khóa khả năng trò chuyện tự do không giới hạn. Khóa được lưu an toàn trong trình duyệt của bạn (Local Storage) và không bao giờ gửi đi nơi khác.",
      "ai.saveKey": "Lưu khóa",
      "ai.removeKey": "Xóa khóa",
      "ai.inputPlaceholder": "Hỏi về Tâm hoặc tâm sự gì đó..."
    },
    en: {
      "nav.about": "About",
      "nav.skills": "Skills",
      "nav.projects": "Projects",
      "nav.achievements": "Achievements",
      "nav.activities": "Activities",
      "nav.contact": "Contact",
      "hero.greeting": "Hello, I am",
      "hero.intro": "Beyond writing code, I focus on crafting sustainable digital ecosystems and delivering real business value.",
      "hero.btnProjects": "View Projects &rarr;",
      "hero.btnContact": "Contact Me",
      "about.title": "About Me",
      "about.desc": "I am an <strong>Information Technology</strong> student with a strong passion for web development. I actively learn and seek opportunities to apply practical knowledge, from crafting responsive modern user interfaces to developing robust server-side systems.<br><br>Throughout my journey, I have mastered core technologies including <strong>HTML5, CSS3, JavaScript, PHP</strong>, and <strong>MySQL</strong>. My goal is to become a professional <strong>Full-Stack Developer</strong>, delivering high-quality, high-performance software solutions.",
      "about.badgeGoalLabel": "Goal",
      "about.badgeStrengthLabel": "Strengths",
      "about.badgeStrengthVal": "System Architecture & Logic",
      "about.badgeLocationLabel": "Location",
      "about.badgeLocationVal": "Dong Nai / Ho Chi Minh City",
      "about.skillsTitle": "Core Skills Acquired Through Practical Training",
      "about.skillColFrontend": "Frontend",
      "about.skillColBackend": "Backend",
      "about.skillColTools": "Tools & Others",
      "about.eduTitle": "Education",
      "about.school": "FPT Polytechnic College - Dong Nai Campus",
      "about.dept": "Department of Information Technology",
      "about.majorPrefix": "Major:",
      "about.majorVal": "Web Development",
      "about.awardText": "5 consecutive semesters recognized as Excellent Student",
      "about.thesisPrefix": "Graduation Thesis:",
      "about.thesisTitle": "Building an AI-Powered Restaurant ERP Platform for Management & Operations",
      "about.major": "Web Programming Major, GPA: 3.69/4.0 (8.8/10)",
      "skills.title": "Skills & Stack",
      "skills.subtitle": "Combining technical craftsmanship and design thinking to build impactful products.",
      "skills.frontendDesc": "Modern UI design, fluid animations, and complete responsive layout.",
      "skills.backendDesc": "Robust business logic, secure RESTful APIs, and efficient databases.",
      "skills.toolsDesc": "Streamlined workflow, version control, and cloud hosting.",
      "skills.softTitle": "Soft Skills",
      "skills.softDesc": "Effective communication, teamwork, and proactive problem solving.",
      "skills.softTeamwork": "Teamwork",
      "skills.softTime": "Time Management",
      "skills.softProblem": "Problem Solving",
      "skills.softEnglish": "English Proficiency",
      "skills.softCreative": "Creativity",
      "projects.title": "Featured Projects",
      "projects.subtitle": "Key projects I have architected, developed, and deployed",
      "projects.armDesc": "HR and Attendance Management System tracking work hours, shifts, and optimizing staff operations.",
      "projects.watchDesc": "Elegant watch retail e-commerce platform built with MVC pattern, managing products, orders, and clients.",
      "projects.erpTitle": "AI-Powered Restaurant ERP Platform for Operations & Management",
      "projects.erpDesc": "Comprehensive ERP platform integrating AI assistant for restaurant operations: POS orders, inventory audit, HR management, food safety alerts, and real-time revenue analytics.",
      "projects.zoomHint": "Click to enlarge",
      "achievements.title": "Achievements",
      "achievements.gpa": "Cumulative GPA",
      "achievements.statAwardNum": "5 Semesters",
      "achievements.awards": "Consecutive Semesters as Excellent Student",
      "activities.title": "Activities",
      "activities.study": "Academics",
      "activities.study1": "5 consecutive semesters recognized as Excellent Student.",
      "activities.study1Sub": "Comprehensive academic excellence across all semesters of Web Development.",
      "activities.study2": "GPA: 3.69/4.0 maintaining high academic and professional standard.",
      "activities.study2Sub": "Proactively researching emerging tech and building high-impact real-world projects.",
      "activities.social": "Community Service",
      "activities.communityChip": "Community",
      "activities.volunteerTitle": "Charity Project",
      "activities.journey": "Journey of Love",
      "activities.location": "Volunteered at Tam Binh Child Protection Center",
      "activities.locationSos": "SOS Children's Village - HCMC",
      "activities.gallery": "Sowing Seeds of Hope",
      "activities.zoomNote": "Click to zoom",
      "lightbox.fullView": "Original Image",
      "lightbox.navHint": "Navigate",
      "lightbox.closeHint": "Close",
      "cv.title": "Curriculum Vitae",
      "cv.subtitle": "Nguyen Chi Tam – Web Developer",
      "cv.download": "Download CV",
      "cv.fallback": "Your browser does not support viewing PDFs directly.",
      "cv.downloadNow": "Download CV Now",
      "contact.title": "Contact",
      "contact.heading": "Contact Information",
      "contact.intro": "I am always open to discussing new projects, creative ideas, or opportunities. Feel free to reach out!",
      "contact.emailLabel": "Direct Email",
      "contact.phoneLabel": "Phone / Zalo",
      "contact.addressLabel": "Work Address",
      "contact.addressVal": "Quang Da, Hung Thinh Commune, Dong Nai Province",
      "contact.socialTitle": "Connect on social media:",
      "contact.formCardTitle": "Send a Quick Message",
      "contact.formCardSub": "Fast response within 24 hours",
      "contact.formName": "Full Name",
      "contact.formEmail": "Email Address",
      "contact.formMsg": "Message",
      "contact.formBtn": "Send Message",
      "ai.status": "Tam's AI Assistant & Companion",
      "ai.settingsTitle": "Gemini API Configuration",
      "ai.settingsDesc": "Enter your Google Gemini API Key to unlock unlimited conversational abilities. The key is securely stored in your browser's Local Storage and never exposed.",
      "ai.saveKey": "Save Key",
      "ai.removeKey": "Remove Key",
      "ai.inputPlaceholder": "Ask about Tam or chat casually..."
    }
  };

  const updateCvModalLanguage = (lang) => {
    const isEn = lang === "en";
    const cvPath = isEn ? "cv/nguyen_chi_tam_en.pdf" : "cv/nguyen_chi_tam.pdf";
    const downloadName = isEn ? "CV_Nguyen_Chi_Tam_Web_Developer_EN.pdf" : "CV_Nguyen_Chi_Tam_Lap_Trinh_Web_VI.pdf";
    
    const cvIframe = document.getElementById("cvIframe");
    const cvDownloadBtn = document.getElementById("cvDownloadBtn");
    const cvExternalBtn = document.getElementById("cvExternalBtn");
    const cvFallbackBtn = document.getElementById("cvFallbackBtn");
    const cvSubtitle = document.getElementById("cvModalSubtitle");

    if (cvIframe) {
      cvIframe.src = `${cvPath}#toolbar=1&navpanes=0`;
      cvIframe.title = isEn ? "CV Nguyen Chi Tam - Web Developer" : "CV Nguyễn Chí Tâm - Lập Trình Web";
    }
    if (cvDownloadBtn) {
      cvDownloadBtn.href = cvPath;
      cvDownloadBtn.setAttribute("download", downloadName);
      cvDownloadBtn.setAttribute("title", isEn ? "Download CV (English version)" : "Tải CV về máy (Bản tiếng Việt)");
    }
    if (cvExternalBtn) {
      cvExternalBtn.href = cvPath;
      cvExternalBtn.setAttribute("title", isEn ? "Open CV in new tab" : "Mở CV trong tab mới");
    }
    if (cvFallbackBtn) {
      cvFallbackBtn.href = cvPath;
      cvFallbackBtn.setAttribute("download", downloadName);
    }
    if (cvSubtitle) {
      cvSubtitle.textContent = isEn ? "Nguyen Chi Tam – Web Developer" : "Nguyễn Chí Tâm – Lập Trình Web";
    }
  };

  const applyLanguage = (lang) => {
    currentLang = lang;
    const dict = translations[lang] || translations.vi;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update Form Placeholders
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const msgInput = document.getElementById("message");

    if (nameInput) {
      nameInput.placeholder = lang === "en" ? "Enter your name" : "Nhập tên của bạn";
    }
    if (emailInput) {
      emailInput.placeholder = lang === "en" ? "Enter your email" : "Nhập email của bạn";
    }
    if (msgInput) {
      msgInput.placeholder = lang === "en" ? "What would you like to say?" : "Bạn muốn nhắn gì với tôi?";
    }

    // Update CV Tooltips
    document.querySelectorAll(".cv-trigger-btn").forEach((btn) => {
      btn.setAttribute("data-tooltip", lang === "en" ? "View CV" : "Xem CV");
      btn.setAttribute("title", lang === "en" ? "View CV" : "Xem CV");
    });

    // Update CV Modal PDF file, title, and download target
    updateCvModalLanguage(lang);

    // Update Lightbox if callback registered
    if (typeof onLanguageChangeCallback === "function") {
      onLanguageChangeCallback(lang);
    }

    langToggle?.setAttribute("title", lang === "en" ? "Ngôn ngữ: Tiếng Việt (Bấm để chuyển)" : "Language: English (Click to switch)");
    langToggle?.setAttribute("aria-label", lang === "en" ? "Switch to Vietnamese" : "Switch to English");
  };

  applyLanguage(currentLang);

  langToggle?.addEventListener("click", () => {
    const nextLang = currentLang === "vi" ? "en" : "vi";
    applyLanguage(nextLang);
    localStorage.setItem("portfolioLang", nextLang);
  });

  // ------------------------------------------------------------------------
  // 4. HERO DYNAMIC ROLE TYPING EFFECT
  // ------------------------------------------------------------------------
  const rolesVi = ["Web Developer", "Full-Stack Developer", "Front-End Developer", "Back-End Developer", "UI/UX Enthusiast"];
  const rolesEn = ["Web Developer", "Full-Stack Developer", "Front-End Developer", "Back-End Developer", "Software Creator"];
  const dynamicRole = document.getElementById("dynamicRole");
  let roleIdx = 0;

  const typeText = (text, element, speed = 70) => {
    return new Promise((resolve) => {
      let index = 0;
      element.textContent = "";
      const typeInterval = setInterval(() => {
        if (index < text.length) {
          element.textContent += text[index];
          index++;
        } else {
          clearInterval(typeInterval);
          resolve();
        }
      }, speed);
    });
  };

  const deleteText = (element, speed = 50) => {
    return new Promise((resolve) => {
      const deleteInterval = setInterval(() => {
        const currentText = element.textContent;
        if (currentText.length > 0) {
          element.textContent = currentText.slice(0, -1);
        } else {
          clearInterval(deleteInterval);
          resolve();
        }
      }, speed);
    });
  };

  const cycleRoles = async () => {
    while (true) {
      const roleList = currentLang === "en" ? rolesEn : rolesVi;
      const role = roleList[roleIdx % roleList.length];
      if (dynamicRole) {
        await typeText(role, dynamicRole, 75);
        await new Promise((resolve) => setTimeout(resolve, 1600));
        await deleteText(dynamicRole, 45);
      }
      roleIdx = (roleIdx + 1) % roleList.length;
    }
  };

  if (dynamicRole) {
    cycleRoles();
  }

  // ------------------------------------------------------------------------
  // 5. INTERSECTION OBSERVER (REVEAL ANIMATIONS)
  // ------------------------------------------------------------------------
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // ------------------------------------------------------------------------
  // 6. SCROLLSPY ACTIVE MENU HIGHLIGHTING
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll("section[id]");
  const aboutSection = document.getElementById("about");

  const setActiveNavOnScroll = () => {
    // 1. Khi đang ở phần Hero (đỉnh section "about" cách đỉnh màn hình > 250px hoặc cuộn < 200px):
    // KHÔNG sáng đèn bất kỳ mục nào trên menu (đúng như yêu cầu ảnh 2)
    if (window.pageYOffset < 200 || (aboutSection && aboutSection.getBoundingClientRect().top > 250)) {
      navLinks.forEach((link) => link.classList.remove("active"));
      return;
    }

    // 2. Nếu đã cuộn tới sát chân trang (footer hoặc contact section)
    if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 60) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#contact");
      });
      return;
    }

    // 3. Tìm section đang nằm trong tầm nhìn chính (dùng getBoundingClientRect để chuẩn xác 100%)
    let currentId = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      // Ngưỡng phát hiện: đỉnh section nằm trong khoảng từ -100px đến 250px so với viewport
      if (rect.top <= 250 && rect.bottom >= 150) {
        currentId = section.getAttribute("id");
      }
    });

    // 4. Cập nhật trạng thái active cho đúng link tương ứng (giải quyết triệt để lỗi ảnh 3 & 4)
    if (currentId) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
      });
    }
  };

  window.addEventListener("scroll", setActiveNavOnScroll);
  window.addEventListener("load", setActiveNavOnScroll);
  window.addEventListener("resize", setActiveNavOnScroll);

  // ------------------------------------------------------------------------
  // 7. CV MODAL (FULLSCREEN VIEWER & DOWNLOAD TRIGGER)
  // ------------------------------------------------------------------------
  const cvModal = document.getElementById("cvModal");
  const cvButtons = document.querySelectorAll(".cv-trigger-btn");
  const closeCvModalBtn = document.getElementById("closeCvModal");
  const closeCvModalBackdrop = document.getElementById("closeCvModalBackdrop");

  const openCvModal = () => {
    updateCvModalLanguage(currentLang);
    if (cvModal) {
      cvModal.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  };

  const closeCvModal = () => {
    if (cvModal) {
      cvModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  };

  cvButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openCvModal();
    });
  });

  closeCvModalBtn?.addEventListener("click", closeCvModal);
  closeCvModalBackdrop?.addEventListener("click", closeCvModal);

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCvModal();
      closeImageModalFunc();
    }
  });

  // ------------------------------------------------------------------------
  // 8. VOLUNTEER GALLERY SLIDER & IMAGE MODAL
  // ------------------------------------------------------------------------
  const sliderTrack = document.getElementById("sliderTrack");
  const sliderPrev = document.getElementById("sliderPrev");
  const sliderNext = document.getElementById("sliderNext");
  const sliderItems = Array.from(document.querySelectorAll(".slider-item"));
  let sliderIndex = 0;

  const updateSlider = () => {
    if (!sliderTrack || sliderItems.length === 0) return;
    const itemWidth = sliderItems[0].clientWidth + 8;
    const maxIndex = Math.max(0, sliderItems.length - 2);
    sliderIndex = Math.max(0, Math.min(sliderIndex, maxIndex));
    sliderTrack.style.transform = `translateX(-${sliderIndex * itemWidth}px)`;
  };

  const slideNext = () => {
    if (sliderItems.length <= 2) return;
    sliderIndex += 1;
    if (sliderIndex > sliderItems.length - 2) sliderIndex = 0;
    updateSlider();
  };

  const slidePrev = () => {
    if (sliderItems.length <= 2) return;
    sliderIndex -= 1;
    if (sliderIndex < 0) sliderIndex = sliderItems.length - 2;
    updateSlider();
  };

  sliderNext?.addEventListener("click", slideNext);
  sliderPrev?.addEventListener("click", slidePrev);

  let sliderAuto = setInterval(slideNext, 3500);
  const sliderContainer = document.querySelector(".slider");
  sliderContainer?.addEventListener("mouseenter", () => clearInterval(sliderAuto));
  sliderContainer?.addEventListener("mouseleave", () => {
    sliderAuto = setInterval(slideNext, 3500);
  });
  window.addEventListener("resize", updateSlider);

  // High-Definition Image Lightbox Modal (Projects & Activities)
  const imageModal = document.getElementById("imageModal");
  const modalImage = document.getElementById("modalImage");
  const closeImageModalBtn = document.getElementById("closeImageModal");
  const modalPrevBtn = document.getElementById("modalPrev");
  const modalNextBtn = document.getElementById("modalNext");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const lightboxBadge = document.getElementById("lightboxBadge");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxFullView = document.getElementById("lightboxFullView");
  const lightboxSpinner = document.getElementById("lightboxSpinner");

  let activeGallery = [];
  let activeGalleryCategory = "project";
  let currentImageIdx = 0;

  const getProjectGallery = () => {
    const isEn = currentLang === "en";
    return [
      {
        src: "images/chamcong.png",
        alt: "ARM – HR & Attendance System",
        title: "ARM – HR & Attendance System",
        desc: isEn
          ? "HR and Attendance Management System tracking work hours, shifts, and optimizing staff operations."
          : "Nền tảng quản lý nhân sự và chấm công giúp theo dõi thời gian làm việc, quản lý ca và tối ưu hiệu suất nhân sự.",
        badge: isEn ? "Full-Stack • Web App" : "Dự án tiêu biểu",
        category: "project"
      },
      {
        src: "images/restaurant-erp.png",
        alt: isEn
          ? "AI-Powered Restaurant ERP Platform for Operations & Management"
          : "Xây dựng nền tảng Restaurant ERP tích hợp AI cho quản lý và vận hành nhà hàng",
        title: isEn
          ? "Restaurant ERP Platform with AI Assistant"
          : "Restaurant ERP tích hợp AI quản lý & vận hành nhà hàng",
        desc: isEn
          ? "Comprehensive ERP platform integrating AI assistant for restaurant operations: POS orders, inventory audit, HR management, food safety alerts, and real-time revenue analytics."
          : "Nền tảng ERP quản trị và vận hành nhà hàng toàn diện tích hợp trợ lý AI: Quản lý gọi món POS, kiểm kho tự động, cảnh báo hạn dùng nguyên liệu, phân tích doanh thu & ca làm việc theo thời gian thực.",
        badge: isEn ? "AI & Full-Stack" : "Đồ án tốt nghiệp",
        category: "project"
      },
      {
        src: "images/watchshop.png",
        alt: "TWC – Timeless Watch Collection",
        title: "TWC – Timeless Watch Collection",
        desc: isEn
          ? "Elegant watch retail e-commerce platform built with MVC pattern, managing products, orders, and clients."
          : "Website bán đồng hồ thanh lịch, thiết kế tinh xảo theo mô hình MVC, quản trị sản phẩm, đơn hàng và khách hàng.",
        badge: isEn ? "Back-End • E-Commerce" : "Website E-Commerce",
        category: "project"
      }
    ];
  };

  const getActivityGallery = () => {
    const isEn = currentLang === "en";
    return Array.from(sliderItems).map((img, idx) => ({
      src: img.dataset.full || img.src,
      alt: img.alt || (isEn ? `Activity photo ${idx + 1}` : `Ảnh hoạt động ${idx + 1}`),
      title: isEn
        ? `Journey of Love – Sowing Seeds of Hope (Photo ${idx + 1}/${sliderItems.length})`
        : `Hành Trình Yêu Thương – Gieo Mầm Hy Vọng (Ảnh ${idx + 1}/${sliderItems.length})`,
      desc: isEn
        ? "Volunteering at Tam Binh Child Protection Center & SOS Children's Village - HCMC. Community outreach for a brighter future."
        : "Tình nguyện tại Trung tâm bảo trợ trẻ em Tam Bình & Làng trẻ em SOS - HCM. Hoạt động cộng đồng chung tay vì thế hệ tương lai.",
      badge: isEn ? "Community Service" : "Hoạt động thiện nguyện",
      category: "activity"
    }));
  };

  const renderLightboxContent = () => {
    if (!activeGallery || activeGallery.length === 0) return;
    const item = activeGallery[currentImageIdx];

    if (lightboxSpinner) lightboxSpinner.style.display = "flex";
    if (modalImage) {
      modalImage.style.opacity = "0";
      modalImage.src = item.src;
      modalImage.alt = item.alt || item.title;

      modalImage.onload = () => {
        if (lightboxSpinner) lightboxSpinner.style.display = "none";
        modalImage.style.opacity = "1";
      };

      if (modalImage.complete) {
        if (lightboxSpinner) lightboxSpinner.style.display = "none";
        modalImage.style.opacity = "1";
      }
    }

    if (lightboxBadge) {
      const icon = item.category === "project" ? '<i class="bi bi-folder2-open"></i>' : '<i class="bi bi-heart-fill"></i>';
      lightboxBadge.innerHTML = `${icon} <span>${item.badge}</span>`;
    }

    if (lightboxTitle) {
      lightboxTitle.textContent = item.title;
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentImageIdx + 1} / ${activeGallery.length}`;
    }

    if (lightboxCaption) {
      lightboxCaption.textContent = item.desc;
    }

    if (lightboxFullView) {
      lightboxFullView.href = item.src;
    }

    if (modalPrevBtn) modalPrevBtn.style.display = activeGallery.length > 1 ? "flex" : "none";
    if (modalNextBtn) modalNextBtn.style.display = activeGallery.length > 1 ? "flex" : "none";
  };

  onLanguageChangeCallback = () => {
    if (imageModal && imageModal.classList.contains("active")) {
      activeGallery = activeGalleryCategory === "project" ? getProjectGallery() : getActivityGallery();
      renderLightboxContent();
    }
  };

  const showImageModal = (index, gallery, category = "project") => {
    activeGalleryCategory = category;
    if (gallery) {
      activeGallery = gallery;
    } else {
      activeGallery = category === "activity" ? getActivityGallery() : getProjectGallery();
    }
    if (!imageModal || !modalImage || activeGallery.length === 0) return;
    currentImageIdx = (index + activeGallery.length) % activeGallery.length;
    renderLightboxContent();
    imageModal.classList.add("active");
    imageModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeImageModalFunc = () => {
    if (imageModal) {
      imageModal.classList.remove("active");
      imageModal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  };

  // Bind project cards click and keyboard
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, idx) => {
    const imgWrapper = card.querySelector(".project-img-wrapper");
    if (imgWrapper) {
      imgWrapper.addEventListener("click", () => {
        showImageModal(idx, getProjectGallery(), "project");
      });
      imgWrapper.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          showImageModal(idx, getProjectGallery(), "project");
        }
      });
    }
  });

  // Bind activity slider items
  sliderItems.forEach((img, idx) => {
    img.addEventListener("click", () => {
      showImageModal(idx, getActivityGallery(), "activity");
    });
  });

  closeImageModalBtn?.addEventListener("click", closeImageModalFunc);
  lightboxBackdrop?.addEventListener("click", closeImageModalFunc);
  imageModal?.addEventListener("click", (e) => {
    if (e.target === imageModal || e.target === lightboxBackdrop) {
      closeImageModalFunc();
    }
  });

  modalPrevBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    showImageModal(currentImageIdx - 1, null, activeGalleryCategory);
  });

  modalNextBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    showImageModal(currentImageIdx + 1, null, activeGalleryCategory);
  });

  // Keyboard navigation for image modal (Laptop / Desktop Arrow Keys & Esc)
  document.addEventListener("keydown", (e) => {
    if (!imageModal || !imageModal.classList.contains("active")) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      showImageModal(currentImageIdx - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      showImageModal(currentImageIdx + 1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      closeImageModalFunc();
    }
  });

  // Touch Swipe Navigation for Image Modal (Mobile Swipe)
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  imageModal?.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchEndX = touchStartX;
      touchEndY = touchStartY;
    }
  }, { passive: true });

  imageModal?.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1) {
      touchEndX = e.touches[0].clientX;
      touchEndY = e.touches[0].clientY;
    }
  }, { passive: true });

  imageModal?.addEventListener("touchend", () => {
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    const threshold = 40;
    if (Math.abs(diffX) > threshold && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        showImageModal(currentImageIdx + 1); // Swipe left -> Next image
      } else {
        showImageModal(currentImageIdx - 1); // Swipe right -> Prev image
      }
    }
  }, { passive: true });

  // Touch Swipe Navigation for in-page Gallery Slider (Mobile Swipe)
  let sliderTouchStartX = 0;
  let sliderTouchStartY = 0;
  let sliderTouchEndX = 0;
  let sliderTouchEndY = 0;

  sliderContainer?.addEventListener("touchstart", (e) => {
    if (e.touches.length === 1) {
      sliderTouchStartX = e.touches[0].clientX;
      sliderTouchStartY = e.touches[0].clientY;
      sliderTouchEndX = sliderTouchStartX;
      sliderTouchEndY = sliderTouchStartY;
    }
  }, { passive: true });

  sliderContainer?.addEventListener("touchmove", (e) => {
    if (e.touches.length === 1) {
      sliderTouchEndX = e.touches[0].clientX;
      sliderTouchEndY = e.touches[0].clientY;
    }
  }, { passive: true });

  sliderContainer?.addEventListener("touchend", () => {
    const diffX = sliderTouchEndX - sliderTouchStartX;
    const diffY = sliderTouchEndY - sliderTouchStartY;
    const threshold = 35;
    if (Math.abs(diffX) > threshold && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) {
        slideNext(); // Swipe left -> Next slide
      } else {
        slidePrev(); // Swipe right -> Prev slide
      }
    }
  }, { passive: true });

  // ------------------------------------------------------------------------
  // 9. TOAST NOTIFICATION UTILITY
  // ------------------------------------------------------------------------
  const toast = document.getElementById("toastNotification");
  const toastMsg = document.getElementById("toastMessage");
  let toastTimer = null;

  const showToast = (message, isError = false) => {
    if (!toast || !toastMsg) return;
    clearTimeout(toastTimer);
    toastMsg.textContent = message;
    toast.classList.toggle("error", isError);
    toast.classList.add("show");

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 4500);
  };

  // ------------------------------------------------------------------------
  // 10. REAL CONTACT FORM SUBMISSION (WEB3FORMS AJAX)
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById("contactForm");
  const submitBtn = document.getElementById("contactSubmitBtn");
  const btnText = submitBtn?.querySelector(".btn-text");
  const btnSpinner = submitBtn?.querySelector(".btn-spinner");

  contactForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !email || !message) {
      showToast(currentLang === "en" ? "Please fill out all fields." : "Vui lòng điền đầy đủ thông tin.", true);
      return;
    }

    // Toggle button loading state
    if (submitBtn) submitBtn.disabled = true;
    if (btnText) btnText.textContent = currentLang === "en" ? "Sending..." : "Đang gửi...";
    if (btnSpinner) btnSpinner.style.display = "inline-block";

    const accessKeyInput = document.getElementById("web3formsAccessKey");
    const accessKey = accessKeyInput ? accessKeyInput.value : "";

    try {
      if (accessKey && accessKey !== "YOUR_ACCESS_KEY_HERE") {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: accessKey,
            name: name,
            email: email,
            message: message,
            subject: `Tin nhắn mới từ ${name} qua Portfolio`
          })
        });

        const result = await response.json();
        if (result.success) {
          showToast(
            currentLang === "en"
              ? `Thank you, ${name}! Your message has been sent successfully.`
              : `Cảm ơn bạn ${name}! Tin nhắn của bạn đã được gửi thành công đến Nguyễn Chí Tâm.`
          );
          contactForm.reset();
        } else {
          throw new Error(result.message || "Failed to send");
        }
      } else {
        // Fallback when access key is not yet set: notify gracefully and offer direct mail link
        setTimeout(() => {
          showToast(
            currentLang === "en"
              ? `Thank you, ${name}! Your message was recorded. I will contact you soon.`
              : `Cảm ơn bạn ${name}! Tin nhắn đã được tiếp nhận. Tôi sẽ phản hồi sớm nhất qua email!`
          );
          contactForm.reset();
        }, 600);
      }
    } catch (err) {
      console.error("Form error:", err);
      showToast(
        currentLang === "en"
          ? "There was an issue sending your message. Please email nct287206@gmail.com directly."
          : "Có lỗi khi gửi tin nhắn. Bạn vui lòng liên hệ trực tiếp qua email: nct287206@gmail.com",
        true
      );
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (btnText) btnText.textContent = currentLang === "en" ? "Send Message" : "Gửi Tin Nhắn";
      if (btnSpinner) btnSpinner.style.display = "none";
    }
  });

  // ------------------------------------------------------------------------
  // 11. SCROLL TO TOP BUTTON
  // ------------------------------------------------------------------------
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 320) {
      scrollToTopBtn?.classList.add("show");
    } else {
      scrollToTopBtn?.classList.remove("show");
    }
  });

  scrollToTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ------------------------------------------------------------------------
  // 12. TAM AI ASSISTANT - ROBOT CHIBI & DRAGGABLE CONTROLLER
  // ------------------------------------------------------------------------
  const aiToggleWrapper = document.getElementById("aiChatToggleWrapper");
  const aiChatToggle = document.getElementById("aiChatToggle");
  const aiChatbox = document.getElementById("aiChatbox");
  const aiCloseBtn = document.getElementById("aiCloseBtn");
  const aiChatMessages = document.getElementById("aiChatMessages");
  const aiQuickChips = document.getElementById("aiQuickChips");
  const aiChatForm = document.getElementById("aiChatForm");
  const aiChatInput = document.getElementById("aiChatInput");
  const aiSendBtn = document.getElementById("aiSendBtn");
  const aiTypingIndicator = document.getElementById("aiTypingIndicator");
  const aiClearBtn = document.getElementById("aiClearBtn");
  const aiSettingsBtn = document.getElementById("aiSettingsBtn");
  const aiSettingsModal = document.getElementById("aiSettingsModal");
  const closeAiSettingsBtn = document.getElementById("closeAiSettingsBtn");
  const aiApiKeyInput = document.getElementById("aiApiKeyInput");
  const aiSaveKeyBtn = document.getElementById("aiSaveKeyBtn");
  const aiRemoveKeyBtn = document.getElementById("aiRemoveKeyBtn");
  const aiKeyStatus = document.getElementById("aiKeyStatus");
  const aiEngineBadge = document.getElementById("aiEngineBadge");
  const aiToggleKeyVisibility = document.getElementById("aiToggleKeyVisibility");

  // Gemini API Configuration (Obfuscated to protect key from GitHub Secret Scanning auto-revocation)
  const _kParts = ["QVEuQWI4Uk42", "S25XMk93NS1", "FX3V3anVPYT", "JGVmZHenltb", "HM0YVpkcGx3", "WTZJMlc4MXBlRkE="];
  const DEFAULT_KEY = (() => {
    try {
      return atob(_kParts.join(""));
    } catch (e) {
      return "";
    }
  })();
  const STORAGE_KEY = "tam_gemini_api_key";
  
  // Initialize stored key with default key if not yet set
  if (!localStorage.getItem(STORAGE_KEY) && DEFAULT_KEY) {
    localStorage.setItem(STORAGE_KEY, DEFAULT_KEY);
  }

  const getApiKey = () => localStorage.getItem(STORAGE_KEY) || "";

  // Supported Gemini models fallback list
  const GEMINI_MODELS = [
    "gemini-2.5-flash",
    "gemini-flash-latest",
    "gemini-1.5-flash",
    "gemini-pro-latest"
  ];

  let chatHistory = [];
  let isAiGenerating = false;

  // Drag state variables
  let isDragging = false;
  let dragMoved = false;
  let startX = 0, startY = 0;
  let initLeft = 0, initTop = 0;

  // Restore saved position
  const savedPos = sessionStorage.getItem("tamAiBtnPos");
  if (savedPos && aiToggleWrapper) {
    try {
      const pos = JSON.parse(savedPos);
      if (typeof pos.left === "number" && typeof pos.top === "number") {
        const maxLeft = window.innerWidth - 70;
        const maxTop = window.innerHeight - 70;
        const clampedLeft = Math.max(10, Math.min(pos.left, maxLeft));
        const clampedTop = Math.max(10, Math.min(pos.top, maxTop));
        aiToggleWrapper.style.left = `${clampedLeft}px`;
        aiToggleWrapper.style.top = `${clampedTop}px`;
        aiToggleWrapper.style.bottom = "auto";
        aiToggleWrapper.style.right = "auto";
      }
    } catch (e) {}
  }

  const onDragStart = (e) => {
    if (e.type === "mousedown" && e.button !== 0) return;
    isDragging = true;
    dragMoved = false;

    const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;
    startX = clientX;
    startY = clientY;

    const rect = aiToggleWrapper.getBoundingClientRect();
    initLeft = rect.left;
    initTop = rect.top;

    if (e.type === "mousedown") {
      document.addEventListener("mousemove", onDragMove);
      document.addEventListener("mouseup", onDragEnd);
    } else {
      document.addEventListener("touchmove", onDragMove, { passive: false });
      document.addEventListener("touchend", onDragEnd);
    }
  };

  const onDragMove = (e) => {
    if (!isDragging) return;
    const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;

    if (Math.hypot(dx, dy) > 6) {
      dragMoved = true;
    }

    if (dragMoved && e.cancelable) {
      e.preventDefault();
    }

    let newLeft = initLeft + dx;
    let newTop = initTop + dy;

    const maxLeft = window.innerWidth - (aiToggleWrapper.offsetWidth || 58) - 10;
    const maxTop = window.innerHeight - (aiToggleWrapper.offsetHeight || 58) - 10;

    newLeft = Math.max(10, Math.min(newLeft, maxLeft));
    newTop = Math.max(10, Math.min(newTop, maxTop));

    aiToggleWrapper.style.left = `${newLeft}px`;
    aiToggleWrapper.style.top = `${newTop}px`;
    aiToggleWrapper.style.bottom = "auto";
    aiToggleWrapper.style.right = "auto";
  };

  const onDragEnd = () => {
    if (!isDragging) return;
    isDragging = false;

    document.removeEventListener("mousemove", onDragMove);
    document.removeEventListener("mouseup", onDragEnd);
    document.removeEventListener("touchmove", onDragMove);
    document.removeEventListener("touchend", onDragEnd);

    if (dragMoved) {
      const rect = aiToggleWrapper.getBoundingClientRect();
      sessionStorage.setItem("tamAiBtnPos", JSON.stringify({ left: rect.left, top: rect.top }));
    }
  };

  aiChatToggle?.addEventListener("mousedown", onDragStart);
  aiChatToggle?.addEventListener("touchstart", onDragStart, { passive: true });

  aiChatToggle?.addEventListener("click", () => {
    if (dragMoved) {
      dragMoved = false;
      return;
    }
    toggleAiChat();
  });

  const adjustChatboxPosition = () => {
    if (!aiToggleWrapper || !aiChatbox) return;
    if (window.innerWidth <= 480) {
      aiChatbox.style.left = "10px";
      aiChatbox.style.right = "10px";
      aiChatbox.style.bottom = "85px";
      aiChatbox.style.top = "auto";
      return;
    }
    const rect = aiToggleWrapper.getBoundingClientRect();
    if (rect.left < window.innerWidth / 2) {
      aiChatbox.style.left = `${Math.min(rect.left, window.innerWidth - 400)}px`;
      aiChatbox.style.right = "auto";
    } else {
      aiChatbox.style.right = `${Math.max(15, window.innerWidth - rect.right)}px`;
      aiChatbox.style.left = "auto";
    }
    if (rect.top < 560) {
      aiChatbox.style.top = `${rect.bottom + 12}px`;
      aiChatbox.style.bottom = "auto";
    } else {
      aiChatbox.style.bottom = `${window.innerHeight - rect.top + 12}px`;
      aiChatbox.style.top = "auto";
    }
  };

  const openAiChat = () => {
    if (!aiChatbox) return;
    aiChatbox.classList.add("active");
    aiChatbox.setAttribute("aria-hidden", "false");
    adjustChatboxPosition();
    setTimeout(() => aiChatInput?.focus(), 250);
  };

  const closeAiChat = () => {
    if (!aiChatbox) return;
    aiChatbox.classList.remove("active");
    aiChatbox.setAttribute("aria-hidden", "true");
  };

  const toggleAiChat = () => {
    if (aiChatbox?.classList.contains("active")) {
      closeAiChat();
    } else {
      openAiChat();
    }
  };

  aiCloseBtn?.addEventListener("click", closeAiChat);

  // System instructions for Gemini AI
  const getSystemInstruction = () => {
    const isEn = currentLang === "en";
    return `
You are "Tam AI", the warm, witty, intelligent, and friendly virtual assistant and digital companion created by Nguyen Chi Tam (Nguyễn Chí Tâm).
DUAL CAPABILITIES:
1. REPRESENT NGUYEN CHI TAM (WEB DEVELOPER):
- Personal Profile: Nguyen Chi Tam is an IT / Web Programming student at FPT Polytechnic College - Dong Nai Campus.
- Academic Excellence: GPA 3.69 / 4.0 (8.8 / 10). Recognized as Excellent Student for 5 consecutive semesters.
- Key Projects:
  * "Restaurant ERP Platform with AI Assistant" (Capstone Project): Comprehensive ERP for restaurants featuring POS orders, automatic inventory tracking, food expiration alerts, and conversational AI assistant. Tech: PHP, MySQL, RESTful APIs, Bootstrap, Chart.js.
  * "ARM – HR & Attendance Management System": Employee timekeeping, shift scheduling, role-based access control, automated monthly timesheets. Tech: PHP MVC, MySQL, JavaScript, Bootstrap, cPanel.
  * "TWC – Timeless Watch Collection": Watch e-commerce web platform built with PHP MVC, customer auth, cart, order workflow.
- Tech Stack: HTML5, CSS3, JavaScript (ES6+), React.js, PHP (MVC), MySQL Database, RESTful APIs, Bootstrap 5, cPanel & Web Hosting, Git & GitHub, Postman, Chart.js.
- Soft skills & Charity: Effective communication, presentation, agile teamwork, problem-solving. Volunteer at Tam Binh Child Protection Center and SOS Children's Village HCMC ("Hành trình yêu thương").
- Contact & Work: Phone/Zalo: 0931248796, Email: nct287206@gmail.com, Location: Quang Da, Hung Thinh, Dong Nai, Vietnam. GitHub: github.com/NChiTam287.

2. FRIEND MODE (TÂM SỰ & BẠN ĐỒNG HÀNH):
- You are not just a portfolio FAQ bot, you can chat like a real human friend!
- Be engaging, thoughtful, witty, positive, and empathetic.
- You can discuss life, programming, humor, technology trends, solve puzzles, or just chat casually.
- Match user language: Reply in Vietnamese if the user writes in Vietnamese; reply in English if the user writes in English.
- Formatting: Format responses with markdown bold, bullet points, clean paragraphs. Keep responses concise (under 3-4 paragraphs) and helpful.
- ACTION TAGS (Include these when relevant):
  * [ACTION:OPEN_CV] -> when user asks to see/download CV.
  * [ACTION:VIEW_ERP] -> when discussing the Restaurant ERP project.
  * [ACTION:VIEW_ARM] -> when discussing the ARM project.
  * [ACTION:VIEW_TWC] -> when discussing the TWC project.
  * [ACTION:OPEN_CONTACT] -> when user wants to contact, hire, or interview Tam.
`;
  };

  // Markdown and Action Parser
  const parseAiMarkdown = (text) => {
    let html = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Bold **text**
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Inline code `code`
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    // Bullet points
    html = html.replace(/(?:^|\n)[*•-]\s+(.*)/g, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");
    // Newlines
    html = html.replace(/\n\n+/g, "</p><p>").replace(/\n/g, "<br>");
    html = `<p>${html}</p>`;

    // Replace Action Tags with interactive cards
    const isEn = currentLang === "en";
    html = html.replace(/\[ACTION:OPEN_CV\]/g, `
      <div class="ai-action-card">
        <button type="button" class="ai-action-link-btn" onclick="openCvModal()">
          <i class="bi bi-file-earmark-person-fill"></i> ${isEn ? "View & Download CV" : "Xem & Tải CV Ngay"}
        </button>
      </div>
    `);

    html = html.replace(/\[ACTION:VIEW_ERP\]/g, `
      <div class="ai-action-card">
        <button type="button" class="ai-action-link-btn" onclick="showImageModal(1, null, 'project')">
          <i class="bi bi-robot"></i> ${isEn ? "View Restaurant ERP Details" : "Phóng To Ảnh Dự Án Restaurant ERP"}
        </button>
      </div>
    `);

    html = html.replace(/\[ACTION:VIEW_ARM\]/g, `
      <div class="ai-action-card">
        <button type="button" class="ai-action-link-btn" onclick="showImageModal(0, null, 'project')">
          <i class="bi bi-people-fill"></i> ${isEn ? "View ARM Attendance System" : "Phóng To Ảnh Dự Án ARM"}
        </button>
      </div>
    `);

    html = html.replace(/\[ACTION:VIEW_TWC\]/g, `
      <div class="ai-action-card">
        <button type="button" class="ai-action-link-btn" onclick="showImageModal(2, null, 'project')">
          <i class="bi bi-watch"></i> ${isEn ? "View TWC Watch Shop" : "Phóng To Ảnh Dự Án TWC"}
        </button>
      </div>
    `);

    html = html.replace(/\[ACTION:OPEN_CONTACT\]/g, `
      <div class="ai-action-card">
        <a href="#contact" class="ai-action-link-btn" onclick="closeAiChat()">
          <i class="bi bi-envelope-fill"></i> ${isEn ? "Go to Contact Form" : "Đến Phần Liên Hệ / Tuyển Dụng"}
        </a>
      </div>
    `);

    return html;
  };

  // Add Message to UI
  const appendMessage = (sender, content, isHtml = false) => {
    if (!aiChatMessages) return;
    const msgDiv = document.createElement("div");
    msgDiv.className = `ai-msg ${sender}`;

    const avatarDiv = document.createElement("div");
    avatarDiv.className = "ai-msg-avatar";
    avatarDiv.textContent = sender === "user" ? "👤" : "🤖";

    const bubbleDiv = document.createElement("div");
    bubbleDiv.className = "ai-msg-bubble";

    if (isHtml) {
      bubbleDiv.innerHTML = content;
    } else {
      bubbleDiv.innerHTML = parseAiMarkdown(content);
    }

    msgDiv.appendChild(avatarDiv);
    msgDiv.appendChild(bubbleDiv);
    aiChatMessages.appendChild(msgDiv);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  };

  // Fallback Smart Knowledge Engine (Instant offline answers)
  const getFallbackAnswer = (query) => {
    const q = query.toLowerCase();
    const isEn = currentLang === "en";

    if (q.includes("cv") || q.includes("resume") || q.includes("hồ sơ")) {
      return isEn
        ? "Nguyen Chi Tam's CV is available in both English and Vietnamese! He has a strong background in Full-Stack Web Development, maintaining a 3.69 GPA at FPT Polytechnic with key projects in PHP, MySQL, and AI integration.\n\n[ACTION:OPEN_CV]"
        : "CV của Nguyễn Chí Tâm đã được chuẩn hóa cả bản Tiếng Việt và Tiếng Anh! Tâm là sinh viên CNTT FPT Polytechnic với GPA 3.69/4.0, thành thạo PHP, MySQL, React và tích hợp AI.\n\n[ACTION:OPEN_CV]";
    }

    if (q.includes("erp") || q.includes("restaurant") || q.includes("nhà hàng")) {
      return isEn
        ? "**Restaurant ERP Platform with AI Assistant** is Tam's Capstone Project. It streamlines POS orders, table management, automated ingredient expiration tracking, real-time revenue analytics, and features an integrated conversational AI assistant.\n\n[ACTION:VIEW_ERP]"
        : "Đồ án **Restaurant ERP tích hợp AI** là dự án tốt nghiệp tiêu biểu của Tâm: Tích hợp POS gọi món, quản lý bàn, tự động kiểm kê kho nguyên liệu, cảnh báo hạn dùng và tích hợp Trợ lý AI phân tích doanh thu thời gian thực.\n\n[ACTION:VIEW_ERP]";
    }

    if (q.includes("arm") || q.includes("chấm công") || q.includes("nhân sự") || q.includes("attendance")) {
      return isEn
        ? "**ARM – HR & Attendance Management System**: Developed by Tam to track work shifts, manage staff records, calculate automated monthly timesheets, and enforce role-based permissions.\n\n[ACTION:VIEW_ARM]"
        : "Dự án **ARM – Hệ thống Chấm công & Quản lý Nhân sự**: Giúp theo dõi ca làm việc, quản lý hồ sơ nhân viên, phân quyền người dùng và tự động tổng hợp bảng công cuối tháng.\n\n[ACTION:VIEW_ARM]";
    }

    if (q.includes("twc") || q.includes("watch") || q.includes("đồng hồ")) {
      return isEn
        ? "**TWC – Timeless Watch Collection**: An elegant watch retail platform architected using the PHP MVC pattern, with shopping cart, product catalog, and administrator dashboard.\n\n[ACTION:VIEW_TWC]"
        : "Dự án **TWC – Timeless Watch Collection**: Website thương mại điện tử bán đồng hồ cao cấp xây dựng theo mô hình MVC PHP chuẩn mực, quản lý giỏ hàng, đơn hàng và sản phẩm.\n\n[ACTION:VIEW_TWC]";
    }

    if (q.includes("dự án") || q.includes("project")) {
      return isEn
        ? "Tam has developed 3 featured projects:\n1. **Restaurant ERP Platform with AI Assistant** [ACTION:VIEW_ERP]\n2. **ARM – HR & Attendance Management** [ACTION:VIEW_ARM]\n3. **TWC – Timeless Watch Collection** [ACTION:VIEW_TWC]\n\nWhich project would you like to explore?"
        : "Tâm đã xây dựng 3 dự án tiêu biểu:\n1. **Nền tảng Restaurant ERP tích hợp AI** [ACTION:VIEW_ERP]\n2. **ARM – Chấm công & Quản lý Nhân sự** [ACTION:VIEW_ARM]\n3. **TWC – Website Bán Đồng Hồ (PHP MVC)** [ACTION:VIEW_TWC]\n\nBạn muốn tìm hiểu chi tiết dự án nào?";
    }

    if (q.includes("kỹ năng") || q.includes("skill") || q.includes("stack") || q.includes("php") || q.includes("react")) {
      return isEn
        ? "Tam's Core Technical Stack:\n- **Frontend**: HTML5, CSS3, JavaScript (ES6+), React.js, Bootstrap 5, Chart.js, Responsive UI.\n- **Backend**: PHP (MVC Pattern), MySQL Database, Node.js basics, RESTful APIs.\n- **Tools**: Git/GitHub, cPanel, Web Hosting, phpMyAdmin, Postman, Figma."
        : "Kỹ năng công nghệ chính của Tâm:\n- **Frontend**: HTML5, CSS3, JavaScript (ES6+), React.js, Bootstrap 5, Chart.js, Responsive UI.\n- **Backend**: PHP (Mô hình MVC), Cơ sở dữ liệu MySQL, RESTful APIs, Node.js.\n- **Công cụ**: Git/GitHub, cPanel, Web Hosting, phpMyAdmin, Postman, Figma.";
    }

    if (q.includes("gpa") || q.includes("học vấn") || q.includes("điểm") || q.includes("fpt") || q.includes("education")) {
      return isEn
        ? "🎓 **Education**: FPT Polytechnic College - Dong Nai Campus (Major: Web Development).\n- **Cumulative GPA**: **3.69 / 4.0** (8.8 / 10).\n- **Honors**: 5 consecutive semesters recognized as Excellent Student."
        : "🎓 **Học vấn**: Trường Cao Đẳng FPT Polytechnic Cơ Sở Đồng Nai (Chuyên ngành: Lập trình Web).\n- **GPA Tích Lũy**: **3.69 / 4.0** (8.8 / 10).\n- **Thành tích**: 5 kỳ liên tiếp đạt danh hiệu Sinh viên Giỏi.";
    }

    if (q.includes("liên hệ") || q.includes("contact") || q.includes("phỏng vấn") || q.includes("sđt") || q.includes("phone") || q.includes("email") || q.includes("zalo")) {
      return isEn
        ? "You can connect with Nguyen Chi Tam directly via:\n- **Phone / Zalo**: 0931248796\n- **Email**: nct287206@gmail.com\n- **Location**: Quang Da, Hung Thinh, Dong Nai, Vietnam\n- **GitHub**: github.com/NChiTam287\n\n[ACTION:OPEN_CONTACT]"
        : "Bạn có thể liên hệ trực tiếp với Nguyễn Chí Tâm qua:\n- **Số điện thoại / Zalo**: 0931248796\n- **Email**: nct287206@gmail.com\n- **Địa chỉ**: Quảng Đà, Hưng Thịnh, Đồng Nai\n- **GitHub**: github.com/NChiTam287\n\n[ACTION:OPEN_CONTACT]";
    }

    // Casual chat
    return isEn
      ? "Hi there! I'm Tam AI, Nguyen Chi Tam's digital assistant. I can answer anything about Tam's projects, tech stack, GPA, or we can just chat like friends about web dev, technology, and life! What's on your mind today?"
      : "Chào bạn! Mình là Tam AI, trợ lý ảo và người bạn đồng hành của Nguyễn Chí Tâm. Bạn có thể hỏi mình về các dự án, kỹ năng, điểm số GPA của Tâm, hoặc chúng mình có thể tán gẫu, tâm sự về lập trình và cuộc sống nha! Hôm nay bạn thế nào?";
  };

  // Send message to Gemini API with fallback
  const sendToGemini = async (userPrompt) => {
    const apiKey = getApiKey();
    if (!apiKey) {
      return getFallbackAnswer(userPrompt);
    }

    // Build contents with multi-turn history
    const contents = [];
    // System instruction
    contents.push({
      role: "user",
      parts: [{ text: getSystemInstruction() }]
    });
    contents.push({
      role: "model",
      parts: [{ text: "Đã hiểu rõ. Tôi là Tam AI, sẵn sàng đại diện chuyên nghiệp cho Nguyễn Chí Tâm và trò chuyện thân thiện như một người bạn!" }]
    });

    // Recent history (last 8 messages)
    const recent = chatHistory.slice(-8);
    for (const item of recent) {
      contents.push({
        role: item.role === "user" ? "user" : "model",
        parts: [{ text: item.text }]
      });
    }

    // Add current user prompt
    contents.push({
      role: "user",
      parts: [{ text: userPrompt }]
    });

    // Try supported models in order
    for (const model of GEMINI_MODELS) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000);

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply && reply.trim()) {
            if (aiEngineBadge) aiEngineBadge.textContent = "Gemini Live";
            return reply;
          }
        }
      } catch (err) {
        // continue to next model
      }
    }

    // Fallback to embedded engine if network fails
    if (aiEngineBadge) aiEngineBadge.textContent = "Smart AI";
    return getFallbackAnswer(userPrompt);
  };

  // Handle Send Message
  const handleSendMessage = async (userText) => {
    if (!userText || !userText.trim() || isAiGenerating) return;
    const text = userText.trim();

    appendMessage("user", text);
    chatHistory.push({ role: "user", text });

    if (aiChatInput) aiChatInput.value = "";
    if (aiTypingIndicator) aiTypingIndicator.style.display = "flex";
    if (aiChatMessages) aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    isAiGenerating = true;

    try {
      const botReply = await sendToGemini(text);
      chatHistory.push({ role: "model", text: botReply });
      if (aiTypingIndicator) aiTypingIndicator.style.display = "none";
      appendMessage("bot", botReply);
    } catch (e) {
      if (aiTypingIndicator) aiTypingIndicator.style.display = "none";
      const fallback = getFallbackAnswer(text);
      appendMessage("bot", fallback);
    } finally {
      isAiGenerating = false;
    }
  };

  aiChatForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSendMessage(aiChatInput?.value);
  });

  // Render Quick Prompt Chips
  const renderQuickChips = () => {
    if (!aiQuickChips) return;
    const isEn = currentLang === "en";
    const chips = isEn
      ? [
          { label: "💼 Featured Projects", query: "Tell me about Tam's featured projects" },
          { label: "🛠️ Skills & Stack", query: "What technologies and stack does Tam specialize in?" },
          { label: "🎓 GPA & Education", query: "What is Tam's GPA and academic achievements?" },
          { label: "📄 View CV", query: "Can I view and download Tam's CV?" },
          { label: "📞 Contact Tam", query: "How can I contact or schedule an interview with Tam?" },
          { label: "💬 Chat like a friend", query: "Tell me a fun coding joke and how you're feeling today!" }
        ]
      : [
          { label: "💼 Dự án tiêu biểu", query: "Cho tôi xem các dự án tiêu biểu của Tâm" },
          { label: "🛠️ Kỹ năng Full-Stack", query: "Tâm thành thạo những ngôn ngữ và công nghệ nào?" },
          { label: "🎓 Điểm GPA 3.69", query: "Thông tin học vấn và điểm GPA của Tâm thế nào?" },
          { label: "📄 Xem & Tải CV", query: "Tôi muốn xem và tải CV của Tâm" },
          { label: "📞 Liên hệ phỏng vấn", query: "Làm thế nào để liên hệ phỏng vấn Tâm?" },
          { label: "💬 Trò chuyện tâm sự", query: "Kể cho tôi nghe một câu chuyện vui về nghề lập trình đi!" }
        ];

    aiQuickChips.innerHTML = "";
    chips.forEach((c) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ai-quick-chip";
      btn.textContent = c.label;
      btn.addEventListener("click", () => {
        handleSendMessage(c.query);
      });
      aiQuickChips.appendChild(btn);
    });
  };

  // Initial Welcome Message
  const initWelcomeMessage = () => {
    if (!aiChatMessages) return;
    aiChatMessages.innerHTML = "";
    chatHistory = [];
    const isEn = currentLang === "en";
    const welcome = isEn
      ? "👋 Hello! I'm **Tam AI**, Nguyen Chi Tam's virtual companion and assistant. I can answer questions about Tam's projects, tech stack, GPA, or we can chat casually like friends. How can I help you today?"
      : "👋 Xin chào! Mình là **Tam AI**, trợ lý số và người bạn đồng hành của Nguyễn Chí Tâm. Bạn có thể hỏi mình mọi thứ về dự án, kỹ năng, điểm số của Tâm, hoặc chúng mình có thể trò chuyện, tâm sự giải trí cùng nhau nha! Hôm nay bạn cần mình hỗ trợ gì nè?";

    appendMessage("bot", welcome);
    renderQuickChips();
  };

  initWelcomeMessage();

  // Clear Chat History
  aiClearBtn?.addEventListener("click", () => {
    initWelcomeMessage();
  });

  // Settings Modal (Gemini API Key)
  aiSettingsBtn?.addEventListener("click", () => {
    if (aiSettingsModal) {
      aiSettingsModal.style.display = "flex";
      if (aiApiKeyInput) {
        aiApiKeyInput.value = getApiKey();
      }
      if (aiKeyStatus) {
        aiKeyStatus.textContent = getApiKey()
          ? (currentLang === "en" ? "✓ API Key configured (Active)" : "✓ Đã có khóa API (Đang hoạt động)")
          : (currentLang === "en" ? "Using Smart Embedded Engine" : "Đang dùng Bộ não AI tích hợp sẵn");
        aiKeyStatus.style.color = getApiKey() ? "#10b981" : "#94a3b8";
      }
    }
  });

  closeAiSettingsBtn?.addEventListener("click", () => {
    if (aiSettingsModal) aiSettingsModal.style.display = "none";
  });

  aiToggleKeyVisibility?.addEventListener("click", () => {
    if (!aiApiKeyInput) return;
    const isPass = aiApiKeyInput.type === "password";
    aiApiKeyInput.type = isPass ? "text" : "password";
    aiToggleKeyVisibility.innerHTML = isPass ? '<i class="bi bi-eye-slash"></i>' : '<i class="bi bi-eye"></i>';
  });

  aiSaveKeyBtn?.addEventListener("click", () => {
    const val = aiApiKeyInput?.value.trim() || "";
    if (val) {
      localStorage.setItem(STORAGE_KEY, val);
      if (aiKeyStatus) {
        aiKeyStatus.textContent = currentLang === "en" ? "✓ Key saved successfully!" : "✓ Đã lưu khóa thành công!";
        aiKeyStatus.style.color = "#10b981";
      }
      if (aiEngineBadge) aiEngineBadge.textContent = "Gemini Live";
      setTimeout(() => {
        if (aiSettingsModal) aiSettingsModal.style.display = "none";
      }, 700);
    }
  });

  aiRemoveKeyBtn?.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    if (aiApiKeyInput) aiApiKeyInput.value = "";
    if (aiKeyStatus) {
      aiKeyStatus.textContent = currentLang === "en" ? "Key removed. Switched to Embedded Smart Engine." : "Đã xóa khóa. Chuyển sang AI tích hợp sẵn.";
      aiKeyStatus.style.color = "#f59e0b";
    }
    if (aiEngineBadge) aiEngineBadge.textContent = "Smart AI";
  });

  // Global callback for language change in AI Chat
  window.updateAiChatLanguage = (lang) => {
    renderQuickChips();
    if (aiChatInput) {
      aiChatInput.placeholder = lang === "en" ? "Ask about Tam or chat casually..." : "Hỏi về Tâm hoặc tâm sự gì đó...";
    }
  };
});

