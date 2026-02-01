// Function to hide loader
const hideLoader = () => {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('fade-out');
    }
};

// 1. Hide loader on initial load
window.addEventListener('load', () => {
    setTimeout(hideLoader, 1000);
});

// 2. CRITICAL: Fix for mobile "stuck" loader (bfcache)
// This runs when you navigate back/forward on mobile
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        hideLoader();
    }
});

// 3. Initialize Animations
AOS.init({ 
    duration: 1000, 
    once: true, 
    disable: 'mobile' // Best for performance on older phones
});

// 4. Modal Logic
const modal = document.getElementById('videoModal'),
      modalVideo = document.getElementById('modalVideo'),
      closeModal = document.querySelector('.close-modal'),
      triggers = document.querySelectorAll('.video-trigger');

triggers.forEach(t => t.addEventListener('click', () => {
    const videoSrc = t.dataset.video;
    modalVideo.src = videoSrc + (videoSrc.includes('?') ? '&' : '?') + "autoplay=1";
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}));

const closeAll = () => { 
    modal.classList.remove('active'); 
    modalVideo.src = ""; 
    document.body.style.overflow = 'auto'; 
};

if (closeModal) closeModal.addEventListener('click', closeAll);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeAll(); });

// 5. Smart Page Transitions
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        const targetUrl = this.href;

        // Don't show loader for: 
        // - Anchor links on same page (#booking)
        // - Phone links (tel:)
        // - External links (target="_blank")
        if (
            this.hostname === window.location.hostname && 
            !href.startsWith('#') && 
            !href.includes('tel:') && 
            this.target !== "_blank"
        ) {
            e.preventDefault();
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.remove('fade-out');
                // Safety timeout: if page takes > 3s, hide loader anyway
                setTimeout(() => { window.location.href = targetUrl; }, 600);
                setTimeout(hideLoader, 3000); 
            }
        }
    });
});
