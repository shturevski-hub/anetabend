/**
 * ANETA BEND OFFICIAL - FULL SCRIPT 2026
 * Handles Loader, Navigation Overlay, Video Modal, and Smooth Scroll.
 */

// 1. LOADER LOGIC
// Simulates loading progress to ensure the visual elements are ready.
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const progress = document.querySelector('.progress');
    
    let width = 0;
    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 500);
        } else {
            width += 5;
            progress.style.width = width + '%';
        }
    }, 50);
});

// 2. NAVIGATION OVERLAY LOGIC
// Controls the fullscreen menu for both Desktop (More) and Mobile (Menu).
const overlay = document.getElementById('menuOverlay');
const openBtns = document.querySelectorAll('.open-menu');
const closeBtn = document.querySelector('.close-overlay');
const overlayLinks = document.querySelectorAll('.overlay-link');

// Open Menu function
openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevents background scrolling
    });
});

// Close Menu function
const closeMenu = () => {
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enables background scrolling
};

if (closeBtn) closeBtn.addEventListener('click', closeMenu);

// Close menu automatically when clicking internal links
overlayLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// 3. VIDEO MODAL LOGIC
// Handles the YouTube gallery popups.
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const videoTriggers = document.querySelectorAll('.video-trigger');
const closeModalBtn = document.querySelector('.close-modal');

videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
        const videoSrc = this.getAttribute('data-video');
        // Appending autoplay for instant playback upon click
        modalVideo.src = videoSrc + "?autoplay=1";
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

const stopVideo = () => {
    modal.style.display = 'none';
    modalVideo.src = ""; // Clears the source to stop audio
    document.body.style.overflow = 'auto';
};

if (closeModalBtn) closeModalBtn.addEventListener('click', stopVideo);

// 4. GLOBAL CLICKS & KEYBOARD SHORTCUTS
// Allows closing overlays with the ESC key or clicking outside content.
window.addEventListener('click', (e) => {
    if (e.target === modal) stopVideo();
    if (e.target === overlay) closeMenu();
});

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        stopVideo();
        closeMenu();
    }
});

// 5. SMOOTH SCROLLING FOR INTERNAL LINKS
// Ensures smooth transitions for IDs like #hero, #about, or #booking.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default if it's a valid internal link
        const targetId = this.getAttribute('href');
        if (targetId !== "#") {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
