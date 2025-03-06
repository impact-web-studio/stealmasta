document.addEventListener('DOMContentLoaded', function () {
	// Add initial animations
	const logoInner = document.querySelector('.innerCrestLogo');
	var logoScaleFactor = {};

	logoInner.addEventListener('load', function () {
		logoBaseHeight = logoInner.getBoundingClientRect().height;
		console.log('After Load:', logoBaseHeight); // Correct value
		logoScaleFactor = {
			desktop: window.innerHeight / logoBaseHeight,
			mobile: 0.2,
		};
	});

	logoInner.classList.add('float', 'flicker');

	// Calculate positions for smooth transition
	const initialPositionDesktop = {
		left: window.innerWidth / 2,
		top: window.innerHeight / 2,
	};

	const finalPositionDesktop = {
		left: window.innerWidth - 50,
		top: window.innerHeight / 2,
	};

	const initialPositionMobile = {
		left: window.innerWidth / 2,
		top: window.innerHeight / 2,
	};

	const finalPositionMobile = {
		left: 50,
		top: 46,
	};

	// Start transitions after 3 seconds
	setTimeout(function () {
		const logoContainer = document.getElementById('logoContainer');
		const content = document.getElementById('content');
		const header = document.getElementById('header');

		// Remove floating and flickering animations
		logoInner.classList.remove('float', 'flicker');

		// First - apply transition styling before changing positions
		logoContainer.style.transition = 'all 2s cubic-bezier(0.4, 0, 0, 1)';

		// Apply different transitions based on screen size
		if (window.innerWidth <= 768) {
			// Mobile transition - use absolute pixel values
			logoContainer.style.top = finalPositionMobile.top + 'px';
			logoContainer.style.left = finalPositionMobile.left + 'px';
			logoContainer.style.transform = 'scale(0.2)';
			logoContainer.style.transformOrigin = 'left top';
		} else {
			// Desktop transition - use absolute pixel values instead of 'auto'
			logoContainer.style.top = finalPositionDesktop.top + 'px';
			logoContainer.style.left = finalPositionDesktop.left + 'px';
			logoContainer.style.transform = `translate(-50%, -50%) scale(${logoScaleFactor.desktop})`;
			logoContainer.style.transformOrigin = 'center center';
		}

		// Show content with a slight delay
		setTimeout(function () {
			content.style.opacity = '1';
			content.style.visibility = 'visible';
			header.style.opacity = '1';
		}, 500);
	}, 3000); // 3 second delay

	// Handle window resize
	window.addEventListener('resize', function () {
		const logoContainer = document.getElementById('logoContainer');

		// Only apply if the transition has already happened
		if (logoContainer.style.transition) {
			if (window.innerWidth <= 768) {
				logoContainer.style.top = '30px';
				logoContainer.style.left = '20px';
				logoContainer.style.transform = 'scale(0.2)';
				logoContainer.style.transformOrigin = 'left top';
			} else {
				const finalPositionDesktop = {
					left: window.innerWidth - 100,
					top: window.innerHeight / 2,
				};

				logoContainer.style.top = finalPositionDesktop.top + 'px';
				logoContainer.style.left = finalPositionDesktop.left + 'px';
				logoContainer.style.transform = `translate(-50%, -50%) scale(${logoScaleFactor.desktop})`;
				logoContainer.style.transformOrigin = 'center center';
			}
		}
	});

	// Form submission
	document
		.getElementById('newsletterForm')
		.addEventListener('submit', function (e) {
			e.preventDefault();
			const name = document.getElementById('name').value;
			const email = document.getElementById('email').value;

			// Here you would typically send data to your backend
			alert(`Thank you, ${name}! Your email (${email}) has been registered.`);
		});
});
