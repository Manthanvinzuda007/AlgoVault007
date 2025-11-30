  //  *********************************************** //
                   $ Created By $ 
                 $ Manthan Vinzuda $
   // ***********************************************  //     
      document.addEventListener('DOMContentLoaded', () => {

            // --- Get All Elements ---
            const body = document.body;
            const themeToggle = document.getElementById('theme-toggle');
            const navUserAvatarEl = document.getElementById('nav-user-avatar');
            const problemList = document.getElementById('problem-list');
            const consoleHeader = document.getElementById('console-header');
            const consoleContent = document.getElementById('console-content');
            const runBtn = document.getElementById('run-btn');
            const submitBtn = document.getElementById('submit-btn');
            const toastEl = document.getElementById('toast-notification');
            const codeEditor = document.getElementById('code-editor');
            const lineNumbersEl = document.getElementById('line-numbers');
            const chartContainer = document.getElementById('chart-container');
            const filterButtonsContainer = document.querySelector('.filter-buttons');
            const viewProfileBtn = document.getElementById('view-profile-btn');
            const languageSelectEl = document.getElementById('language-select');
            
            // --- Profile Elements (Sidebar) ---
            const profileNameEl = document.getElementById('profile-name');
            const profileEmailEl = document.getElementById('profile-email');
            const totalSolvedEl = document.getElementById('total-solved');
            const totalProblemsEl = document.getElementById('total-problems');
            const profileImgEl = document.getElementById('profile-img');

            // --- Modal Elements ---
            const profileModalEl = document.getElementById('profile-modal');
            const modalOverlay = document.getElementById('profile-modal-overlay');
            const modalCloseBtn = document.getElementById('modal-close-btn');
            const modalProfileName = document.getElementById('modal-profile-name');
            const modalEmailDisplay = document.getElementById('modal-email-display'); // Email in header
            const modalEmail = document.getElementById('modal-email');
            const modalTotalSolved = document.getElementById('modal-total-solved');
            const modalTotalProblems = document.getElementById('modal-total-problems');
            const modalProfileImg = document.getElementById('modal-profile-img');

            // --- NEW: Edit Mode Elements ---
            const editProfileBtn = document.getElementById('edit-profile-btn');
            const saveProfileBtn = document.getElementById('save-profile-btn');
            const cancelEditBtn = document.getElementById('cancel-edit-btn');
            const editNameInput = document.getElementById('edit-name');
            const editEmailInput = document.getElementById('edit-email');
            const editInitialsInput = document.getElementById('edit-initials');

            // --- User and Problem Data ---
            let userData = { // Changed to 'let' to allow updates
                name: 'Manthan Vinzuda', 
                email: 'm.vinzuda@gmail.com', // ** Email Updated **
                solved: 42,
                total: 150,
                initials: 'MV', 
                imageUrl: 'https://placehold.co/80x80/436b95/ffffff?text=MV', 
            };
            
            const problems = [
                { id: 1, title: 'Two Sum (The Classic)', difficulty: 'Easy', solved: true, tags: ['Array', 'Hash Table'] },
                { id: 2, title: 'Add Two Numbers', difficulty: 'Medium', solved: true, tags: ['Linked List', 'Math'] },
                { id: 3, title: 'Longest Substring Without Repeating...', difficulty: 'Medium', solved: false, tags: ['String', 'Sliding Window'] },
                { id: 4, title: 'Median of Two Sorted Arrays', difficulty: 'Hard', solved: false, tags: ['Array', 'Binary Search'] },
                { id: 5, title: 'Valid Parentheses', difficulty: 'Easy', solved: true, tags: ['Stack', 'String'] },
                { id: 6, title: 'Merge k Sorted Lists', difficulty: 'Hard', solved: false, tags: ['Heap', 'Linked List'] },
                { id: 7, title: 'Reverse Linked List', difficulty: 'Easy', solved: false, tags: ['Linked List'] },
                { id: 8, title: 'Maximum Subarray', difficulty: 'Medium', solved: true, tags: ['Array', 'DP'] },
            ];

            // --- Code Templates for Two Sum ---
            const codeTemplates = {
                python: 
`# Two Sum Solution Template (Python)
def twoSum(nums, target):
    """
    Given an array of integers nums and an integer target,
    return indices of the two numbers such that they add up to target.
    """
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
                javascript: 
`// Two Sum Solution Template (JavaScript)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const complement = target - num;
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(num, i);
    }
    return [];
};`,
                cpp: 
`// Two Sum Solution Template (C++)
#include <vector>
#include <unordered_map>
#include <iostream>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        // No solution found
        return {}; 
    }
};`,
                java: 
`// Two Sum Solution Template (Java)
import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        // No solution found
        return new int[0];
    }
}`
            };


            // --- Initialize/Update All Profile Details in UI (સબમિટ પછી પણ આ ફંક્શન કોલ થશે) ---
            function updateProfileUI() {
                const initials = userData.initials.toUpperCase().slice(0, 2);
                const displayName = `${userData.name}`; 
                const displayEmail = `${userData.email}`; // ** Email formatting for bold **
                
                // 1. Sidebar/Main UI updates
                profileNameEl.textContent = displayName;
                profileEmailEl.textContent = displayEmail;
                totalSolvedEl.textContent = userData.solved;
                totalProblemsEl.textContent = userData.total;
                
                // Update avatar everywhere
                const newAvatarUrl = `https://placehold.co/80x80/436b95/ffffff?text=${initials}`;
                
                profileImgEl.src = newAvatarUrl;
                navUserAvatarEl.src = `https://placehold.co/36x36/caa855/ffffff?text=${initials}`;

                // 2. Modal updates (Ensuring all modal fields reflect current user data)
                modalProfileName.textContent = displayName;
                modalEmailDisplay.textContent = displayEmail; // Email in header
                modalEmail.textContent = displayEmail;
                modalTotalSolved.textContent = userData.solved;
                modalTotalProblems.textContent = userData.total;
                modalProfileImg.src = `https://placehold.co/100x100/436b95/ffffff?text=${initials}`;
                
                // Set default values in Edit form when opening modal
                editNameInput.placeholder = userData.name; 
                editInitialsInput.placeholder = userData.initials;
                
            }
            
            // Initial call
            updateProfileUI();


            // --- 1. Theme Toggling & Local Storage ---
            const currentTheme = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (currentTheme) {
                body.dataset.theme = currentTheme;
            } else if (prefersDark) {
                body.dataset.theme = 'dark';
                localStorage.setItem('theme', 'dark');
            } else {
                body.dataset.theme = 'light';
            }

            themeToggle.addEventListener('click', () => {
                const newTheme = body.dataset.theme === 'light' ? 'dark' : 'light';
                body.dataset.theme = newTheme;
                localStorage.setItem('theme', newTheme);
            });

            // --- 2. Filter and Render Problems ---

            function createProblemCard(problem) {
                const solvedClass = problem.solved ? 'solved' : '';
                const solvedIcon = problem.solved ? '<i class="ph-fill ph-check-circle"></i>' : '<i class="ph ph-circle"></i>';
                const tagHtml = problem.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
                
                const selectedClass = problem.id === 1 ? 'selected' : '';

                return `
                    <div class="problem-card ${selectedClass}" data-id="${problem.id}" data-difficulty="${problem.difficulty}">
                        <div class="problem-card-header">
                            <h3>${problem.id}. ${problem.title}</h3>
                            <span class="problem-status ${solvedClass}">${solvedIcon}</span>
                        </div>
                        <div class="problem-card-footer">
                            <span class="difficulty-badge difficulty-${problem.difficulty.toLowerCase()}">${problem.difficulty}</span>
                            <div class="problem-tags">${tagHtml}</div>
                        </div>
                    </div>
                `;
            }

            function renderProblems(filter = 'All') {
                const filterUpper = filter.charAt(0).toUpperCase() + filter.slice(1);
                const filteredProblems = problems.filter(p => 
                    filter === 'All' || p.difficulty === filterUpper
                );

                if (filteredProblems.length === 0) {
                    problemList.innerHTML = '<p style="padding: 1rem; color: var(--text-muted);">No problems found for this difficulty level.</p>';
                    return;
                }
                
                problemList.innerHTML = filteredProblems.map(createProblemCard).join('');
            }
            
            // Event listener for filter buttons
            filterButtonsContainer.addEventListener('click', (e) => {
                const button = e.target.closest('.btn-filter');
                if (!button) return;

                filterButtonsContainer.querySelectorAll('.btn-filter').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');

                const filter = button.textContent;
                renderProblems(filter);
            });
            
            // Initial load: render all problems.
            renderProblems('All');


            // --- 3. Problem Card Selection (Simulated) ---
            problemList.addEventListener('click', (e) => {
                const card = e.target.closest('.problem-card');
                if (!card) return;
                
                problemList.querySelectorAll('.problem-card.selected').forEach(selectedCard => {
                    selectedCard.classList.remove('selected');
                });
                
                card.classList.add('selected');
            });


            // --- 4. Language Selector and Code Update ---
            function setEditorCode(language) {
                if (codeTemplates[language]) {
                    codeEditor.value = codeTemplates[language].trim();
                    updateLineNumbers();
                }
            }

            languageSelectEl.addEventListener('change', (e) => {
                const selectedLanguage = e.target.value;
                showToast(`Language switched to ${selectedLanguage.toUpperCase()}`, 'info');
                setEditorCode(selectedLanguage);
            });


            // --- 5. Profile Modal Logic (પ્રોફાઇલ મોડલ લોજિક) ---

            // --- NEW: Edit Mode Functions ---
            function toggleEditMode(isEditing) {
                if (isEditing) {
                    // Populate form fields with current data
                    editNameInput.value = userData.name; 
                    editEmailInput.value = userData.email;
                    editInitialsInput.value = userData.initials;
                    profileModalEl.classList.add('edit-mode');
                    // Focus on the first input field
                    setTimeout(() => editNameInput.focus(), 350); 
                } else {
                    profileModalEl.classList.remove('edit-mode');
                }
            }

            function saveProfile() {
                let newName = editNameInput.value.trim();
                const newEmail = editEmailInput.value.trim();
                const newInitials = editInitialsInput.value.trim().toUpperCase().slice(0, 2);

                // --- Validation ---
                if (!newName || newName.length < 3) {
                    showToast("Name must be at least 3 characters.", "error", 2500);
                    return;
                }
                // Basic email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!newEmail || !emailRegex.test(newEmail)) {
                    showToast("Please enter a valid email address.", "error", 2500);
                    return;
                }
                if (!newInitials || newInitials.length === 0) {
                    showToast("Initials are required for the avatar.", "error", 2500);
                    return;
                }
                // --- End Validation ---
                
                // Update userData with clean name
                userData.name = newName; 
                userData.email = newEmail;
                userData.initials = newInitials;

                // Update UI elements
                updateProfileUI();
                
                showToast("Profile updated successfully!", "success");
                toggleEditMode(false); // Switch back to view mode
            }

            function openModal() {
                modalOverlay.classList.add('show');
                body.style.overflow = 'hidden';
                toggleEditMode(false); // Always start in view mode when opening
            }
            
            function closeModal() {
                modalOverlay.classList.remove('show');
                body.style.overflow = '';
            }

            // Button Event Listeners
            viewProfileBtn.addEventListener('click', openModal);
            navUserAvatarEl.addEventListener('click', openModal);
            modalCloseBtn.addEventListener('click', closeModal);
            
            editProfileBtn.addEventListener('click', () => toggleEditMode(true)); // Open Edit Mode
            cancelEditBtn.addEventListener('click', () => toggleEditMode(false)); // Cancel Edit
            saveProfileBtn.addEventListener('click', saveProfile); // Save Profile
            
            // Close modal via overlay click
            modalOverlay.addEventListener('click', (e) => {
                // Check if the click target is the overlay AND the modal is NOT in edit mode (to prevent accidental closing while editing)
                if (e.target === modalOverlay && !profileModalEl.classList.contains('edit-mode')) {
                    closeModal();
                }
            });
            
            // Close modal via ESC key
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modalOverlay.classList.contains('show')) {
                    if (profileModalEl.classList.contains('edit-mode')) {
                         // If in edit mode, cancel edit first
                        toggleEditMode(false); 
                    } else {
                        // If in view mode, close modal
                        closeModal();
                    }
                }
            });


            // --- 6. Console Toggling, Toast, Run/Submit, etc. (Existing Logic) ---
            consoleHeader.addEventListener('click', () => {
                consoleContent.classList.toggle('collapsed');
            });
            
            let toastTimer;
            function showToast(message, type = 'info', duration = 3000) {
                clearTimeout(toastTimer);
                toastEl.textContent = message;
                toastEl.className = 'toast show';
                if (type === 'success') {
                    toastEl.classList.add('success');
                } else if (type === 'error') {
                    toastEl.classList.add('error');
                    toastEl.style.backgroundColor = 'var(--difficulty-hard)'; // Ensure error toast is red/hard color
                } else {
                    toastEl.style.backgroundColor = 'var(--primary-blue)';
                }
                
                toastTimer = setTimeout(() => {
                    toastEl.classList.remove('show');
                }, duration);
            }

            runBtn.addEventListener('click', () => {
                runBtn.classList.add('loading');
                consoleContent.classList.remove('collapsed');
                consoleContent.innerHTML = '<div class="output-line">Running test cases...</div>';

                setTimeout(() => {
                    runBtn.classList.remove('loading');
                    showToast('Code Executed', 'info');
                    consoleContent.innerHTML = `
                        <div class="output-line success">[Success] Test Case 1 passed.</div>
                        <div class="output-line success">[Success] Test Case 2 passed.</div>
                        <div class="output-line error">[Failed] Test Case 3: Input [3,3], target 6</div>
                        <div class="output-line error">&nbsp;&nbsp;Expected: [0,1], Got: [0,0]</div>
                    `;
                    consoleContent.scrollTop = consoleContent.scrollHeight;
                }, 1500);
            });

            submitBtn.addEventListener('click', () => {
                submitBtn.classList.add('loading');
                consoleContent.classList.remove('collapsed');
                consoleContent.innerHTML = '<div class="output-line">Submitting and running all test cases...</div>';
                
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    if (Math.random() > 0.5) {
                        showToast('Accepted!', 'success');
                        consoleContent.innerHTML = `
                            <div class="output-line success">[Accepted]</div>
                            <div class="output-line">Runtime: 88 ms, faster than 75.30%</div>
                            <div class="output-line">Memory: 15.2 MB, less than 90.10%</div>
                        `;
                    } else {
                        showToast('Wrong Answer', 'error');
                        consoleContent.innerHTML = `
                            <div class="output-line error">[Wrong Answer]</div>
                            <div class="output-line">Test Case 14/55 failed.</div>
                            <div class="output-line">Input: [1,2,3,4,5], target 10</div>
                            <div class="output-line error">Expected: [], Got: [0,4]</div>
                        `;
                    }
                    consoleContent.scrollTop = consoleContent.scrollHeight;
                }, 2000);
            });

            // --- 7. Code Editor Line Numbers & Scroll Sync ---
            function updateLineNumbers() {
                const lineCount = codeEditor.value.split('\n').length;
                let lineHtml = '';
                for (let i = 0; i < lineCount; i++) {
                    lineHtml += `<span></span>`; // Uses CSS counter
                }
                lineNumbersEl.innerHTML = lineHtml;
                lineNumbersEl.scrollTop = codeEditor.scrollTop;
            }

            codeEditor.addEventListener('input', updateLineNumbers);
            codeEditor.addEventListener('scroll', () => {
                lineNumbersEl.scrollTop = codeEditor.scrollTop;
            }); 
        });
   //  *********************************************** //
                   $ Created By $ 
                 $ Manthan Vinzuda $
   // ***********************************************  //     
