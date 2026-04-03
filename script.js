// Navbar Scroll Effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Theme Switcher
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

const setThemeIcon = (isLight) => {
  if (!themeIcon) return;
  if (isLight) {
    themeIcon.src = "images/light.png";
    themeIcon.alt = "Chế độ sáng";
    themeToggle.setAttribute("aria-label", "Chuyển sang chế độ tối");
    themeToggle.title = "Chuyển sang chế độ tối";
  } else {
    themeIcon.src = "images/dark.png";
    themeIcon.alt = "Chế độ tối";
    themeToggle.setAttribute("aria-label", "Chuyển sang chế độ sáng");
    themeToggle.title = "Chuyển sang chế độ sáng";
  }
};

// Load theme from localStorage
const savedTheme = localStorage.getItem("portfolioTheme") || "dark";
if (savedTheme === "light") {
  body.classList.add("light-mode");
  setThemeIcon(true);
} else {
  setThemeIcon(false);
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  const isLight = body.classList.contains("light-mode");
  localStorage.setItem("portfolioTheme", isLight ? "light" : "dark");
  setThemeIcon(isLight);
});

// Smooth Scroll for Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Intersection Observer for Fade-in Effect
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Form Submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Simple validation
    if (name && email && message) {
      alert(
        "Cảm ơn " +
          name +
          "! Tin nhắn của bạn đã được gửi. Chúng tôi sẽ liên hệ lại soonest!",
      );
      this.reset();
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  });
}

// Add active state for navbar links (click)
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", function () {
    document.querySelectorAll(".nav-links a").forEach((a) => a.classList.remove("active"));
    this.classList.add("active");
    // close mobile nav
    closeMobileMenu();
  });
});

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const menuClose = document.getElementById("menuClose");
const navRight = document.getElementById("navRight");

const toggleMobileMenu = () => {
  navRight.classList.toggle("open");
};

const closeMobileMenu = () => {
  navRight.classList.remove("open");
};

menuToggle.addEventListener("click", toggleMobileMenu);
menuClose.addEventListener("click", closeMobileMenu);

// Setting button mock action
const settingsBtn = document.getElementById("settingsBtn");
if (settingsBtn) {
  settingsBtn.addEventListener("click", () => {
    alert("Chức năng Cài đặt đang thử nghiệm. Cập nhật sớm nhé!");
  });
}

// Hero dynamic role cycling with typing effect
const roles = ["Web Developer", "UI/UX Designer", "Full Stack Developer", "Software Engineer", "Tech Enthusiast"];
const dynamicRole = document.getElementById("dynamicRole");
let roleIdx = 0;

const typeText = (text, element, speed = 80) => {
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

const deleteText = (element, speed = 60) => {
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
    const role = roles[roleIdx];
    await typeText(role, dynamicRole, 80);
    await new Promise(resolve => setTimeout(resolve, 1500));
    await deleteText(dynamicRole, 60);
    roleIdx = (roleIdx + 1) % roles.length;
  }
};

if (dynamicRole) {
  cycleRoles();
}

// Scrollspy active section
const sections = document.querySelectorAll("section[id]");
const aboutSection = document.getElementById("about");
const setActiveNavOnScroll = () => {
  const currentScroll = window.pageYOffset + 110; // Offset for fixed nav/scroll-margin

  // Nếu đang ở phần hero (chưa vào section "about"), bỏ active trên menu
  if (aboutSection && window.pageYOffset < aboutSection.offsetTop - 20) {
    document.querySelectorAll(".nav-links a").forEach((link) => link.classList.remove("active"));
    return;
  }

  let foundActive = false;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 110;
    const sectionBottom = sectionTop + section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
      document.querySelectorAll(".nav-links a").forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      if (activeLink) {
        activeLink.classList.add("active");
        foundActive = true;
      }
    }
  });

  if (!foundActive) {
    document.querySelectorAll(".nav-links a").forEach((link) => link.classList.remove("active"));
  }
};
window.addEventListener("scroll", setActiveNavOnScroll);
window.addEventListener("load", setActiveNavOnScroll);
window.addEventListener("resize", setActiveNavOnScroll);

