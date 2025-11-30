  //  *********************************************** //
                   $ Created By $ 
                 $ Manthan Vinzuda $
   // ***********************************************  //     
// --- MN LS Script.js ---
        document.addEventListener('DOMContentLoaded', () => {

            // --- 1. Feather Icons ---
            feather.replace();

            // --- 2. DOM Elements ---
            const themeToggle = document.getElementById('theme-toggle');
            const body = document.body;

            const authCard = document.getElementById('auth-card');
            const loginForm = document.getElementById('login-form');
            const signupForm = document.getElementById('signup-form');
            const toSignupLink = document.getElementById('to-signup-link');
            const toLoginLink = document.getElementById('to-login-link');
            
            const forgotPassLink = document.getElementById('forgot-pass-link');
            const forgotModal = document.getElementById('forgot-modal');
            const modalCloseBtn = document.getElementById('modal-close-btn');
            const forgotPasswordForm = document.getElementById('forgot-password-form');
            const forgotFormContent = document.getElementById('forgot-form-content');
            const forgotSuccessMsg = document.getElementById('forgot-success-msg');
            
            const signupPasswordInput = document.getElementById('signup-password');
            const strengthBar = document.getElementById('strength-bar');
            
            const loginBtn = document.getElementById('login-btn');

            // Verification Modal Elements
            const notRobotLabel = document.getElementById('not-robot-label');
            const notRobotCheckbox = document.getElementById('not-robot');
            const notRobotText = document.getElementById('not-robot-text');
            const notRobotCustomCheck = document.getElementById('not-robot-custom-check');
            const humanVerificationModal = document.getElementById('human-verification-modal');
            const humanVerificationCard = document.getElementById('human-verification-card');
            const humanModalCloseBtn = document.getElementById('human-modal-close-btn');
            const challengeGrid = document.getElementById('verification-challenge-grid');
            const challengeStatus = document.getElementById('verification-status');
            const challengeIconName = document.getElementById('challenge-icon-name');

            let challengeIcon = 'check'; // The icon to click
            const allIcons = ['check', 'x', 'circle', 'square', 'heart', 'cloud', 'anchor', 'database', 'globe'];


            // --- 3. Theme Toggler ---
            const setInitialTheme = () => {
                const savedTheme = localStorage.getItem('codeverse-theme') || 'dark';
                if (savedTheme === 'dark') {
                    body.classList.add('dark-mode');
                } else {
                    body.classList.remove('dark-mode');
                }
            };
            
            themeToggle.addEventListener('click', () => {
                body.classList.toggle('dark-mode');
                const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
                localStorage.setItem('codeverse-theme', currentTheme);
            });
            
            setInitialTheme(); // Set theme on load

            // --- 4. Form Switching ---
            const switchForm = (formToHide, formToShow) => {
                formToHide.classList.add('form-fade-out');
                
                setTimeout(() => {
                    formToHide.style.display = 'none';
                    formToHide.classList.remove('form-fade-out');
                    
                    formToShow.style.display = 'block';
                    // We need a tiny delay before adding the fade-in class
                    requestAnimationFrame(() => {
                        formToShow.classList.add('form-fade-in');
                    });

                    // Clean up animation class
                    setTimeout(() => formToShow.classList.remove('form-fade-in'), 500);
                }, 400); // Match CSS animation duration
            };

            toSignupLink.addEventListener('click', (e) => {
                e.preventDefault();
                switchForm(loginForm, signupForm);
            });

            toLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                switchForm(signupForm, loginForm);
            });

            // --- 5. Modal Logic (Forgot Password) ---
            const openForgotModal = () => {
                // Reset modal state
                forgotFormContent.style.display = 'block';
                forgotSuccessMsg.style.display = 'none';
                document.getElementById('forgot-email').value = '';
                
                forgotModal.classList.add('visible');
            };
            
            const closeForgotModal = () => {
                forgotModal.classList.remove('visible');
            };

            forgotPassLink.addEventListener('click', (e) => {
                e.preventDefault();
                openForgotModal();
            });
            
            modalCloseBtn.addEventListener('click', closeForgotModal);
            
            forgotModal.addEventListener('click', (e) => {
                if (e.target === forgotModal) {
                    closeForgotModal();
                }
            });
            
            // Modal Form Submission
            forgotPasswordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Simulate API call
                forgotFormContent.style.display = 'none';
                forgotSuccessMsg.style.display = 'block';
                console.log('Password reset requested for:', document.getElementById('forgot-email').value);
            });

            // --- 5b. Modal Logic (Human Verification) ---

            // Utility to shuffle an array
            const shuffleArray = (array) => {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
                return array;
            };

            const setupVerificationChallenge = () => {
                challengeStatus.textContent = ' '; // Clear status
                
                // Pick a new challenge icon
                challengeIcon = allIcons[Math.floor(Math.random() * allIcons.length)];
                challengeIconName.textContent = challengeIcon;
                
                // Create a set of 6 unique icons, including the challenge icon
                let iconsToShow = [challengeIcon];
                let otherIcons = allIcons.filter(icon => icon !== challengeIcon);
                shuffleArray(otherIcons);
                iconsToShow = iconsToShow.concat(otherIcons.slice(0, 5));
                shuffleArray(iconsToShow);
                
                // Populate the grid
                challengeGrid.innerHTML = '';
                iconsToShow.forEach(iconName => {
                    challengeGrid.innerHTML += `
                        <div class="verification-icon" data-icon="${iconName}" role="button" aria-label="Click ${iconName}">
                            <i data-feather="${iconName}"></i>
                        </div>
                    `;
                });
                feather.replace(); // Re-render the new icons
            };

            const openHumanVerificationModal = () => {
                setupVerificationChallenge();
                humanVerificationModal.classList.add('visible');
            };

            const closeHumanVerificationModal = () => {
                humanVerificationModal.classList.remove('visible');
            };

            notRobotLabel.addEventListener('click', (e) => {
                e.preventDefault(); // Stop the checkbox from ticking
                if (notRobotCheckbox.checked) {
                    return; // Already verified
                }
                openHumanVerificationModal();
            });

            challengeGrid.addEventListener('click', (e) => {
                const clickedIconEl = e.target.closest('.verification-icon');
                if (!clickedIconEl) return;

                const clickedIconName = clickedIconEl.dataset.icon;
                
                if (clickedIconName === challengeIcon) {
                    // SUCCESS
                    notRobotCheckbox.checked = true;
                    notRobotText.textContent = 'Verified!';
                    notRobotLabel.style.opacity = '0.7';
                    notRobotLabel.style.cursor = 'default';
                    notRobotCustomCheck.style.borderColor = '#2ecc71';
                    notRobotCustomCheck.style.background = '#2ecc71';
                    closeHumanVerificationModal();
                } else {
                    // FAILED
                    challengeStatus.textContent = 'Incorrect, please try again.';
                    humanVerificationCard.classList.add('shake');
                    setTimeout(() => humanVerificationCard.classList.remove('shake'), 500);
                    // Re-setup challenge
                    setTimeout(setupVerificationChallenge, 500);
                }
            });
            
            humanModalCloseBtn.addEventListener('click', closeHumanVerificationModal);
            humanVerificationModal.addEventListener('click', (e) => {
                if (e.target === humanVerificationModal) {
                    closeHumanVerificationModal();
                }
            });

            
            // --- 6. Password Strength Meter ---
            const checkPasswordStrength = (password) => {
                let score = 0;
                if (password.length > 8) score++;
                if (/[A-Z]/.test(password)) score++;
                if (/[a-z]/.test(password)) score++;
                if (/[0-9]/.test(password)) score++;
                if (/[^A-Za-z0-9]/.test(password)) score++;

                strengthBar.classList.remove('medium', 'strong');
                switch (score) {
                    case 0:
                    case 1:
                    case 2:
                        strengthBar.style.width = '33%';
                        break;
                    case 3:
                    case 4:
                        strengthBar.style.width = '66%';
                        strengthBar.classList.add('medium');
                        break;
                    case 5:
                        strengthBar.style.width = '100%';
                        strengthBar.classList.add('strong');
                        break;
                    default:
                        strengthBar.style.width = '0%';
                }
            };

            if(signupPasswordInput) {
                signupPasswordInput.addEventListener('input', (e) => {
                    checkPasswordStrength(e.target.value);
                });
            }

            // --- 7. Login with Backend ---
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();

                const email = document.getElementById("login-email").value;
                const password = document.getElementById("login-password").value;

                loginBtn.textContent = "Signing In...";

                try {
                    const res = await fetch(`${BASE_URL}/api/auth/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                 const data = await res.json();

                if (!res.ok) {
                    loginBtn.textContent = "Sign In";
                    alert(data.message || "Login failed!");
                    return;
             }

                // SAVE USER
                localStorage.setItem("user", JSON.stringify(data));

                // SUCCESS animation
                loginBtn.style.background = '#2ecc71';
                loginBtn.textContent = "Success! ✨";

                // Redirect after 1s  
                setTimeout(() => {
                    window.location.href = "MN Home Page.html"; 
                }, 1000);

            } catch (err) {
                    alert("Server On WORKING");
                    loginBtn.textContent = "Sign In";
                }
            });
            // --- 8. Accessibility ---
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && forgotModal.classList.contains('visible')) {
                    closeForgotModal();
                }
                if (e.key === 'Escape' && humanVerificationModal.classList.contains('visible')) {
                    closeHumanVerificationModal();
                }
            });
            
            
            // --- 9. "Living Codeverse" Canvas Background ---
            const canvas = document.getElementById('codeverse-bg');
            const ctx = canvas.getContext('2d');
            let width = canvas.width = window.innerWidth;
            let height = canvas.height = window.innerHeight;
            let particles = [];
            window.codeVerseParticles = particles; // Expose for login animation
            
            const mouse = { x: width / 2, y: height / 2 };

            const codeSnippets = [
                'public static void main', 'System.out.println()', 'def __init__(self):',
                'import React from "react"', 'const newArr = () =>', 'std::cout << "Hello"',
                '#include <iostream>', 'Console.WriteLine()', '<?php', '$user->save();',
                'func main()', 'fmt.Println()', 'SELECT * FROM users;', 'let mut count = 0;',
                'println!("Rust!")', 'def compute_score', 'end', '{...}', '=>', 'class',
                'return true;', '0101', '110', '001', 'async/await', 'Promise.all()',
                'useEffect()', 'useState()', 'Map<String, Int>', 'catch (e)', 'try'
            ];
            
            const codeColorsDark = ['#63b3ed', '#b794f4', '#f6ad55', '#48bb78'];
            const codeColorsLight = ['#2b6cb0', '#2f855a', '#c05621', '#6b46c1'];

            class Particle {
                constructor() {
                    this.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
                    this.x = Math.random() * width;
                    this.y = Math.random() * height;
                    this.z = Math.random() * 0.8 + 0.2; // Depth (0.2 to 1.0)
                    this.speed = (Math.random() * 0.5 + 0.1) * this.z; // Slower particles are further
                    this.fontSize = (Math.random() * 6 + 10) * this.z;
                    this.opacity = 0;
                    this.targetOpacity = Math.random() * 0.5 + 0.1;
                    this.pulseAmount = 0;
                }

                update() {
                    // Upward drift
                    this.y -= this.speed;
                    if (this.y < -this.fontSize) {
                        this.y = height + this.fontSize;
                        this.x = Math.random() * width;
                    }
                    
                    // Fade in/out
                    if (this.opacity < this.targetOpacity) {
                        this.opacity += 0.01;
                    }
                    
                    // Handle pulse
                    if (this.pulseAmount > 0) {
                        this.pulseAmount -= 0.04;
                    }
                }
                
                pulse() {
                    this.pulseAmount = 1;
                }

                draw() {
                    const colors = body.classList.contains('dark-mode') ? codeColorsDark : codeColorsLight;
                    if (!this.color) this.color = colors[Math.floor(Math.random() * colors.length)];
                    
                    // Parallax effect
                    const parallaxX = (mouse.x - width / 2) * (this.z * 0.05);
                    const parallaxY = (mouse.y - height / 2) * (this.z * 0.05);
                    
                    // Pulsing effect
                    const currentSize = this.fontSize + (this.fontSize * this.pulseAmount * 0.8);
                    const currentOpacity = this.opacity + (this.pulseAmount * 0.5);

                    ctx.font = `${currentSize}px "JetBrains Mono"`;
                    ctx.fillStyle = this.color;
                    ctx.globalAlpha = currentOpacity;
                    
                    // Blur for depth
                    ctx.filter = `blur(${(1 - this.z) * 1.5}px)`;
                    
                    ctx.fillText(this.text, this.x + parallaxX, this.y + parallaxY);
                    
                    // Reset filters
                    ctx.filter = 'none';
                    ctx.globalAlpha = 1.0;
                }
            }

            function initParticles() {
                const particleCount = window.innerWidth < 768 ? 75 : 150;
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
                initParticles(); // Re-init to adjust density
            }

            window.addEventListener('resize', onResize);
            window.addEventListener('mousemove', (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            });

            // Kick off the animation
            initParticles();
            animate();
            
        }); 

        // --- SignUp with Backend ---
    signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const fullName = document.getElementById("signup-name").value;
            const email = document.getElementById("signup-email").value;
            const password = document.getElementById("signup-password").value;
            const confirm = document.getElementById("signup-confirm-password").value;

            if (password !== confirm) {
                alert("Passwords do not match!");
                return;
             }

            if (!notRobotCheckbox.checked) {
                 alert("Please complete human verification!");
                 return;
            }

        try {
            const res = await fetch(`${BASE_URL}/api/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.message || "Signup failed!");
                 return;
            }

            alert("Account created! Please login.");

             // Switch back to login form automatically
            switchForm(signupForm, loginForm);

        } catch (err) {
            alert("Server error. Try again later.");
        }
    });
  //  *********************************************** //
                   $ Created By $ 
                 $ Manthan Vinzuda $
   // ***********************************************  //     

    
