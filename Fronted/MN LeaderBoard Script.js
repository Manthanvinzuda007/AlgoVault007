   //  *********************************************** //
                   $ Created By $ 
                 $ Manthan Vinzuda $
   // ***********************************************  //     
        document.addEventListener('DOMContentLoaded', () => {

            // --- MOCK DATA ---
            const allUserData = [
                { rank: 1, username: 'Manthan', country: 'IN', solved: 1250, accuracy: 98.5, streak: 365, points: 154200 },
                { rank: 2, username: 'Krishna', country: 'IN', solved: 1210, accuracy: 97.2, streak: 210, points: 149800 },
                { rank: 3, username: 'Vinzuda', country: 'IN', solved: 1180, accuracy: 99.1, streak: 150, points: 145000 },
                { rank: 4, username: 'DataClarity', country: '🇮🇳', solved: 1150, accuracy: 96.5, streak: 120, points: 142100 },
                { rank: 5, username: 'SilentSolve', country: '🇨🇳', solved: 1120, accuracy: 95.0, streak: 90, points: 139500 },
                { rank: 6, username: 'SyntaxPeace', country: '🇧🇷', solved: 1090, accuracy: 94.2, streak: 85, points: 135000 },
                { rank: 7, username: 'KernelCalm', country: '🇷🇺', solved: 1050, accuracy: 93.1, streak: 70, points: 131200 },
                { rank: 8, username: 'PythonPath', country: '🇬🇧', solved: 1020, accuracy: 92.5, streak: 65, points: 128900 },
                { rank: 9, username: 'JavaJourney', country: '🇫🇷', solved: 990, accuracy: 91.0, streak: 50, points: 125000 },
                // Logged-in user's data (added full name and email for modal)
                { 
                    rank: 10, 
                    username: 'You', 
                    fullName: 'Manthan Vinzuda',
                    email: 'manthan.vinzuda@algovault.dev',
                    country: '🇨🇦', 
                    solved: 850, 
                    accuracy: 88.5, 
                    streak: 45, 
                    points: 121300, 
                    bio: "Focused on clean code and algorithmic mastery. Currently exploring Graph Theory." 
                }, 
                { rank: 11, username: 'ScriptSerenity', country: '🇦🇺', solved: 920, accuracy: 89.0, streak: 40, points: 118000 },
                { rank: 12, username: 'MatrixMellow', country: '🇰🇷', solved: 890, accuracy: 88.2, streak: 35, points: 115200 },
                { rank: 13, username: 'DebugDreamer', country: '🇪🇸', solved: 860, accuracy: 87.1, streak: 30, points: 112000 },
                { rank: 14, username: 'CacheCool', country: '🇮🇹', solved: 830, accuracy: 86.5, streak: 25, points: 109500 },
                { rank: 15, username: 'BinaryBreeze', country: '🇲🇽', solved: 800, accuracy: 85.0, streak: 20, points: 106000 },
                { rank: 16, username: 'LoopLullaby', country: '🇳🇱', solved: 770, accuracy: 84.2, streak: 18, points: 103200 },
                { rank: 17, username: 'GitGentle', country: '🇸🇪', solved: 740, accuracy: 83.1, streak: 15, points: 100000 },
                { rank: 18, username: 'PointerPeace', country: '🇨🇭', solved: 710, accuracy: 82.5, streak: 12, points: 97800 },
                { rank: 19, username: 'NodeNirvana', country: '🇵🇱', solved: 680, accuracy: 81.0, streak: 10, points: 95000 },
                { rank: 20, username: 'CloudChill', country: '🇦🇷', solved: 650, accuracy: 80.5, streak: 8, points: 92300 },
                { rank: 21, username: 'ArrayAura', country: '🇿🇦', solved: 620, accuracy: 79.0, streak: 7, points: 89000 },
                { rank: 22, username: 'HashHarmony', country: '🇹🇷', solved: 590, accuracy: 78.2, streak: 6, points: 86200 },
                { rank: 23, username: 'StreamStill', country: '🇳🇿', solved: 560, accuracy: 77.1, streak: 5, points: 83000 },
                { rank: 24, username: 'VectorVibes', country: '🇮🇪', solved: 530, accuracy: 76.5, streak: 4, points: 80500 },
                { rank: 25, username: 'QueryQuiet', country: '🇧🇪', solved: 500, accuracy: 75.0, streak: 3, points: 77000 },
                { rank: 26, username: 'RecursiveRest', country: '🇦🇹', solved: 470, accuracy: 74.2, streak: 2, points: 74200 },
                { rank: 27, username: 'MLMantra', country: '🇳🇴', solved: 440, accuracy: 73.1, streak: 1, points: 71000 },
                { rank: 28, username: 'DevOpsDoze', country: '🇩🇰', solved: 410, accuracy: 72.5, streak: 1, points: 68800 },
                { rank: 29, username: 'StateSilence', country: '🇫🇮', solved: 380, accuracy: 71.0, streak: 1, points: 65000 },
                { rank: 30, username: 'WebWhisper', country: '🇵🇹', solved: 350, accuracy: 70.5, streak: 1, points: 62300 }
            ];
            
            // Logged-in user's data 
            const myUserStats = allUserData.find(u => u.username === 'You') || { 
                rank: 99, solved: 0, streak: 0, points: 0, accuracy: 0, 
                fullName: 'Guest User', email: 'guest@algovault.dev', bio: "Profile not set up." 
            };
            const myWeeklyProgress = [4, 7, 5, 9, 6, 8, 10]; // Solved per day
            const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

            // --- STATE ---
            let currentData = [...allUserData.filter(u => u.username !== 'You')]; // Don't show "You" in main list
            let currentPage = 1;
            const rowsPerPage = 15;
            let currentFilter = 'all';

            // --- SELECTORS ---
            const body = document.body;
            const themeToggle = document.getElementById('theme-toggle');
            const tableBody = document.getElementById('table-body');
            const paginationContainer = document.getElementById('pagination');
            const searchInput = document.getElementById('search-input');
            const filterTabs = document.getElementById('filter-tabs');
            const loadingSkeleton = document.getElementById('loading-skeleton');
            const topThreeContainer = document.getElementById('top-three-cards');
            const confettiCanvas = document.getElementById('confetti-canvas');
            const toastEl = document.getElementById('toast-notification');
            const profileModal = document.getElementById('profile-modal');
            const openModalFromNavBtn = document.getElementById('open-profile-from-nav'); // New Nav Button
            const openModalFromSidebarBtn = document.getElementById('open-profile-modal-btn'); // Existing Sidebar Button
            const closeModalBtn = document.getElementById('close-profile-modal-btn');
            
            // Sidebar selectors
            const userRankEl = document.getElementById('user-rank');
            const userSolvedEl = document.getElementById('user-solved');
            const userStreakEl = document.getElementById('user-streak');
            const progressGraphEl = document.getElementById('progress-graph');

            // --- MODAL FUNCTIONS ---
            const openModal = () => {
                // Populate modal with mock user data
                document.getElementById('modal-user-initial').innerText = myUserStats.username.charAt(0);
                document.getElementById('modal-username').innerText = `${myUserStats.username} (Rank #${myUserStats.rank})`;
                
                // NEW fields
                document.getElementById('modal-full-name').innerText = myUserStats.fullName;
                document.getElementById('modal-email').innerText = myUserStats.email;

                document.getElementById('modal-user-bio').innerText = myUserStats.bio;
                document.getElementById('modal-total-solved').innerText = myUserStats.solved.toLocaleString();
                document.getElementById('modal-total-points').innerText = myUserStats.points.toLocaleString();
                document.getElementById('modal-current-streak').innerText = myUserStats.streak;
                document.getElementById('modal-accuracy').innerText = `${myUserStats.accuracy}%`;

                profileModal.classList.add('open');
                body.style.overflow = 'hidden'; // Prevent background scrolling
            };

            const closeModal = () => {
                profileModal.classList.remove('open');
                body.style.overflow = '';
            };

            // --- MODAL EVENT LISTENERS ---
            openModalFromNavBtn.addEventListener('click', openModal); // New listener for Nav button
            openModalFromSidebarBtn.addEventListener('click', openModal); // Existing listener for Sidebar button
            closeModalBtn.addEventListener('click', closeModal);
            
            // Close modal when clicking outside of it
            profileModal.addEventListener('click', (e) => {
                if (e.target.id === 'profile-modal') {
                    closeModal();
                }
            });
            // Close modal with Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && profileModal.classList.contains('open')) {
                    closeModal();
                }
            });


            // --- TOAST NOTIFICATION ---
            let toastTimer;
            function showToast(message, type = 'info', duration = 3000) {
                clearTimeout(toastTimer);
                toastEl.textContent = message;
                toastEl.className = 'toast show'; // Reset classes
                
                toastEl.style.backgroundColor = type === 'success' ? '#4caf50' : 
                                               (type === 'error' ? '#f44336' : 'var(--accent-primary)');

                toastTimer = setTimeout(() => {
                    toastEl.classList.remove('show');
                }, duration);
            }

            // --- THEME ---
            const initTheme = () => {
                const savedTheme = localStorage.getItem('leaderboardTheme');
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                if (savedTheme) {
                    body.dataset.theme = savedTheme;
                } else if (systemPrefersDark) {
                    body.dataset.theme = 'dark';
                } else {
                    body.dataset.theme = 'light';
                }
            };

            const toggleTheme = () => {
                const newTheme = body.dataset.theme === 'light' ? 'dark' : 'light';
                body.dataset.theme = newTheme;
                localStorage.setItem('leaderboardTheme', newTheme);
            };

            themeToggle.addEventListener('click', toggleTheme);

            // --- LOADING SKELETON ---
            const showSkeleton = () => {
                tableBody.innerHTML = '';
                loadingSkeleton.innerHTML = '';
                // Generate header row for spacing consistency
                loadingSkeleton.innerHTML += `
                    <div class="skeleton-row" style="opacity:0;">
                        <div class="skeleton-item skel-rank"></div>
                        <div class="skeleton-item skel-avatar"></div>
                        <div class="skeleton-item skel-text-long"></div>
                        <div class="skeleton-item skel-text-short"></div>
                        <div class="skeleton-item skel-text-short"></div>
                        <div class="skeleton-item skel-text-short"></div>
                        <div class="skeleton-item skel-text"></div>
                    </div>
                `;
                for (let i = 0; i < rowsPerPage; i++) {
                    loadingSkeleton.innerHTML += `
                        <div class="skeleton-row">
                            <div class="skeleton-item skel-rank"></div>
                            <div class="skeleton-item skel-avatar"></div>
                            <div class="skeleton-item skel-text-long"></div>
                            <div class="skeleton-item skel-text-short"></div>
                            <div class="skeleton-item skel-text-short"></div>
                            <div class="skeleton-item skel-text-short"></div>
                            <div class="skeleton-item skel-text"></div>
                        </div>
                    `;
                }
                loadingSkeleton.classList.add('visible');
            };

            const hideSkeleton = () => {
                loadingSkeleton.classList.remove('visible');
            };
            
            // --- DEBOUNCE ---
            const debounce = (func, delay) => {
                let timeout;
                return (...args) => {
                    clearTimeout(timeout);
                    timeout = setTimeout(() => {
                        func.apply(this, args);
                    }, delay);
                };
            };

            // --- RENDER FUNCTIONS ---
            
            // Render Table
            const displayData = () => {
                showSkeleton();

                // Simulate fetch delay
                setTimeout(() => {
                    tableBody.innerHTML = '';
                    const start = (currentPage - 1) * rowsPerPage;
                    const end = start + rowsPerPage;
                    const paginatedData = currentData.slice(start, end);
                    
                    // Create a composite list including the user, if they are not in the current pagination range
                    let finalData = [...paginatedData];
                    
                    // Check if the current user is ranked below the last displayed rank
                    // And check if the user is not already in the main data array (which we filtered earlier, but just to be safe)
                    const userRankIndex = allUserData.findIndex(u => u.username === 'You');

                    // If user is not in the visible list AND their rank is within the table's total rank range
                    if (!paginatedData.some(u => u.username === 'You') && (userRankIndex + 1) > rowsPerPage) {
                        // Insert a placeholder row before adding the user's specific row if needed
                        if (start + rowsPerPage < userRankIndex) {
                            // Add a separator/placeholder if the user is far down the list
                            // We choose not to add ellipsis rows for simplicity in this themed layout.
                        }
                        
                        // Add the user's row if they are not visible in the current page
                        if (userRankIndex >= end || userRankIndex < start) {
                            const userRow = {...myUserStats, rank: userRankIndex + 1}; // Get actual rank from allUserData
                            finalData.push(userRow);
                        }
                    }

                    if (finalData.length === 0) {
                        tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 2rem; color: var(--text-secondary);">No users found for this filter.</td></tr>`;
                    } else {
                        // Sort the data to ensure correct display order, especially if 'You' was appended
                        finalData.sort((a, b) => a.rank - b.rank);
                        
                        finalData.forEach(user => {
                            const isCurrentUser = user.username === 'You';
                            const tr = document.createElement('tr');
                            tr.classList.add(`rank-${user.rank}`);
                            if (isCurrentUser) tr.classList.add('current-user');

                            const crownIcon = user.rank === 1 ? `<i class="ph-fill ph-crown"></i>` : '';
                            const rankDisplay = isCurrentUser && user.rank > rowsPerPage && finalData.length > rowsPerPage ? 'You' : user.rank;
                            
                            // Simple avatar logic: first letter of username
                            const userInitial = user.username.charAt(0);

                            tr.innerHTML = `
                                <td class="rank">
                                    ${crownIcon}${rankDisplay}
                                </td>
                                <td>
                                    <div class="user-cell">
                                        <div class="avatar">${userInitial}</div>
                                        <div>
                                            <div class="username">${user.username}</div>
                                        </div>
                                        <span class="flag">${user.country}</span>
                                    </div>
                                </td>
                                <td>${user.solved.toLocaleString()}</td>
                                <td>${user.accuracy}%</td>
                                <td>${user.streak} days</td>
                                <td class="points">${user.points.toLocaleString()}</td>
                            `;
                            tableBody.appendChild(tr);
                        });
                    }
                    
                    hideSkeleton();
                    setupPagination();
                }, 500); // 500ms delay for visual feedback
            };

            // Render Pagination
            const setupPagination = () => {
                paginationContainer.innerHTML = '';
                const totalItems = currentData.length;
                const pageCount = Math.ceil(totalItems / rowsPerPage);
                if (pageCount <= 1) return;

                // Prev Button
                const prevButton = document.createElement('button');
                prevButton.innerHTML = `<i class="ph ph-caret-left"></i>`;
                prevButton.disabled = currentPage === 1;
                prevButton.addEventListener('click', () => {
                    if (currentPage > 1) {
                        currentPage--;
                        displayData();
                    }
                });
                paginationContainer.appendChild(prevButton);

                // Page Number Buttons (simple visibility logic for mobile)
                for (let i = 1; i <= pageCount; i++) {
                    const pageButton = document.createElement('button');
                    pageButton.innerText = i;
                    pageButton.classList.add('page-number');
                    if (i === currentPage) {
                        pageButton.classList.add('active');
                    }
                    pageButton.addEventListener('click', () => {
                        currentPage = i;
                        displayData();
                    }); 
                    // Show dots or numbers smartly
                    if (window.innerWidth > 767) {
                        // Desktop: Show first, last, current, and neighbors
                         if (i === 1 || i === pageCount || (i >= currentPage - 1 && i <= currentPage + 1)) {
                             paginationContainer.appendChild(pageButton);
                         } else if (i === currentPage - 2 || i === currentPage + 2) {
                             const ellipsis = document.createElement('button');
                             ellipsis.innerText = '...';
                             ellipsis.disabled = true;
                             ellipsis.classList.add('ellipsis');
                             paginationContainer.appendChild(ellipsis);
                         }
                    } else {
                        // Mobile: Only show active page number
                        if (i === currentPage) {
                            paginationContainer.appendChild(pageButton);
                        }
                    }
                }

                // Next Button
                const nextButton = document.createElement('button');
                nextButton.innerHTML = `<i class="ph ph-caret-right"></i>`;
                nextButton.disabled = currentPage === pageCount;
                nextButton.addEventListener('click', () => {
                    if (currentPage < pageCount) {
                        currentPage++;
                        displayData();
                    }
                });
                paginationContainer.appendChild(nextButton);
            };

            // Render Top 3
            const displayTopThree = () => {
                const top3 = allUserData.slice(0, 3);
                topThreeContainer.innerHTML = '';
                
                top3.forEach(user => {
                    let iconHTML = '';
                    let rankText = '';

                    // Phosphor Icons for the ranks
                    if (user.rank === 1) {
                        iconHTML = `<i class="ph-fill ph-crown-simple"></i>`;
                        rankText = 'Gold';
                    } else if (user.rank === 2) {
                        iconHTML = `<i class="ph-fill ph-medal"></i>`;
                        rankText = 'Silver';
                    } else if (user.rank === 3) {
                        iconHTML = `<i class="ph-fill ph-trophy"></i>`;
                        rankText = 'Bronze';
                    }
                    
                    const card = document.createElement('div');
                    card.className = `top-card rank-${user.rank}`;
                    card.innerHTML = `
                        <div class="rank-icon" title="${rankText} Rank">${iconHTML}</div>
                        <div class="avatar">${user.username.charAt(0)}</div>
                        <h3>${user.username} <span class="flag">${user.country}</span></h3>
                        <p class="points">${user.points.toLocaleString()} Points</p>
                    `;
                    topThreeContainer.appendChild(card);
                });
            };

            // Render Sidebar
            const displaySidebarStats = () => {
                const totalUsers = allUserData.length;
                const userRankIndex = allUserData.findIndex(u => u.username === 'You');

                userRankEl.innerHTML = `${userRankIndex !== -1 ? userRankIndex + 1 : '-'} <span class="rank-suffix">/ ${totalUsers}</span>`;
                userSolvedEl.innerText = myUserStats.solved.toLocaleString();
                userStreakEl.innerHTML = `${myUserStats.streak} <span class="rank-suffix">days</span>`;

                // Render graph
                progressGraphEl.innerHTML = '';
                const maxSolved = Math.max(...myWeeklyProgress);
                myWeeklyProgress.forEach((val, i) => {
                    const heightPercent = maxSolved > 0 ? (val / maxSolved) * 90 + 10 : 10; // Ensure min height of 10%
                    progressGraphEl.innerHTML += `
                        <div class="bar-container" title="${weekDays[i]}: ${val} solved">
                            <div class="bar" style="height: ${heightPercent}%; animation-delay: ${i * 0.05}s"></div>
                            <span class="bar-label">${weekDays[i].charAt(0)}</span>
                        </div>
                    `;
                });
            };

            // --- EVENT HANDLERS ---
            
            // Search
            const handleSearch = (e) => {
                const searchTerm = e.target.value.toLowerCase();
                const baseData = allUserData.filter(u => u.username !== 'You');

                currentData = baseData
                    .filter(user => user.username.toLowerCase().includes(searchTerm));
                
                // Re-rank the filtered data
                currentData.forEach((user, index) => {
                    user.rank = index + 1;
                });
                    
                currentPage = 1;
                displayData();
            };

            // Filters
            const handleFilter = (e) => {
                if (!e.target.matches('button')) return;
                
                // Update active button
                filterTabs.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                currentFilter = e.target.dataset.filter;
                
                // Simulate filtering
                const baseData = allUserData.filter(u => u.username !== 'You');
                let filteredList = baseData;
                
                switch (currentFilter) {
                    case 'week':
                        filteredList = [...baseData].sort(() => 0.5 - Math.random()).slice(0, 20);
                        break;
                    case 'today':
                        filteredList = [...baseData].sort(() => 0.5 - Math.random()).slice(0, 10);
                        break;
                    case 'friends':
                        // Just show a few users for "Friends"
                        filteredList = baseData.filter(u => ['DataClarity', 'SyntaxPeace', 'PythonPath', 'JavaJourney'].includes(u.username));
                        break;
                    case 'all':
                    default:
                        filteredList = baseData;
                }
                
                // Re-rank the filtered data
                filteredList.forEach((user, index) => {
                    user.rank = index + 1;
                });
                
                currentData = filteredList;
                currentPage = 1;
                displayData();
            };

            // --- CONFETTI (BONUS) ---
            const triggerConfetti = () => {
                confettiCanvas.style.display = 'block';
                const colorMap = [
                    'var(--accent-highlight)', // Gold
                    'var(--accent-silver)',   // Silver
                    'var(--accent-bronze)',   // Bronze
                    'var(--accent-primary)',  // Blue (general top rank)
                    '#4caf50'                 // Green (success)
                ];
                
                for (let i = 0; i < 120; i++) {
                    const confetti = document.createElement('div');
                    confetti.classList.add('confetti');
                    
                    const rank = myUserStats.rank;
                    let colorIndex = rank <= 3 ? rank - 1 : (rank <= 10 ? 3 : 4);
                    confetti.style.backgroundColor = colorMap[colorIndex];
                    
                    confetti.style.left = `${Math.random() * 100}vw`;
                    confetti.style.animationDelay = `${Math.random() * 2}s`;
                    confetti.style.animationDuration = `${3 + Math.random() * 2}s`;
                    confetti.style.setProperty('--random-x', Math.random() * 300 - 150);
                    confettiCanvas.appendChild(confetti);
                    
                    setTimeout(() => confetti.remove(), 5000);
                }
                setTimeout(() => confettiCanvas.style.display = 'none', 5000);
            };

            // --- INITIALIZATION ---
            initTheme();
            displayTopThree();
            displaySidebarStats();
            displayData(); // Initial data load
            
            // Check for confetti on top 10 rank
            if (myUserStats.rank <= 10) {
                setTimeout(triggerConfetti, 1000);
            }

            // Attach listeners
            searchInput.addEventListener('input', debounce(handleSearch, 300));
            filterTabs.addEventListener('click', handleFilter);

        });
    //  *********************************************** //
                   $ Created By $ 
                 $ Manthan Vinzuda $
   // ***********************************************  //     
