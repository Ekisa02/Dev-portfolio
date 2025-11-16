// Enhanced main application with mobile menu and animations
class PortfolioApp {
    constructor() {
        this.isMobileMenuOpen = false;
        this.currentQuoteIndex = 0;
        this.init();
    }
    
    init() {
        this.loadProjects();
        this.loadExperience();
        this.loadAchievements();
        this.loadSkills();
        this.setupEventListeners();
        this.setupFormHandling();
        this.setupMobileMenu();
        this.startQuoteRotation();
        this.setupAudioPlayer();
        this.startNumberCounting();
    }
    
    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        mobileMenuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        // Close menu when clicking outside
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        this.isMobileMenuOpen = !this.isMobileMenuOpen;
        mobileMenuBtn.classList.toggle('active', this.isMobileMenuOpen);
        mobileMenu.classList.toggle('active', this.isMobileMenuOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
    }
    
    closeMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenu = document.getElementById('mobileMenu');
        
        this.isMobileMenuOpen = false;
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    startQuoteRotation() {
        const quotes = document.querySelectorAll('.quote');
        if (quotes.length === 0) return;
        
        setInterval(() => {
            quotes[this.currentQuoteIndex].classList.remove('active');
            this.currentQuoteIndex = (this.currentQuoteIndex + 1) % quotes.length;
            quotes[this.currentQuoteIndex].classList.add('active');
        }, 5000);
    }
    
