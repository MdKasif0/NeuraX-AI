// account.js
document.addEventListener('DOMContentLoaded', () => {
    const accountContent = document.getElementById('accountContent');
    const userAccountIcon = document.getElementById('userAccountIcon');
    const userAccountImage = document.getElementById('userAccountImage');

    function updateUI() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            accountContent.innerHTML = `
                <div class="user-info">
                    <img src="${user.avatar || 'account.png'}" alt="User Avatar" class="user-avatar" id="userAvatar">
                    <div class="user-details">
                        <h2>${user.name}</h2>
                        <p>${user.email}</p>
                    </div>
                </div>
                <div class="image-upload">
                    <label for="avatarUpload">Change Profile Picture</label>
                    <input type="file" id="avatarUpload" accept="image/*">
                </div>
                <button id="logoutButton">Log Out</button>
            `;

            userAccountIcon.style.display = 'block';
            userAccountImage.src = user.avatar || 'account.png';

            document.getElementById('avatarUpload').addEventListener('change', handleAvatarUpload);
            document.getElementById('logoutButton').addEventListener('click', handleLogout);
        } else {
            accountContent.innerHTML = `
                <div class="login-signup">
                    <h2>Welcome to Your Account</h2>
                    <p>Please log in or sign up to access your account features.</p>
                    <button id="loginButton">Log In</button>
                    <button id="signupButton">Sign Up</button>
                </div>
            `;

            userAccountIcon.style.display = 'none';

            document.getElementById('loginButton').addEventListener('click', () => openModal(loginModal));
            document.getElementById('signupButton').addEventListener('click', () => openModal(signupModal));
        }
    }

    function handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const user = JSON.parse(localStorage.getItem('user'));
                user.avatar = e.target.result;
                localStorage.setItem('user', JSON.stringify(user));
                updateUI();
            };
            reader.readAsDataURL(file);
        }
    }

    function handleLogout() {
        localStorage.removeItem('user');
        updateUI();
    }

    // Login form submission
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // In a real application, you would validate credentials here
        // For demo purposes, we'll just create a user object
        const user = {
            name: 'Demo User',
            email: email,
            avatar: 'account.png'
        };
        localStorage.setItem('user', JSON.stringify(user));
        closeModal(loginModal);
        updateUI();
    });

    // Signup form submission
    document.getElementById('signupForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        
        // In a real application, you would send this data to a server
        // For demo purposes, we'll just create a user object
        const user = {
            name: name,
            email: email,
            avatar: 'account.png'
        };
        localStorage.setItem('user', JSON.stringify(user));
        closeModal(signupModal);
        updateUI();
    });

    // Switch between login and signup modals
    document.getElementById('switchToSignup').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(signupModal);
    });

    document.getElementById('switchToLogin').addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        openModal(loginModal);
    });

    // Modal functionality
    function openModal(modal) {
        modal.style.display = 'block';
    }

    function closeModal(modal) {
        modal.style.display = 'none';
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
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

    // Initial UI update
    updateUI();
});

