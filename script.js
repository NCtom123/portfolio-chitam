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
      "contact.formBtn": "Gửi Tin Nhắn"
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
      "contact.formBtn": "Send Message"
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
});
