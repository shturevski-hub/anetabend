window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('fade-out');
    }, 1800);
});

AOS.init({ duration: 1000, once: true });

const modal = document.getElementById('videoModal'),
      modalVideo = document.getElementById('modalVideo'),
      closeModal = document.querySelector('.close-modal'),
      triggers = document.querySelectorAll('.video-trigger');

triggers.forEach(t => t.addEventListener('click', () => {
    modalVideo.src = t.dataset.video + "?autoplay=1";
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}));

const closeAll = () => { 
    modal.classList.remove('active'); 
    modalVideo.src = ""; 
    document.body.style.overflow = 'auto'; 
};
closeModal.addEventListener('click', closeAll);
modal.addEventListener('click', (e) => { if (e.target === modal) closeAll(); });

// Add this to your existing script.js
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.hostname === window.location.hostname && !this.hash) {
            e.preventDefault();
            const target = this.href;
            document.getElementById('loader').classList.remove('fade-out');
            setTimeout(() => {
                window.location.href = target;
            }, 800);
        }
    });
});