// Sample JavaScript for Home Page Interactivity and Animations
        // Sample goal progress data
        const userGoals = [
            { id: "ds", name: "Data Structures", progress: 85, color: "#4caf50" }, // Green
            { id: "dp", name: "Dynamic Programming", progress: 42, color: "#ff9800" }, // Orange
            { id: "weekly", name: "Weekly Challenge Streak", progress: 90, color: "#436b95" }, // Blue
            { id: "algo", name: "Advanced Algorithms", progress: 15, color: "#f44336" } // Red
        ];

        /**
         * Renders the goal cards and their initial progress.
         */
        function renderGoalGrid() {
            const grid = document.getElementById('goalGrid');
            if (!grid) return;

            // Generate HTML for all goal cards
            grid.innerHTML = userGoals.map(goal => `
                <div class="goal-card" style="--progress-color: ${goal.color};">
                    <h4>${goal.name}</h4>
                    <div class="progress-bar-container">
                        <div id="progress-bar-${goal.id}" class="progress-bar" style="width: 0%;"></div>
                    </div>
                    <div class="progress-info">
                        <span>Current Progress</span>
                        <span id="progress-value-${goal.id}" class="progress-percentage">0%</span>
                    </div>
                </div>
            `).join('');

            // Animate progress bars and values after rendering
            setTimeout(() => {
                userGoals.forEach(goal => {
                    const bar = document.getElementById(`progress-bar-${goal.id}`);
                    const value = document.getElementById(`progress-value-${goal.id}`);
                    if (bar) {
                        // Triggers the CSS transition to fill the bar
                        bar.style.width = `${goal.progress}%`;
                    }
                    if (value) {
                        // Animates the text value from 0% to the goal progress
                        animateGoalValue(0, goal.progress, 800, value);
                    }
                });
            }, 100); // Small delay to ensure CSS transition is ready
        }
        
        /**
         * Helper function to animate the number display for each goal card.
         */
        function animateGoalValue(start, end, duration, element) {
            let startTime = null;

            function step(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);
                const currentValue = Math.floor(percentage * (end - start) + start);

                element.textContent = `${currentValue}%`;
                
                if (progress < duration) {
                    window.requestAnimationFrame(step);
                }
            }
            window.requestAnimationFrame(step);
        }

        document.addEventListener('DOMContentLoaded', () => {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observerCallback = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        
                        // Render and animate the goal grid when the progress section is visible
                        if (entry.target.closest('.progress-illustration')) {
                            renderGoalGrid(); 
                        }

                        observer.unobserve(entry.target);
                    }
                });
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            const elementsToAnimate = document.querySelectorAll('.fade-in-up');
            elementsToAnimate.forEach(el => {
                observer.observe(el);
            });
        });