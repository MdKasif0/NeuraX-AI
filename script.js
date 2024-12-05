document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    menuToggle.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                if (mobileMenu.classList.contains('active')) {
                    toggleMenu();
                }
            }
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Apply animations to elements
    document.querySelectorAll('.feature-card, .footer-section').forEach(element => {
        observer.observe(element);
    });

    // Particle Network Background Effect
    class ParticleNetwork {
        constructor() {
            this.canvas = document.createElement('canvas');
            this.ctx = this.canvas.getContext('2d');
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.zIndex = '-1';
            this.canvas.style.pointerEvents = 'none';
            document.body.appendChild(this.canvas);

            this.particles = [];
            this.particleCount = 50;
            this.connectDistance = 150;

            this.resize();
            this.init();
            
            window.addEventListener('resize', () => this.resize());
            this.animate();
        }

        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }

        init() {
            for (let i = 0; i < this.particleCount; i++) {
                this.particles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
        }

        animate() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

                this.ctx.beginPath();
                this.ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                this.ctx.fillStyle = 'rgba(46, 211, 183, 0.5)';
                this.ctx.fill();
            });

            this.particles.forEach((particle1, i) => {
                this.particles.slice(i + 1).forEach(particle2 => {
                    const dx = particle1.x - particle2.x;
                    const dy = particle1.y - particle2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < this.connectDistance) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle1.x, particle1.y);
                        this.ctx.lineTo(particle2.x, particle2.y);
                        this.ctx.strokeStyle = `rgba(46, 211, 183, ${1 - distance / this.connectDistance})`;
                        this.ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(() => this.animate());
        }
    }

    // Initialize particle network
    new ParticleNetwork();

    // Modal Functionality
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    //const openLogin = document.getElementById('openLogin');
    //const openSignup = document.getElementById('openSignup');
    const heroOpenLogin = document.getElementById('heroOpenLogin');
    const heroOpenSignup = document.getElementById('heroOpenSignup');
    const mobileOpenLogin = document.getElementById('mobileOpenLogin');
    const mobileOpenSignup = document.getElementById('mobileOpenSignup');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const authButtons = document.getElementById('authButtons');
    const mobileAuthButtons = document.getElementById('mobileAuthButtons');
    const userInfo = document.getElementById('userInfo');
    const mobileUserInfo = document.getElementById('mobileUserInfo');
    const userEmailSpan = document.getElementById('userEmail');
    const mobileUserEmailSpan = document.getElementById('mobileUserEmail');
    const logoutButton = document.getElementById('logoutButton');
    const mobileLogoutButton = document.getElementById('mobileLogoutButton');

    function openModal(modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    //openLogin.addEventListener('click', () => openModal(loginModal));
    //openSignup.addEventListener('click', () => openModal(signupModal));
    heroOpenLogin.addEventListener('click', () => openModal(loginModal));
    heroOpenSignup.addEventListener('click', () => openModal(signupModal));
    //mobileOpenLogin.addEventListener('click', () => openModal(loginModal));
    //mobileOpenSignup.addEventListener('click', () => openModal(signupModal));

    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(signupModal);
    });

    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        openModal(loginModal);
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) closeModal(loginModal);
        if (e.target === signupModal) closeModal(signupModal);
    });

    // Custom Popup Functionality
    const customPopup = document.getElementById('customPopup');
    const popupMessage = document.getElementById('popupMessage');
    const closePopup = document.getElementById('closePopup');

    function showPopup(message) {
        popupMessage.textContent = message;
        customPopup.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function hidePopup() {
        customPopup.style.display = 'none';
        document.body.style.overflow = '';
    }

    closePopup.addEventListener('click', hidePopup);

    // Form Submission and Local Storage
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // In a real application, you would validate credentials here
        console.log('Login attempt:', { email, password });
        
        // For demo purposes, we'll just store the email
        localStorage.setItem('userEmail', email);
        showPopup('Logged in successfully!');
        closeModal(loginModal);
        updateAuthState();
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        
        // In a real application, you would send this data to a server
        console.log('Signup attempt:', { name, email, password });
        
        // For demo purposes, we'll just store the user info
        localStorage.setItem('userName', name);
        localStorage.setItem('userEmail', email);
        showPopup('Signed up successfully!');
        closeModal(signupModal);
        updateAuthState();
    });

    // Logout functionality
    function logout() {
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        updateAuthState();
        showPopup('Logged out successfully!');
    }

    logoutButton.addEventListener('click', logout);
    mobileLogoutButton.addEventListener('click', logout);

    // Update UI based on authentication state
    function updateAuthState() {
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            authButtons.style.display = 'none';
            mobileAuthButtons.style.display = 'none';
            userInfo.style.display = 'flex';
            mobileUserInfo.style.display = 'flex';
            userEmailSpan.textContent = userEmail;
            mobileUserEmailSpan.textContent = userEmail;
            document.querySelectorAll('.cta-buttons').forEach(el => el.style.display = 'none');
        } else {
            authButtons.style.display = 'flex';
            mobileAuthButtons.style.display = 'flex';
            userInfo.style.display = 'none';
            mobileUserInfo.style.display = 'none';
            document.querySelectorAll('.cta-buttons').forEach(el => el.style.display = 'flex');
        }
    }

    // Check authentication state on page load
    updateAuthState();
});

