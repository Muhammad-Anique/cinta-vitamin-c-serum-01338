'use strict';

/**
 * RacketPro Web - Main Interaction Script
 * Handles: Mobile Menu, Smooth Scroll, Testimonial Carousel, and Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Mobile Menu Toggle ---
    const mobileMenu = document.querySelector('#mobileMenu');
    const navLinks = document.querySelector('#navLinks');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X (optional styling via class)
            mobileMenu.classList.toggle('open');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('open');
            });
        });
    }

    // --- 2. Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 3. Testimonial Carousel Logic ---
    const slides = document.querySelectorAll('.testimonial-slide');
    let currentSlide = 0;

    if (slides.length > 0) {
        const nextSlide = () => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        };

        // Auto-scroll every 5 seconds
        setInterval(nextSlide, 5000);
    }

    // --- 4. Lead Capture Form Handling ---
    const leadForm = document.querySelector('#leadForm');
    const formStatus = document.querySelector('#formStatus');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const name = document.querySelector('#name').value.trim();
            const email = document.querySelector('#email').value.trim();
            const message = document.querySelector('#message').value.trim();

            if (!name || !email || !message) {
                showStatus('Please fill in all required fields.', 'error');
                return;
            }

            // Simulate form submission
            const submitBtn = leadForm.querySelector('button');
            const originalBtnText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            setTimeout(() => {
                showStatus('Success! Our specialists will contact you soon.', 'success');
                leadForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }, 1500);
        });
    }

    /**
     * Helper to show form status messages
     * @param {string} msg - The message to display
     * @param {string} type - 'success' or 'error'
     */
    function showStatus(msg, type) {
        if (!formStatus) return;
        
        formStatus.textContent = msg;
        formStatus.style.color = type === 'success' ? '#10b981' : '#ef4444';
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    }

    // --- 5. Sticky Header Effect ---
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '16px 0';
        }
    });
});