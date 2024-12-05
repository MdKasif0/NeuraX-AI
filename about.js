// about.js
document.addEventListener('DOMContentLoaded', () => {
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
});
