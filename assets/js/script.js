// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if Intersection Observer is supported
    if ('IntersectionObserver' in window) {
        // Create observer instance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // If element is in view
                if (entry.isIntersecting) {
                    // Add appropriate animation class based on data attribute or default to fade-in-up
                    if (entry.target.classList.contains('translate-x-[-50px]')) {
                        entry.target.classList.add('fade-in-left');
                    } else if (entry.target.classList.contains('translate-x-[50px]')) {
                        entry.target.classList.add('fade-in-right');
                    } else {
                        entry.target.classList.add('fade-in-up');
                    }
                    
                    // Remove the initial transform and opacity classes
                    entry.target.classList.remove('opacity-0');
                    entry.target.classList.remove('translate-y-10');
                    entry.target.classList.remove('translate-x-[-50px]');
                    entry.target.classList.remove('translate-x-[50px]');
                    
                    // Stop observing the element after animation
                    observer.unobserve(entry.target);
                }
            });
        }, {
            // Options
            threshold: 0.1, // Trigger when at least 10% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Slightly offset the trigger point
        });

        // Get all elements to animate
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        // Start observing each element
        elements.forEach(element => {
            observer.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(element => {
            element.classList.remove('opacity-0');
            element.classList.remove('translate-y-10');
            element.classList.remove('translate-x-[-50px]');
            element.classList.remove('translate-x-[50px]');
        });
    }

    // Optional: Add scroll progress indicator
    const addScrollProgress = () => {
        const progressBar = document.createElement('div');
        progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-purple-600 z-50 transition-all duration-300';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    };

    addScrollProgress();

    // Optional: Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Error handling wrapper
    const handleError = (error) => {
        console.error('Animation error:', error);
        // Ensure content is visible even if animations fail
        document.querySelectorAll('.animate-on-scroll').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    };

    // Wrap all initialization in try-catch
    try {
        // Add any additional initialization here
    } catch (error) {
        handleError(error);
    }
});
