  //  *********************************************** //
                   $ Created By $ 
                 $ Manthan Vinzuda $
   // ***********************************************  //     

        /* DISCUSS SCRIPT.JS */
    
        const getRelativeTime = (date) => {
            const seconds = Math.floor((new Date() - date) / 1000);
            let interval = seconds / 31536000;
            if (interval > 1) return Math.floor(interval) + " years ago";
            interval = seconds / 2592000;
            if (interval > 1) return Math.floor(interval) + " months ago";
            interval = seconds / 86400;
            if (interval > 1) return Math.floor(interval) + " days ago";
            interval = seconds / 3600;
            if (interval > 1) return Math.floor(interval) + " hours ago";
            interval = seconds / 60;
            if (interval > 1) return Math.floor(interval) + " minutes ago";
            return Math.floor(seconds) + " seconds ago";
        };

        const getTagClass = (tag) => {
            const lowerTag = tag.toLowerCase().replace(/\s/g, '');
            if (lowerTag.includes('question')) return 'tag-q';
            if (lowerTag.includes('dsa') || lowerTag.includes('algorithms')) return 'tag-dsa';
            if (lowerTag.includes('system') || lowerTag.includes('design')) return 'tag-sys';
            return 'tag-gen';
        };

        const mockTopics = [
            { id: 101, title: "Optimal way to handle overflow in large integer arithmetic", author: "Manthan V.", time: getRelativeTime(new Date(Date.now() - 10 * 60000)), tags: ["DSA", "Algorithms"], replies: 12, views: "2.1k", activity: getRelativeTime(new Date(Date.now() - 50000)) },
            { id: 102, title: "Is Microservices worth the complexity for a small project?", author: "CodeArchitect", time: getRelativeTime(new Date(Date.now() - 3 * 3600000)), tags: ["System Design"], replies: 28, views: "5.5k", activity: getRelativeTime(new Date(Date.now() - 120000)) },
            { id: 103, title: "Help: Why does my Hash Map suddenly slow down?", author: "NewbieCoder", time: getRelativeTime(new Date(Date.now() - 2 * 86400000)), tags: ["Question", "DSA"], replies: 5, views: "800", activity: getRelativeTime(new Date(Date.now() - 43200000)) },
            { id: 104, title: "Best resources for learning Distributed Consensus (Paxos/Raft)?", author: "RaftMaster", time: getRelativeTime(new Date(Date.now() - 7 * 86400000)), tags: ["System Design", "Question"], replies: 34, views: "10.2k", activity: getRelativeTime(new Date(Date.now() - 7200000)) },
            { id: 105, title: "General chat: What project are you working on this week?", author: "AlgoVaultAdmin", time: getRelativeTime(new Date(Date.now() - 14 * 86400000)), tags: ["General"], replies: 51, views: "15.0k", activity: getRelativeTime(new Date(Date.now() - 10 * 86400000)) },
        ];
        
        const mockThreadDetails = {
            101: {
                content: "I'm working on a large number arithmetic problem (like Fibonacci of a massive number) and keep running into language-specific integer limits. What are the best algorithmic practices to handle these large results efficiently? Any recommended libraries or BigInt solutions?",
                comments: [
                    { author: "SolutionSeeker", time: getRelativeTime(new Date(Date.now() - 40000)), text: "For maximum efficiency, especially in competitive programming, you should implement your own BigInt arithmetic using arrays or strings to store digits. This avoids library overhead." },
                    { author: "CodeArchitect", time: getRelativeTime(new Date(Date.now() - 150000)), text: "In Python, using the built-in `int` handles this automatically, but for C++, you absolutely need a custom implementation or a specialized library like GMP (if allowed)." }
                ]
            }
        };

        let currentTopicList = [...mockTopics];

        window.showThreadDetail = function(id) {
            const threadDetailEl = document.getElementById('thread-detail');
            const defaultViewEl = document.getElementById('default-view');
            const newPostFormEl = document.getElementById('new-post-form');

            const topic = mockTopics.find(t => t.id === id) || mockTopics[0];
            const detail = mockThreadDetails[id] || mockThreadDetails[101];
            const tagHtml = topic.tags.map(tag => `<span class="tag-style ${getTagClass(tag)}">${tag}</span>`).join('');
            
            let commentsHtml = detail.comments.map(comment => `
                <div class="bg-tertiary p-4 rounded-lg shadow-inner mb-4">
                    <p class="text-primary mb-2 text-sm">${comment.text}</p>
                    <div class="comment-user-info text-xs flex justify-between">
                        <span>Posted by <strong class="text-primary">${comment.author}</strong></span>
                        <span>${comment.time}</span>
                    </div>
                </div>
            `).join('');

            threadDetailEl.innerHTML = `
                <div class="mb-6 pb-4 border-b border-color">
                    <div class="flex items-center gap-2 mb-2">
                        ${tagHtml}
                    </div>
                    <h2 class="text-2xl font-bold post-title text-accent-primary mb-2">${topic.title}</h2>
                    <p class="text-sm text-secondary">Posted by ${topic.author} | ${topic.time}</p>
                </div>
                
                <div class="bg-primary p-4 rounded-lg mb-6 border border-color">
                    <p class="text-primary leading-relaxed">${detail.content}</p>
                </div>

                <h3 class="text-lg font-semibold text-primary mb-4">${topic.replies} Replies</h3>
                
                <div class="space-y-4">
                    ${commentsHtml}
                </div>

                <div class="mt-6">
                    <textarea id="reply-input" rows="4" class="w-full p-3 rounded-lg border border-color bg-primary text-primary focus:ring-2 focus:ring-accent-highlight focus:outline-none transition-all" placeholder="Write your reply..."></textarea>
                    <button class="accent-highlight text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-all mt-2 float-right text-sm btn-animate" onclick="handleReply(event, ${topic.id})">Post Reply</button>
                </div>
            `;

            document.querySelectorAll('.post-card').forEach(card => card.classList.remove('selected-card'));
            const selectedCard = document.querySelector(`.post-card[data-id="${id}"]`);
            if(selectedCard) {
                selectedCard.classList.add('selected-card');
                selectedCard.style.border = `2px solid var(--accent-highlight)`;
            }

            defaultViewEl.classList.add('hidden');
            newPostFormEl.classList.add('hidden');
            threadDetailEl.classList.remove('hidden');
        }

        window.handleReply = function(event, topicId) {
            event.preventDefault();
            const replyInput = document.getElementById('reply-input');
            const replyText = replyInput.value.trim();

            if (replyText) {
                const topicIndex = mockTopics.findIndex(t => t.id === topicId);
                if (topicIndex !== -1) {
                    mockTopics[topicIndex].replies += 1;
                    mockTopics[topicIndex].activity = "just now";
                }
                
                const newComment = {
                    author: "Current User",
                    time: "just now",
                    text: replyText
                };
                
                if (!mockThreadDetails[topicId]) {
                    mockThreadDetails[topicId] = { content: "Original post content...", comments: [] };
                }
                mockThreadDetails[topicId].comments.unshift(newComment);
                
                renderTopicList(currentTopicList);
                showThreadDetail(topicId);
                
                replyInput.value = '';
            }
        }
        
        document.addEventListener('DOMContentLoaded', () => {

            const body = document.body;
            const themeToggle = document.getElementById('theme-toggle');
            const topicListEl = document.getElementById('topic-list');
            const newPostBtn = document.getElementById('new-post-btn');
            const cancelPostBtn = document.getElementById('cancel-post-btn');
            const postFormEl = document.getElementById('post-form');
            const newPostFormEl = document.getElementById('new-post-form');
            const defaultViewEl = document.getElementById('default-view');
            const filterButtons = document.querySelectorAll('.filter-btn');

            const currentTheme = localStorage.getItem('discussTheme') || 'light';
            body.dataset.theme = currentTheme;

            themeToggle.addEventListener('click', () => {
                const newTheme = body.dataset.theme === 'light' ? 'dark' : 'light';
                body.dataset.theme = newTheme;
                localStorage.setItem('discussTheme', newTheme);
            });
            
            const errorModalOverlay = document.getElementById('error-modal-overlay');
            const modalCloseButton = document.getElementById('modal-close-btn');
            const modalMessageEl = document.getElementById('modal-message');

            const showAlert = (message) => {
                modalMessageEl.textContent = message;
                errorModalOverlay.classList.add('active');
            };

            const closeAlert = () => {
                errorModalOverlay.classList.remove('active');
            };

            modalCloseButton.addEventListener('click', closeAlert);
            errorModalOverlay.addEventListener('click', (e) => {
                if (e.target === errorModalOverlay) {
                    closeAlert();
                }
            });
            
            function createTopicCard(topic) {
                const tagClass = getTagClass(topic.tags[0]);
                const tagHtml = topic.tags.map(tag => `<span class="tag-style ${getTagClass(tag)}">${tag}</span>`).join('');
                
                return `
                    <div class="post-card bg-secondary p-4 rounded-xl cursor-pointer hover:bg-tertiary border-b border-color transition-all" data-id="${topic.id}" data-tags="${topic.tags.join(' ').toLowerCase()}">
                        <a href="#" class="block focus:outline-none" onclick="event.preventDefault(); showThreadDetail(${topic.id});">
                            <h3 class="post-title text-primary mb-2">${topic.title}</h3>
                            <div class="flex flex-wrap items-center gap-2 mb-3">
                                ${tagHtml}
                            </div>
                            <div class="flex justify-between text-xs text-secondary">
                                <p>By ${topic.author} - ${topic.time}</p>
                                <div class="flex items-center space-x-3">
                                    <span class="flex items-center gap-1"><i class="ph ph-chat-circle text-sm"></i>${topic.replies}</span>
                                    <span class="flex items-center gap-1"><i class="ph ph-eye text-sm"></i>${topic.views}</span>
                                </div>
                            </div>
                            <p class="text-xs text-secondary mt-1 pt-1 border-t border-dashed border-color">Last activity: ${topic.activity}</p>
                        </a>
                    </div>
                `;
            }

            function renderTopicList(topics) {
                topicListEl.innerHTML = topics.map(createTopicCard).join('');
            }
            
            function showDefaultView() {
                defaultViewEl.classList.remove('hidden');
                newPostFormEl.classList.add('hidden');
                document.getElementById('thread-detail').classList.add('hidden');
            }

            function showNewPostForm() {
                defaultViewEl.classList.add('hidden');
                document.getElementById('thread-detail').classList.add('hidden');
                newPostFormEl.classList.remove('hidden');
            }

            filterButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    filterButtons.forEach(btn => btn.classList.remove('active-filter', 'accent-primary', 'text-white'));
                    
                    const filter = e.target.dataset.filter;
                    e.target.classList.add('active-filter');
                    
                    if (filter === 'all') {
                        e.target.classList.add('bg-secondary', 'text-primary');
                    } else {
                        e.target.classList.add('accent-primary', 'text-white');
                    }
                    
                    currentTopicList = mockTopics.filter(topic => {
                        if (filter === 'all') return true;
                        
                        const lowerCaseTags = topic.tags.map(t => t.toLowerCase());
                        return lowerCaseTags.some(tag => tag.includes(filter));
                    });

                    renderTopicList(currentTopicList);
                    showDefaultView();
                });
            });

            document.querySelector('.filter-btn[data-filter="all"]').click();

            newPostBtn.addEventListener('click', showNewPostForm);
            cancelPostBtn.addEventListener('click', showDefaultView);

            postFormEl.addEventListener('submit', (e) => {
                e.preventDefault();
                const title = document.getElementById('post-title-input').value.trim();
                const category = document.getElementById('post-tag-select').value;
                const content = document.getElementById('post-content').value.trim();

                if (!title || !content) {
                    showAlert("Please fill out both the Title and Content fields.");
                    return;
                }

                const newId = Math.max(...mockTopics.map(t => t.id)) + 1;
                const newTopic = {
                    id: newId,
                    title: title,
                    author: "Current User",
                    time: "just now",
                    tags: [category],
                    replies: 0,
                    views: "0",
                    activity: "just now"
                };
                mockTopics.unshift(newTopic);
                currentTopicList.unshift(newTopic);
                
                mockThreadDetails[newId] = { content: content, comments: [] };

                renderTopicList(currentTopicList);
                showThreadDetail(newId);

                postFormEl.reset();
            });
        });

      //  *********************************************** //
                   $ Created By $ 
                 $ Manthan Vinzuda $
   // ***********************************************  //     
