document.addEventListener('DOMContentLoaded', function() {
    // Navbar toggle functionality
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navbarMenu.classList.contains('active')) {
            navbarMenu.classList.remove('active');
        }
    });

    // Mobile dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    if (window.innerWidth <= 968) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 968) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    const dropdownMenu = parent.querySelector('.dropdown-menu');
                    dropdownMenu.classList.toggle('active');
                }
            });
        });
    }

    // Handle window resize for dropdown behavior
    window.addEventListener('resize', function() {
        if (window.innerWidth > 968) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('active');
            });
        }
    });

    // Carousel functionality for photo gallery page
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const carouselSlide = carousel.querySelector('.carousel-slide');
        const carouselImages = carousel.querySelectorAll('.carousel-slide img');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        let counter = 0;
        const size = carouselImages[0].clientWidth;

        // Set initial position
        carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

        // Next button
        nextBtn.addEventListener('click', function() {
            if (counter >= carouselImages.length - 1) return;
            carouselSlide.style.transition = "transform 0.4s ease-in-out";
            counter++;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            updateIndicators();
        });

        // Prev button
        prevBtn.addEventListener('click', function() {
            if (counter <= 0) return;
            carouselSlide.style.transition = "transform 0.4s ease-in-out";
            counter--;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            updateIndicators();
        });

        // Indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                counter = index;
                carouselSlide.style.transition = "transform 0.4s ease-in-out";
                carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
                updateIndicators();
            });
        });

        function updateIndicators() {
            indicators.forEach((indicator, index) => {
                if (index === counter) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
        }

        // Auto slide
        setInterval(function() {
            if (counter >= carouselImages.length - 1) {
                counter = -1;
            }
            carouselSlide.style.transition = "transform 0.4s ease-in-out";
            counter++;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
            updateIndicators();
        }, 5000);
    }
});