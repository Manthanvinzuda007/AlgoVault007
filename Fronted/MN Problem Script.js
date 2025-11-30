  //  *********************************************** //
                   $ Created By $ 
                 $ Manthan Vinzuda $
   // ***********************************************  //     
        document.addEventListener('DOMContentLoaded', () => {
            
            const mockProblems = [
                { id: 1, title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table', 'Custom6'], acceptance: 52.8, desc: "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution.", constraints: ["$2 \\le nums.length \\le 10^5$", "$10^9 \\le nums[i] \\le 10^9$"], example: "Input: nums = [2,7,11,15], target = 9\\nOutput: [0,1]" },
                { id: 2, title: 'Reverse Linked List', difficulty: 'Easy', tags: ['Linked List', 'Pointers', 'Custom6'], acceptance: 72.1, desc: "Reverse a singly linked list. This can be done iteratively or recursively.", constraints: ["The number of nodes is in the range $[0, 5000]$", "$-5000 \\le Node.val \\le 5000$"], example: "Input: head = [1,2,3,4,5]\\nOutput: [5,4,3,2,1]" },
                { id: 3, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', tags: ['String', 'Sliding Window', 'Hash Table', 'Custom7'], acceptance: 34.5, desc: "Find the length of the longest substring in a string that does not contain any repeating characters.", constraints: ["$0 \\le s.length \\le 5 \\cdot 10^4$"], example: "Input: s = \"abcabcbb\"\\nOutput: 3" },
                { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', tags: ['Array', 'Binary Search', 'Custom4'], acceptance: 28.1, desc: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays. The overall run time complexity should be $O(\\log(m+n))$", constraints: ["$0 \\le m, n \\le 1000$"], example: "Input: nums1 = [1,3], nums2 = [2]\\nOutput: 2.0" },
                { id: 5, title: 'Maximal Square', difficulty: 'Medium', tags: ['DP', 'Matrix', 'Custom10'], acceptance: 42.0, desc: "Given an $m \\times n$ binary matrix filled with $0$'s and $1$'s, find the largest square containing only $1$'s and return its area.", constraints: ["$1 \\le m, n \\le 300$"], example: "Input: [[1,0,1,0],[1,1,1,1],[1,1,1,1]]\\nOutput: 4" },
                { id: 6, title: 'Valid Parentheses', difficulty: 'Easy', tags: ['Stack', 'String', 'Custom6'], acceptance: 41.5, desc: "Determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.", constraints: ["$1 \\le s.length \\le 10^4$"], example: "Input: s = \"([]){}\"\\nOutput: true" },
                { id: 7, title: 'Clone Graph', difficulty: 'Medium', tags: ['Graph', 'BFS', 'DFS', 'Custom7'], acceptance: 45.9, desc: "Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph.", constraints: ["The number of nodes in the graph is in the range $[0, 100]$"], example: "Input: adjacencyList = [[2,4],[1,3],[2,4],[1,3]]\\nOutput: Cloned Graph" },
                { id: 8, title: 'N-Queens II', difficulty: 'Hard', tags: ['Backtracking', 'Custom10'], acceptance: 32.3, desc: "Return the number of distinct solutions to the N-Queens puzzle.", constraints: ["$1 \\le n \\le 9$"], example: "Input: n = 4\\nOutput: 2" },
                { id: 9, title: 'Merge Two Sorted Lists', difficulty: 'Easy', tags: ['Linked List', 'Sorting', 'Custom4'], acceptance: 65.5, desc: "Merge two sorted linked lists and return it as a new sorted list. The new list should be made by splicing together the nodes of the first two lists.", constraints: ["The number of nodes is in the range $[0, 50]$"], example: "Input: l1 = [1,2,4], l2 = [1,3,4]\\nOutput: [1,1,2,3,4,4]" },
                { id: 10, title: 'Path Sum III', difficulty: 'Medium', tags: ['Tree', 'DFS', 'Custom7'], acceptance: 58.7, desc: "Find the number of paths that sum to a given value. The path does not need to start or end at the root or a leaf, but must go downwards.", constraints: ["The number of nodes in the tree is in the range $[0, 1000]$"], example: "Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8\\nOutput: 3" },
                { id: 11, title: 'Minimum Window Substring', difficulty: 'Hard', tags: ['String', 'Sliding Window', 'Hash Table', 'Custom10'], acceptance: 36.9, desc: "Given two strings $s$ and $t$ of lengths $m$ and $n$, return the minimum window substring of $s$ such that every character in $t$ (including duplicates) is included in the window.", constraints: ["$1 \\le s.length, t.length \\le 10^5$"], example: "Input: s = \"ADOBECODEBANC\", t = \"ABC\"\\nOutput: \"BANC\"" },
                { id: 12, title: 'K Closest Points to Origin', difficulty: 'Medium', tags: ['Heap', 'Sorting', 'Custom4'], acceptance: 60.1, desc: "Given an array of points on the X-Y plane, return the $K$ closest points to the origin $(0, 0)$.", constraints: ["$1 \\le K \\le points.length \\le 10^4$"], example: "Input: points = [[1,3],[-2,2]], K = 1\\nOutput: [[-2,2]]" },
                { id: 13, title: 'Binary Tree Level Order Traversal', difficulty: 'Easy', tags: ['Tree', 'BFS', 'Custom6'], acceptance: 68.3, desc: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).", constraints: ["The number of nodes in the tree is in the range $[0, 2000]$"], example: "Input: root = [3,9,20,null,null,15,7]\\nOutput: [[3],[9,20],[15,7]]" },
                { id: 14, title: 'Coin Change', difficulty: 'Medium', tags: ['DP', 'BFS', 'Custom7'], acceptance: 39.0, desc: "You are given coins of different denominations and a total amount of money. Compute the fewest number of coins that you need to make up that amount.", constraints: ["$1 \\le coins.length \\le 12$"], example: "Input: coins = [1,2,5], amount = 11\\nOutput: 3" },
                { id: 15, title: 'Dijkstra’s Shortest Path', difficulty: 'Hard', tags: ['Graph', 'Heap', 'Custom4'], acceptance: 48.0, desc: "Find the shortest path from a starting node to all other nodes in a weighted graph with non-negative edge weights.", constraints: ["$1 \\le V \\le 1000$ vertices"], example: "Input: Graph with edges (A,B,1), (B,C,2), (A,C,4)\\nOutput: Shortest distance to C is 3" },
                { id: 16, title: 'Quick Sort Implementation', difficulty: 'Medium', tags: ['Sorting', 'Array', 'Backtracking'], acceptance: 55.5, desc: "Implement the Quick Sort algorithm in place. Choose a pivot element and partition the array around the pivot.", constraints: ["$1 \\le nums.length \\le 5 \\cdot 10^4$"], example: "Input: [5, 1, 4, 2, 8]\\nOutput: [1, 2, 4, 5, 8]" },
                { id: 17, title: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', tags: ['Trie', 'String', 'Custom7'], acceptance: 48.1, desc: "Implement the Trie data structure, including the insert, search, and startsWith methods.", constraints: ["$1 \\le word.length \\le 2000$"], example: "Commands: [\"Trie\", \"insert\", \"search\"]\\nOutput: [null, null, true]" },
                { id: 18, title: 'LFU Cache Design', difficulty: 'Hard', tags: ['Hash Table', 'Linked List', 'Custom10'], acceptance: 25.0, desc: "Design and implement the Least Frequently Used (LFU) cache mechanism.", constraints: ["$1 \\le capacity \\le 10^4$"], example: "Commands: [\"LFUCache\", \"put\", \"get\"]\\nOutput: [null, null, 1]" },
                { id: 19, title: 'Merge Intervals', difficulty: 'Medium', tags: ['Array', 'Sorting', 'Custom4'], acceptance: 40.0, desc: "Given an array of intervals, merge all overlapping intervals.", constraints: ["$1 \\le intervals.length \\le 10^4$"], example: "Input: intervals = [[1,3],[2,6],[8,10]]\\nOutput: [[1,6],[8,10]]" },
                { id: 20, title: 'Word Search', difficulty: 'Medium', tags: ['Backtracking', 'Matrix', 'Array', 'Custom7'], acceptance: 50.0, desc: "Given an $m \\times n$ grid of characters and a word, return true if the word exists in the grid. The word can be constructed from letters of sequentially adjacent cells.", constraints: ["$1 \\le m, n \\le 6$"], example: "Input: board = [['A','B'],['C','D']], word = \"ABCD\"\\nOutput: false" },
                { id: 21, title: 'Longest Palindromic Substring', difficulty: 'Medium', tags: ['String', 'DP', 'Custom7'], acceptance: 32.5, desc: "Given a string $s$, return the longest palindromic substring in $s$.", constraints: ["$1 \\le s.length \\le 1000$"], example: "Input: s = \"babad\"\\nOutput: \"bab\"" },
                { id: 22, title: 'Max Flow Min Cut Theorem', difficulty: 'Hard', tags: ['Graph', 'Advanced', 'Custom10'], acceptance: 18.0, desc: "Implement the Edmonds-Karp algorithm to find the maximum flow in a flow network.", constraints: ["The network graph has up to 50 vertices."], example: "Input: 4-node network with capacity (1,2,10), (1,3,10), (2,4,10), (3,4,10)\\nOutput: 20" },
                { id: 23, title: 'Two Pointers Technique', difficulty: 'Easy', tags: ['Array', 'Pointers', 'Custom6'], acceptance: 68.9, desc: "Use the two pointers technique to find a pair in a sorted array that sums to a specific target.", constraints: ["$1 \\le nums.length \\le 10^4$"], example: "Input: nums = [1,3,5,8], target = 11\\nOutput: [2, 3]" },
                { id: 24, title: 'A* Search Algorithm', difficulty: 'Hard', tags: ['Graph', 'Greedy', 'Custom4'], acceptance: 25.1, desc: "Implement the A* search algorithm for pathfinding on a weighted grid.", constraints: ["The grid size is up to $100 \\times 100$."], example: "Input: Start (0,0), End (4,4), blocked cells indicated.\\nOutput: Shortest path sequence" },
                { id: 25, title: 'Minimum Height Trees', difficulty: 'Medium', tags: ['Tree', 'Graph', 'BFS', 'Custom7'], acceptance: 38.8, desc: "A tree is a graph in which any two vertices are connected by exactly one path. Find all Minimum Height Trees (MHTs) and return a list of their root labels.", constraints: ["$1 \\le n \\le 20000$"], example: "Input: n = 4, edges = [[1,0],[1,2],[1,3]]\\nOutput: [1]" }
            ];

            const body = document.body;
            const themeToggle = document.getElementById('theme-toggle');
            const problemGrid = document.getElementById('problem-grid');
            const searchInput = document.getElementById('search-input');
            const filterCheckboxes = document.querySelectorAll('.filter-panel input[type="checkbox"]');
            
            const modalOverlay = document.getElementById('detail-modal-overlay');
            const modalCloseBtn = document.getElementById('modal-close-btn');
            const startPracticeBtn = document.getElementById('start-practice-btn');

            let filteredProblems = mockProblems;
            let currentSort = { key: 'id', direction: 'asc' };
            let currentPage = 1;
            const problemsPerPage = 9;
            let selectedProblemId = null;

            const initTheme = () => {
                const savedTheme = localStorage.getItem('exploreProblemsTheme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                
                if (savedTheme) {
                    body.dataset.theme = savedTheme;
                } else if (prefersDark) {
                    body.dataset.theme = 'dark';
                } else {
                    body.dataset.theme = 'light';
                }
            };

            themeToggle.addEventListener('click', () => {
                const newTheme = body.dataset.theme === 'light' ? 'dark' : 'light';
                body.dataset.theme = newTheme;
                localStorage.setItem('exploreProblemsTheme', newTheme);
            });

            
            function renderCards() {
                const start = (currentPage - 1) * problemsPerPage;
                const end = start + problemsPerPage;
                const pageData = filteredProblems.slice(start, end);

                problemGrid.innerHTML = ''; 

                if (pageData.length === 0) {
                     problemGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">No problems match your current filters.</p>`;
                     renderPagination(0, 0);
                     return;
                }

                pageData.forEach(p => {
                    const diffClass = `tag-${p.difficulty.toLowerCase()}`;
                    const acceptanceClass = p.acceptance < 35 ? 'acceptance-rate low' : 'acceptance-rate';
                    const tagHtml = p.tags.map(tag => `<span>${tag}</span>`).join('');

                    const card = document.createElement('div');
                    card.className = 'problem-card';
                    card.setAttribute('data-id', p.id);
                    
                    card.innerHTML = `
                        <div class="card-content">
                            <div class="card-header">
                                <h3>${p.title}</h3>
                            </div>
                            
                            <span class="difficulty-tag ${diffClass}">${p.difficulty}</span>
                            
                            <p class="card-description">${p.desc.substring(0, 80)}...</p>
                            
                            <div class="card-footer">
                                <div class="topic-info">
                                    <span class="${acceptanceClass}" style="font-size:0.9rem;">${p.acceptance.toFixed(1)}% Acc.</span>
                                </div>
                                <button class="btn-view-details" data-id="${p.id}">
                                    Details <i class="ph ph-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    `;
                    
                    const detailsBtn = card.querySelector('.btn-view-details');
                    detailsBtn.addEventListener('click', (e) => {
                        e.stopPropagation(); 
                        openDetailModal(p.id); 
                    });
                    
                    card.addEventListener('click', () => {
                         openDetailModal(p.id); 
                    });
                    
                    problemGrid.appendChild(card);
                });
                
                renderPagination(filteredProblems.length, problemsPerPage);
            }
            
            function renderPagination(totalItems, itemsPerPage) {
                const pageCount = Math.ceil(totalItems / itemsPerPage);
                const container = document.getElementById('pagination-container');
                container.innerHTML = '';
                
                if (pageCount <= 1) return;

                const maxButtons = 5;
                let startPage, endPage;

                if (pageCount <= maxButtons) {
                    startPage = 1;
                    endPage = pageCount;
                } else if (currentPage <= 3) {
                    startPage = 1;
                    endPage = maxButtons;
                } else if (currentPage + 1 >= pageCount) {
                    startPage = pageCount - maxButtons + 1;
                    endPage = pageCount;
                } else {
                    startPage = currentPage - 2;
                    endPage = currentPage + 2;
                }
                
                const prevBtn = document.createElement('button');
                prevBtn.textContent = '« Prev';
                prevBtn.disabled = currentPage === 1;
                prevBtn.addEventListener('click', () => { currentPage--; renderCards(); });
                container.appendChild(prevBtn);

                for (let i = startPage; i <= endPage; i++) {
                    const pageBtn = document.createElement('button');
                    pageBtn.textContent = i;
                    if (i === currentPage) pageBtn.classList.add('active');
                    pageBtn.addEventListener('click', () => { 
                        currentPage = i; 
                        renderCards();
                        window.scrollTo({ top: 0, behavior: 'smooth' }); 
                    });
                    container.appendChild(pageBtn);
                }

                const nextBtn = document.createElement('button');
                nextBtn.textContent = 'Next »';
                nextBtn.disabled = currentPage === pageCount;
                nextBtn.addEventListener('click', () => { currentPage++; renderCards(); });
                container.appendChild(nextBtn);
            }

            function openDetailModal(id) {
                const problem = mockProblems.find(p => p.id === id);
                if (!problem) return;
                
                selectedProblemId = id; 
                
                document.getElementById('modal-title').textContent = problem.title;

                const diffEl = document.getElementById('modal-difficulty');
                diffEl.textContent = problem.difficulty;
                diffEl.className = `difficulty-tag tag-${problem.difficulty.toLowerCase()}`;

                const accEl = document.getElementById('modal-acceptance');
                accEl.textContent = `${problem.acceptance.toFixed(1)}% Acceptance`;
                accEl.className = `acceptance-rate ${problem.acceptance < 35 ? 'low' : ''}`;

                const tagsContainer = document.getElementById('modal-tags');
                tagsContainer.innerHTML = problem.tags.map(tag => `<span>${tag}</span>`).join('');

                document.getElementById('modal-description').textContent = problem.desc;
                
                const constraintsList = document.getElementById('modal-constraints');
                constraintsList.innerHTML = problem.constraints.map(c => `<li>${c}</li>`).join('');

                document.getElementById('modal-example').textContent = problem.example;

                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            }

            function closeModal() {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
                selectedProblemId = null;
            }

            function applyFilters() {
                const search = searchInput.value.toLowerCase();
                const activeDifficulties = Array.from(document.querySelectorAll('input[name="difficulty"]:checked')).map(cb => cb.value);
                const activeTopics = Array.from(document.querySelectorAll('input[name="topic"]:checked')).map(cb => cb.value.toLowerCase());
                
                let tempFilteredProblems = mockProblems.filter(p => {
                    const matchesSearch = p.title.toLowerCase().includes(search) || 
                                          p.tags.some(tag => tag.toLowerCase().includes(search));

                    const matchesDifficulty = activeDifficulties.includes(p.difficulty);

                    let matchesTopic = true;
                    if (activeTopics.length > 0) {
                        matchesTopic = p.tags.some(tag => activeTopics.includes(tag.toLowerCase()));
                    }

                    return matchesSearch && matchesDifficulty && matchesTopic;
                });
                
                filteredProblems = sortProblems(tempFilteredProblems, currentSort.key, currentSort.direction);

                currentPage = 1;
                renderCards();
            }

            function sortProblems(list, key, direction) {
                const newList = [...list]; 
                
                if (key === 'difficulty') {
                    const order = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
                    newList.sort((a, b) => direction === 'asc' ? order[a.difficulty] - order[b.difficulty] : order[b.difficulty] - order[a.difficulty]);
                } else if (key === 'acceptance') {
                    newList.sort((a, b) => direction === 'asc' ? a.acceptance - b.acceptance : b.acceptance - a.acceptance);
                } else {
                     newList.sort((a, b) => direction === 'asc' ? a.id - b.id : b.id - a.id);
                }
                return newList;
            }
            
            modalCloseBtn.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });

            startPracticeBtn.addEventListener('click', () => {
                if (selectedProblemId) {
                    window.location.href = `MN Practice.html?problemId=${selectedProblemId}`;
                }
            });

            searchInput.addEventListener('input', applyFilters);
            filterCheckboxes.forEach(cb => cb.addEventListener('change', applyFilters));

            currentSort.key = 'id';
            currentSort.direction = 'desc'; 
            filteredProblems = sortProblems(mockProblems, currentSort.key, currentSort.direction);
            initTheme();
            renderCards(); 

        });
  //  *********************************************** //
                   $ Created By $ 
                 $ Manthan Vinzuda $
   // ***********************************************  //     
