
        document.addEventListener('DOMContentLoaded', () => {
            const body = document.body;
            const themeToggle = document.getElementById('theme-toggle');
            const canvas = document.getElementById('code-canvas');
            const ctx = canvas.getContext('2d');
            let width = canvas.width = window.innerWidth;
            let height = canvas.height = window.innerHeight;
            let particles = [];

            // --- 3.1. Theme Toggling ---
            const currentTheme = localStorage.getItem('theme') || 'light';
            body.dataset.theme = currentTheme;

            themeToggle.addEventListener('click', () => {
                const newTheme = body.dataset.theme === 'light' ? 'dark' : 'light';
                body.dataset.theme = newTheme;
                localStorage.setItem('theme', newTheme);
            });
            
            // --- 3.2. Animated Background (Reusing Logic from MN LS.HTML) ---
            const codeSnippets = [
                'function', 'class', 'return', 'import', 'const', 'let', 'public', 
                'main', 'void', 'def', 'if', 'else', '0101', '110', '001', 'async', 
                'await', 'Map', 'int', 'string', 'select', 'from', 'where'
            ];
            
            // Reusing colors from the variable definitions
            const codeColorsLight = ['#436b95', '#caa855', '#4caf50', '#f44336']; // Blue, Gold, Green, Red
            const codeColorsDark = ['#63b3ed', '#f6ad55', '#48bb78', '#f472b6']; // Lighter versions/accents

            class Particle {
                constructor() {
                    this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.z = Math.random() * 0.8 + 0.2; // Depth (0.2 to 1.0)
                    this.speed = (Math.random() * 0.5 + 0.1) * this.z; // Slower particles are further
                    this.fontSize = (Math.random() * 5 + 10) * this.z;
                    this.opacity = 0;
                    this.targetOpacity = Math.random() * 0.3 + 0.1;
                }

                update() {
                    this.y -= this.speed;
                    if (this.y < -this.fontSize) {
                        this.y = height + this.fontSize;
                        this.x = Math.random() * width;
                    }
                    if (this.opacity < this.targetOpacity) {
                        this.opacity += 0.005;
                    }
                }

                draw() {
                    const isDark = body.dataset.theme === 'dark';
                    const colors = isDark ? codeColorsDark : codeColorsLight;
                    if (!this.color) this.color = colors[Math.floor(Math.random() * colors.length)];
                    
                    ctx.font = `${this.fontSize}px "Inter"`;
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = this.opacity;
                    
                    ctx.filter = `blur(${(1 - this.z) * 1.5}px)`;
                    
                    ctx.fillText(this.text, this.x, this.y);
                    
                    ctx.filter = 'none';
                    ctx.globalAlpha = 1.0;
                }
            }

            function initParticles() {
                const particleCount = window.innerWidth < 768 ? 50 : 100;
                particles = [];
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle());
                }
            }

            function animate() {
                ctx.clearRect(0, 0, width, height);
                
                particles.forEach(p => {
                    p.update();
                    p.draw();
                });
                
                requestAnimationFrame(animate);
            }

            function onResize() {
                width = canvas.width = window.innerWidth;
                height = canvas.height = window.innerHeight;
                initParticles(); 
            }

            window.addEventListener('resize', onResize);

            // Kick off the animation
            initParticles();
            animate();
        });
    