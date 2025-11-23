            
        document.addEventListener('DOMContentLoaded', () => {

            // --- Get All Elements ---
            const body = document.body;
            const themeToggle = document.getElementById('theme-toggle');
            const profileAvatarBtn = document.getElementById('profile-avatar-btn');
            const profilePopup = document.getElementById('profile-popup');
            const modalOverlay = document.getElementById('modal-overlay');
            const modalCloseBtn = document.getElementById('modal-close-btn');
            const cardButtons = document.querySelectorAll('.card-btn');
            const filterTabs = document.querySelectorAll('.filter-tab');
            const exploreCards = document.querySelectorAll('.explore-card');
            
            // --- 1. Theme Toggling & Local Storage (Consistent with Practice Page) ---
            const currentTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            // Set initial theme
            if (currentTheme) {
                body.dataset.theme = currentTheme;
            } else if (prefersDark) {
                body.dataset.theme = 'dark';
                localStorage.setItem('theme', 'dark');
            } else {
                body.dataset.theme = 'light';
            }

            // Add click listener
            themeToggle.addEventListener('click', () => {
                const newTheme = body.dataset.theme === 'light' ? 'dark' : 'light';
                body.dataset.theme = newTheme;
                localStorage.setItem('theme', newTheme);
            });

            // --- 2. Profile Pop-up Functionality ---
            profileAvatarBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the body click listener from immediately closing it
                profilePopup.classList.toggle('active');
            });
            
            // Close profile pop-up when clicking anywhere else
            document.addEventListener('click', (e) => {
                if (profilePopup.classList.contains('active') && !profilePopup.contains(e.target) && e.target !== profileAvatarBtn) {
                    profilePopup.classList.remove('active');
                }
            });


            // --- 3. Modal Functionality ---

            function openModal() {
                modalOverlay.classList.add('active');
            }

            function closeModal() {
                modalOverlay.classList.remove('active');
            }

            // Open Modal via "Start Learning" button
            cardButtons.forEach(button => {
                button.addEventListener('click', openModal);
            });
            
            // Open Modal via clicking the card itself
            document.querySelectorAll('.explore-card').forEach(card => {
                // Prevent opening if click originated from the button inside the card
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('.card-btn')) {
                        openModal();
                    }
                });
            });

            // Close Modal listeners
            modalCloseBtn.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });
            
            // --- 4. Filtering Functionality ---
            
            function filterCards(filter) {
                exploreCards.forEach(card => {
                    const categories = card.getAttribute('data-category');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.classList.remove('hidden');
                        card.style.display = 'block'; // Make sure the layout updates
                    } else {
                        card.classList.add('hidden');
                        // Temporarily hide, CSS transition handles opacity/scale
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 500); 
                    }
                });
            }

            filterTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const filterValue = tab.getAttribute('data-filter');
                    
                    // Update active tab styling
                    filterTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    filterCards(filterValue);
                });
            });

            // Initial filter call (show all)
            filterCards('all');

        });
    