// Animate numbers in stats
const animateNumbers = () => {
  const statBoxes = document.querySelectorAll(".stat-box h3");
  const isVisible = (el) => {
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  statBoxes.forEach((box) => {
    if (isVisible(box) && !box.animated) {
      const target = parseInt(box.textContent, 10);
      if (Number.isNaN(target)) {
        // Chỉ định số không hợp lệ (ví dụ GPA: 3.69/4), giữ nguyên text và không chạy animation
        box.animated = true;
        return;
      }

      let current = 0;
      const increment = target / 50;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          box.textContent = target + "+";
          clearInterval(timer);
          box.animated = true;
        } else {
          box.textContent = Math.floor(current) + "+";
        }
      }, 30);
    }
  });
};

// Image gallery modal for volunteer
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeImageModal = document.getElementById('closeImageModal');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

const modalItems = Array.from(document.querySelectorAll('.slider-item'));
let currentModalIndex = -1;

const showModalImageAt = (index) => {
  if (!imageModal || !modalImage) return;

  const normalizedIndex = ((index % modalItems.length) + modalItems.length) % modalItems.length;
  const target = modalItems[normalizedIndex];
  if (!target) return;

  const src = target.dataset.full || target.src;
  const alt = target.alt || 'Ảnh hoạt động thiện nguyện';

  modalImage.src = src;
  modalImage.alt = alt;
  currentModalIndex = normalizedIndex;
  imageModal.classList.add('active');
  imageModal.classList.remove('project-image'); // Remove project flag
};

const closeModal = () => {
  if (!imageModal || !modalImage) return;
  imageModal.classList.remove('active');
  imageModal.classList.remove('project-image');
  modalImage.src = '';
  modalImage.alt = '';
  currentModalIndex = -1;
};

closeImageModal?.addEventListener('click', closeModal);
imageModal?.addEventListener('click', (e) => {
  if (e.target === imageModal) closeModal();
});

modalPrev?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (modalItems.length === 0) return;
  const nextIndex = currentModalIndex <= 0 ? modalItems.length - 1 : currentModalIndex - 1;
  showModalImageAt(nextIndex);
});

modalNext?.addEventListener('click', (e) => {
  e.stopPropagation();
  if (modalItems.length === 0) return;
  const nextIndex = (currentModalIndex + 1) % modalItems.length;
  showModalImageAt(nextIndex);
});

const bindModalToImages = () => {
  // Slider items dari volunteer section
  modalItems.forEach((img, index) => {
    img.addEventListener('click', () => {
      showModalImageAt(index);
    });
  });

  // Project images
  const projectImages = document.querySelectorAll('.project-img');
  projectImages.forEach((img) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      if (modalImage && imageModal) {
        const src = img.src;
        const alt = img.alt || 'Project Image';
        modalImage.src = src;
        modalImage.alt = alt;
        imageModal.classList.add('active');
        imageModal.classList.add('project-image');
        currentModalIndex = -1;
      }
    });
  });
};

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

const handleScroll = () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

if (scrollToTopBtn) {
  window.addEventListener('scroll', handleScroll);
  scrollToTopBtn.addEventListener('click', scrollToTop);
}

bindModalToImages();

const sliderTrack = document.getElementById('sliderTrack');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
let sliderIndex = 0;
const visibleItems = 2;
const totalItems = sliderTrack ? sliderTrack.children.length : 0;

const updateSliderPosition = () => {
  if (!sliderTrack) return;
  const stepWidth = sliderTrack.children[0]?.clientWidth + 8 || 0; // thêm margin
  const maxIndex = Math.max(0, totalItems - visibleItems);
  sliderIndex = Math.max(0, Math.min(sliderIndex, maxIndex));
  sliderTrack.style.transform = `translateX(-${sliderIndex * stepWidth}px)`;
};

const slideNext = () => {
  sliderIndex += 1;
  if (sliderIndex > totalItems - visibleItems) sliderIndex = 0;
  updateSliderPosition();
};

const slidePrev = () => {
  sliderIndex -= 1;
  if (sliderIndex < 0) sliderIndex = totalItems - visibleItems;
  updateSliderPosition();
};

sliderNext?.addEventListener('click', () => {
  slideNext();
});

sliderPrev?.addEventListener('click', () => {
  slidePrev();
});

let sliderInterval = setInterval(slideNext, 3000);

document.querySelector('.slider')?.addEventListener('mouseenter', () => {
  clearInterval(sliderInterval);
});

document.querySelector('.slider')?.addEventListener('mouseleave', () => {
  sliderInterval = setInterval(slideNext, 3000);
});

window.addEventListener('resize', updateSliderPosition);

window.addEventListener("scroll", animateNumbers);
