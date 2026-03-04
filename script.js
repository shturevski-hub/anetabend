// Function to hide loader
const hideLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('fade-out');
        // Physically remove from display after transition to prevent click blocking
        setTimeout(() => { 
            if(loader.classList.contains('fade-out')) loader.style.display = 'none'; 
        }, 1000);
    }
};

// 1. Initial Load Logic
window.addEventListener('load', () => {
    setTimeout(hideLoader, 500); // Reduced delay for better UX
});

// Failsafe: Hide loader anyway after 4 seconds if 'load' event hangs
setTimeout(hideLoader, 4000);

// 2. CRITICAL: Fix for mobile "stuck" loader (bfcache)
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        hideLoader();
    }
});

// 3. Initialize Animations
AOS.init({ 
    duration: 1000, 
    once: true, 
    disable: 'mobile' 
});

// 4. Modal Logic
const modal = document.getElementById('videoModal'),
      modalVideo = document.getElementById('modalVideo'),
      closeModal = document.querySelector('.close-modal'),
      triggers = document.querySelectorAll('.video-trigger');

if (triggers.length > 0) {
    triggers.forEach(t => t.addEventListener('click', (e) => {
        e.preventDefault();
        const videoSrc = t.dataset.video;
        if (modalVideo) {
            modalVideo.src = videoSrc + (videoSrc.includes('?') ? '&' : '?') + "autoplay=1";
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }));
}

const closeAll = () => { 
    if (modal) {
        modal.classList.remove('active'); 
        if (modalVideo) modalVideo.src = ""; 
        document.body.style.overflow = 'auto'; 
    }
};

if (closeModal) closeModal.addEventListener('click', closeAll);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeAll(); });

// 5. Smart Page Transitions (Optimized)
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const targetUrl = this.href;

        // Validation for internal navigation
        if (
            href &&
            this.hostname === window.location.hostname && 
            !href.startsWith('#') && 
            !href.includes('tel:') && 
            !href.includes('mailto:') &&
            this.target !== "_blank" &&
            !e.metaKey && !e.ctrlKey // Allow cmd/ctrl + click to open in new tab
        ) {
            const loader = document.getElementById('loader');
            if (loader) {
                e.preventDefault();
                loader.style.display = 'flex'; // Ensure it's visible
                loader.classList.remove('fade-out');
                
                // Navigate after short delay
                setTimeout(() => { 
                    window.location.href = targetUrl; 
                }, 400);

                // Ultimate safety: hide if navigation fails
                setTimeout(hideLoader, 5000);
            }
        }
    });
});
