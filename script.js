// Page Loader logic
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) loader.classList.add('fade-out');
    }, 1000);
});

// Initialize Animations
AOS.init({ duration: 1000, once: true, disable: 'mobile' });

// Modal Logic
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

// Smooth Page Transitions
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only trigger transition for internal page links (not anchors or tel)
        if (this.hostname === window.location.hostname && 
            !href.startsWith('#') && 
            !href.includes('tel:') && 
            !this.target) {
            
            e.preventDefault();
            const target = this.href;
            const loader = document.getElementById('loader');
            if (loader) {
                loader.classList.remove('fade-out');
                setTimeout(() => { window.location.href = target; }, 800);
            }
        }
    });
});