    setupAudioPlayer() {
        const audio = document.getElementById('inspirationAudio');
        const playPauseBtn = document.querySelector('.play-pause');
        const progressBar = document.querySelector('.progress');
        const timeDisplay = document.querySelector('.time');
        
        if (!audio || !playPauseBtn) return;
        
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audio.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
            
            // Update time display
            const minutes = Math.floor(audio.currentTime / 60);
            const seconds = Math.floor(audio.currentTime % 60);
            timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        });
        
        audio.addEventListener('ended', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            progressBar.style.width = '0%';
            timeDisplay.textContent = '0:00';
        });
    }
    
    startNumberCounting() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            
            let current = 0;
            
            const updateCount = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target;
                    counter.classList.add('counted');
                }
            };
            
            // Start counting when element is in viewport
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCount();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(counter);
        });
    }
    
    loadProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;
        
        terminalData.projects.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectsGrid.appendChild(projectCard);
        });
    }
    
    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card fade-in hover-lift';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                ${project.status.includes('Live') ? `
                    <a href="${project.projectLink}" class="project-link" target="_blank">
                        <i class="fab fa-google-play"></i> Play Store
                    </a>
                ` : ''}
                <a href="${project.githubLink}" class="project-link" target="_blank">
                    <i class="fab fa-github"></i> GitHub
                </a>
            </div>
            <div class="project-status">
                <span class="status-badge">${project.status}</span>
                <span class="role-badge">${project.role}</span>
            </div>
        `;
        return card;
    }
    
    loadExperience() {
        const timeline = document.querySelector('.experience-timeline');
        if (!timeline) return;
        
        terminalData.experience.forEach(exp => {
            const timelineItem = this.createTimelineItem(exp);
            timeline.appendChild(timelineItem);
        });
    }
    
    createTimelineItem(experience) {
        const item = document.createElement('div');
        item.className = 'timeline-item fade-in hover-lift';
        item.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-date">${experience.period}</div>
                <h3>${experience.title}</h3>
                <h4>${experience.company}</h4>
                <p>${experience.description}</p>
                ${experience.achievements ? `
                    <div class="achievements-list">
                        <strong>Key Achievements:</strong>
                        <ul>
                            ${experience.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
        return item;
    }
    
    loadAchievements() {
        const achievementsGrid = document.getElementById('achievementsGrid');
        if (!achievementsGrid) return;
        
        terminalData.achievements.forEach(achievement => {
            const achievementCard = this.createAchievementCard(achievement);
            achievementsGrid.appendChild(achievementCard);
        });
    }
    
  


// UPDATED: createAchievementCard (This adds the button)
createAchievementCard(achievement) {
    const card = document.createElement('div');
    card.className = 'achievement-card fade-in hover-lift';
    
    card.innerHTML = `
        <div class="achievement-icon">
            <i class="fas fa-${achievement.icon}"></i> 
        </div>
        <h3>${achievement.title}</h3>
        <div class="achievement-date">${achievement.date}</div>
        <div class="achievement-org">${achievement.organization}</div>
        <p>${achievement.description}</p>
        <button class="btn btn-view-cert">View Certificate</button>
    `;

    const viewBtn = card.querySelector('.btn-view-cert');
    
    // Add the click listener
    // Using .bind(this) just in case 'this' is a problem
    viewBtn.addEventListener('click', ((e) => {
        e.stopPropagation(); 

        const safeTitle = achievement.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const extension = achievement.certificateImage.split('.').pop() || 'jpg';
        const filename = `${safeTitle}_certificate.${extension}`;
        
        // This 'this' will be correct because of .bind()
        this.showCertificateModal(achievement.certificateImage, achievement.title, filename);
    }).bind(this)); // <-- .bind(this) is a safe way to make sure 'this' works
    
    return card;
}

// 
// NEW & IMPROVED: showCertificateModal (Handles PDF/Image)
//
showCertificateModal(imgSrc, title, filename) {
    // 1. Check if it's a PDF
    const isPdf = imgSrc.toLowerCase().endsWith('.pdf');
    
    // 2. Create Modal structure
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'certificate-modal-overlay';
    
    // 3. Create modal body content based on file type
    let modalBodyContent;
    if (isPdf) {
        // Use <iframe> for PDFs
        modalBodyContent = `
            <iframe src="${imgSrc}" class="certificate-iframe" 
                    title="${title}" frameborder="0">
            </iframe>
        `;
    } else {
        // Use <img> for images
        modalBodyContent = `
            <img src="${imgSrc}" alt="${title} Certificate" class="certificate-image" />
        `;
    }

    modalOverlay.innerHTML = `
        <div class="certificate-modal ${isPdf ? 'pdf-modal' : ''}">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close-btn" title="Close">&times;</button>
            </div>
            <div class="modal-body">
                ${modalBodyContent}
            </div>
            <div class="modal-footer">
                <button class="btn btn-modal-download">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="btn btn-modal-share">
                    <i class="fas fa-share-alt"></i> Share
                </button>
            </div>
        </div>
    `;
    
    // 4. Append to body and lock scroll
    document.body.appendChild(modalOverlay);
    document.body.style.overflow = 'hidden';

    // 5. Add Event Listeners
    
    // Close function
    const closeModal = () => {
        modalOverlay.classList.add('closing'); 
        modalOverlay.addEventListener('animationend', () => {
            document.body.removeChild(modalOverlay);
            document.body.style.overflow = 'auto'; 
        });
    };
    
    modalOverlay.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) { 
            closeModal();
        }
    });

    // Download button
    modalOverlay.querySelector('.btn-modal-download').addEventListener('click', () => {
        const a = document.createElement('a');
        a.href = imgSrc;
        a.download = filename; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    // Share button
    modalOverlay.querySelector('.btn-modal-share').addEventListener('click', () => {
        // The handleShare function from my previous message will
        // work for both PDFs and Images.
        this.handleShare(imgSrc, title, filename);
    });
}

// This function is the same as before. 
// Make sure it's in your class/script.
async handleShare(imgSrc, title, filename) {
    const shareData = {
        title: 'Certificate',
        text: `Check out my certificate: ${title}`,
        url: window.location.href 
    };

    if (navigator.share) {
        try {
            const response = await fetch(imgSrc);
            const blob = await response.blob();
            const file = new File([blob], filename, { type: blob.type });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: title,
                    text: `Check out my certificate for ${title}.`
                });
            } else {
                await navigator.share(shareData);
            }
        } catch (err) {
            console.error("Share failed:", err);
            try {
                await navigator.share(shareData);
            } catch (shareErr) {
                console.error("Text share also failed:", shareErr);
                alert("Could not share at this time.");
            }
        }
    } else {
        alert("Share feature is not supported on your browser.");
    }
}

    loadSkills() {
        const skillsContainer = document.getElementById('skillsContainer');
        if (!skillsContainer) return;
        
        Object.entries(terminalData.skills).forEach(([category, skills]) => {
            const skillCategory = this.createSkillCategory(category, skills);
            skillsContainer.appendChild(skillCategory);
        });
    }
    
    createSkillCategory(category, skills) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category fade-in hover-lift';
        categoryDiv.innerHTML = `
            <h3>
                <i class="fas fa-${this.getCategoryIcon(category)}"></i>
                ${category}
            </h3>
            <div class="skill-items">
                ${skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
            </div>
        `;
        return categoryDiv;
    }
    
    getCategoryIcon(category) {
        const icons = {
            'Mobile Development': 'mobile-alt',
            'AI & Machine Learning': 'robot',
            'Backend Technologies': 'server',
            'Cloud & DevOps': 'cloud',
            'Tools & Platforms': 'tools',
            'Architecture & Design': 'layer-group'
        };
        return icons[category] || 'code';
    }
    
    setupEventListeners() {
        // Terminal toggle
        const terminalToggle = document.getElementById('terminalToggle');
        if (terminalToggle) {
            terminalToggle.addEventListener('click', openTerminal);
        }
        
        // Navigation smooth scrolling
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollToSection(targetId);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Update mobile nav links
                const mobileLinks = document.querySelectorAll('.mobile-nav-link');
                mobileLinks.forEach(l => l.classList.remove('active'));
                document.querySelector(`.mobile-nav-link[href="#${targetId}"]`).classList.add('active');
            });
        });
        
        // Mobile nav links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                scrollToSection(targetId);
                
                // Update active nav links
                mobileNavLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                navLinks.forEach(l => l.classList.remove('active'));
                document.querySelector(`.nav-link[href="#${targetId}"]`).classList.add('active');
            });
        });
        
        // Close terminal when clicking outside
        const terminalModal = document.getElementById('terminalModal');
        if (terminalModal) {
            terminalModal.addEventListener('click', (e) => {
                if (e.target === terminalModal) {
                    closeTerminal();
                }
            });
        }
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl + K to open terminal
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                openTerminal();
            }
            
            // Escape to close terminal or mobile menu
            if (e.key === 'Escape') {
                if (window.terminal && window.terminal.isOpen) {
                    closeTerminal();
                }
                if (this.isMobileMenuOpen) {
                    this.closeMobileMenu();
                }
            }
        });
        
        // Scroll-based animations
        this.setupScrollAnimations();
    }
    
    setupScrollAnimations() {
        // Add intersection observer for all animated elements
        const animatedElements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.6s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    setupFormHandling() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(contactForm);
        });
    }
    
    // Check for Formspree success/error parameters in URL
    this.checkFormspreeStatus();
}

handleFormSubmit(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    const formStatus = document.getElementById('form-status');
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    form.classList.add('submitting');
    
    // Send to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            // Success - show success message
            formStatus.textContent = 'Thank you! Your message has been sent successfully.';
            formStatus.className = 'form-status success';
            form.classList.add('success');
            form.classList.remove('error');
            form.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
                form.classList.remove('success');
            }, 5000);
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        // Error - show error message
        formStatus.textContent = 'There was an error sending your message. Please try again.';
        formStatus.className = 'form-status error';
        form.classList.add('error');
        form.classList.remove('success');
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
            form.classList.remove('error');
        }, 5000);
        
        console.error('Form submission error:', error);
    })
    .finally(() => {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.classList.remove('submitting');
        formStatus.style.display = 'block';
    });
}

checkFormspreeStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    const formStatus = document.getElementById('form-status');
    const contactForm = document.getElementById('contactForm');
    
    if (urlParams.get('success') === 'true') {
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.className = 'form-status success';
        contactForm.classList.add('success');
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
            contactForm.classList.remove('success');
        }, 5000);
    }
    
    if (urlParams.get('success') === 'false') {
        formStatus.textContent = 'There was an error sending your message. Please try again.';
        formStatus.className = 'form-status error';
        contactForm.classList.add('error');
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
            contactForm.classList.remove('error');
        }, 5000);
    }
}
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new PortfolioApp();
});

// Global utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed header
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}