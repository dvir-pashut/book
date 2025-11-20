// Book Application
class Book {
    constructor(pages) {
        this.pages = pages;
        this.currentPage = 0;
        this.pagesContainer = document.getElementById('pages');
        this.prevBtn = document.getElementById('prev-btn');
        this.nextBtn = document.getElementById('next-btn');
        this.pageNumber = document.getElementById('page-number');
        this.loadingScreen = document.getElementById('loading-screen');
        this.bookContainer = document.getElementById('book-container');
        this.progressFill = document.getElementById('progress-fill');
        this.isAnimating = false;
        
        this.init();
    }
    
    async init() {
        // Preload all assets
        await this.preloadAssets();
        
        // Create the book pages
        this.createPages();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Update navigation
        this.updateNavigation();
        
        // Hide loading screen and show book
        this.hideLoadingScreen();
    }
    
    async preloadAssets() {
        const imagesToLoad = this.pages
            .filter(page => page.image && page.image.trim() !== '')
            .map(page => page.image);
        
        if (imagesToLoad.length === 0) {
            // No images to load, just simulate a brief loading time
            await this.simulateLoading();
            return;
        }
        
        const totalAssets = imagesToLoad.length;
        let loadedAssets = 0;
        
        const updateProgress = () => {
            loadedAssets++;
            const progress = (loadedAssets / totalAssets) * 100;
            this.progressFill.style.width = progress + '%';
        };
        
        const imagePromises = imagesToLoad.map(src => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    updateProgress();
                    resolve();
                };
                img.onerror = () => {
                    console.warn(`Failed to load image: ${src}`);
                    updateProgress();
                    resolve(); // Resolve anyway to not block the loading
                };
                img.src = src;
            });
        });
        
        await Promise.all(imagePromises);
        
        // Ensure progress bar shows 100%
        this.progressFill.style.width = '100%';
        
        // Small delay to show completion
        await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    async simulateLoading() {
        // Simulate loading progress for demonstration
        for (let i = 0; i <= 100; i += 10) {
            this.progressFill.style.width = i + '%';
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
    
    hideLoadingScreen() {
        this.loadingScreen.style.opacity = '0';
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
            this.bookContainer.style.display = 'flex';
            // Fade in book
            setTimeout(() => {
                this.bookContainer.style.opacity = '1';
            }, 50);
        }, 500);
        
        this.bookContainer.style.opacity = '0';
        this.bookContainer.style.transition = 'opacity 0.5s ease';
    }
    
    createPages() {
        // Create pages in correct order for RTL (first page should be on top)
        for (let i = 0; i < this.pages.length; i++) {
            const pageData = this.pages[i];
            const pageElement = document.createElement('div');
            pageElement.className = 'page';
            pageElement.dataset.pageIndex = i;
            // Set z-index so first page (0) has highest z-index
            pageElement.style.zIndex = this.pages.length - i;
            
            const content = this.createPageContent(pageData, i + 1);
            pageElement.appendChild(content);
            
            this.pagesContainer.appendChild(pageElement);
        }
    }
    
    createPageContent(pageData, pageNum) {
        const contentDiv = document.createElement('div');
        contentDiv.className = 'page-content';
        
        // Add title
        if (pageData.title) {
            const title = document.createElement('h1');
            title.textContent = pageData.title;
            contentDiv.appendChild(title);
        }
        
        // Add subtitle
        if (pageData.subtitle) {
            const subtitle = document.createElement('h2');
            subtitle.textContent = pageData.subtitle;
            contentDiv.appendChild(subtitle);
        }
        
        // Add image
        if (pageData.image && pageData.image.trim() !== '') {
            const img = document.createElement('img');
            img.src = pageData.image;
            img.alt = pageData.title || 'Page image';
            contentDiv.appendChild(img);
        }
        
        // Add content
        if (pageData.content) {
            const text = document.createElement('p');
            text.style.whiteSpace = 'pre-line';
            text.textContent = pageData.content;
            contentDiv.appendChild(text);
        }
        
        // Add page number
        const pageNumberDiv = document.createElement('div');
        pageNumberDiv.className = 'page-number-display';
        pageNumberDiv.textContent = pageNum;
        contentDiv.appendChild(pageNumberDiv);
        
        return contentDiv;
    }
    
    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.previousPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());
        
        // Keyboard navigation (reversed for RTL)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.nextPage();
            } else if (e.key === 'ArrowRight') {
                this.previousPage();
            }
        });
    }
    
    async nextPage() {
        if (this.isAnimating || this.currentPage >= this.pages.length - 1) {
            return;
        }
        
        this.isAnimating = true;
        
        // Find the page element with the current page index
        const currentPageElement = this.pagesContainer.querySelector(`[data-page-index="${this.currentPage}"]`);
        currentPageElement.classList.add('turning');
        
        await this.sleep(800);
        
        currentPageElement.classList.remove('turning');
        currentPageElement.classList.add('turned');
        
        this.currentPage++;
        this.updateNavigation();
        
        this.isAnimating = false;
    }
    
    async previousPage() {
        if (this.isAnimating || this.currentPage <= 0) {
            return;
        }
        
        this.isAnimating = true;
        
        this.currentPage--;
        
        // Find the page element with the previous page index
        const currentPageElement = this.pagesContainer.querySelector(`[data-page-index="${this.currentPage}"]`);
        currentPageElement.classList.remove('turned');
        currentPageElement.classList.add('turning');
        
        await this.sleep(400);
        
        currentPageElement.classList.remove('turning');
        
        this.updateNavigation();
        
        this.isAnimating = false;
    }
    
    updateNavigation() {
        // Update page number display
        this.pageNumber.textContent = `עמוד ${this.currentPage + 1} מתוך ${this.pages.length}`;
        
        // Update button states
        this.prevBtn.disabled = this.currentPage === 0;
        this.nextBtn.disabled = this.currentPage === this.pages.length - 1;
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the book when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const book = new Book(bookPages);
});
