document.addEventListener('DOMContentLoaded', function () {
	// Create dots around the logo outer ring
	const dotsContainer = document.getElementById('dots');
	const numberOfDots = 24;
	const numberOfGlowingDots = 24;

	// Create white dots
	for (let i = 0; i < numberOfDots; i++) {
		const dot = document.createElement('div');
		dot.classList.add('dot');

		const angle = (i / numberOfDots) * 2 * Math.PI;
		const radius = 145; // Radius from center to dots

		const x = 150 + radius * Math.cos(angle);
		const y = 150 + radius * Math.sin(angle);

		dot.style.left = `${x}px`;
		dot.style.top = `${y}px`;

		dotsContainer.appendChild(dot);
	}

	// Create glowing dots
	for (let i = 0; i < numberOfGlowingDots; i++) {
		const glowingDot = document.createElement('div');
		glowingDot.classList.add('glowing-dot');

		const angle = (i / numberOfGlowingDots) * 2 * Math.PI;
		const radius = 145; // Same radius for alignment

		// Offset angle to place these dots between the white dots
		const offsetAngle = angle + Math.PI / numberOfGlowingDots;

		const x = 150 + radius * Math.cos(offsetAngle);
		const y = 150 + radius * Math.sin(offsetAngle);

		glowingDot.style.left = `${x}px`;
		glowingDot.style.top = `${y}px`;

		dotsContainer.appendChild(glowingDot);
	}

	// Add initial animations
	const logoInner = document.getElementById('logoInner');
	logoInner.classList.add('float', 'flicker');

	// Calculate positions for smooth transition
	const initialPositionDesktop = {
		left: window.innerWidth / 2,
		top: window.innerHeight / 2,
	};

	const finalPositionDesktop = {
		left: window.innerWidth - 100,
		top: window.innerHeight / 2,
	};

	const initialPositionMobile = {
		left: window.innerWidth / 2,
		top: window.innerHeight / 2,
	};

	const finalPositionMobile = {
		left: 20,
		top: 30,
	};

	// Start transitions after 3 seconds
	setTimeout(function () {
		const logoContainer = document.getElementById('logoContainer');
		const content = document.getElementById('content');
		const header = document.getElementById('header');

		// Remove floating and flickering animations
		logoInner.classList.remove('float', 'flicker');

		// First - apply transition styling before changing positions
		logoContainer.style.transition =
			'all 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)';

		// Apply different transitions based on screen size
		if (window.innerWidth <= 768) {
			// Mobile transition - use absolute pixel values
			logoContainer.style.top = finalPositionMobile.top + 'px';
			logoContainer.style.left = finalPositionMobile.left + 'px';
			logoContainer.style.transform = 'scale(0.15)';
			logoContainer.style.transformOrigin = 'left top';
		} else {
			// Desktop transition - use absolute pixel values instead of 'auto'
			logoContainer.style.top = finalPositionDesktop.top + 'px';
			logoContainer.style.left = finalPositionDesktop.left + 'px';
			logoContainer.style.transform = 'translate(-50%, -50%) scale(0.7)';
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
				logoContainer.style.transform = 'scale(0.15)';
				logoContainer.style.transformOrigin = 'left top';
			} else {
				const finalPositionDesktop = {
					left: window.innerWidth - 100,
					top: window.innerHeight / 2,
				};

				logoContainer.style.top = finalPositionDesktop.top + 'px';
				logoContainer.style.left = finalPositionDesktop.left + 'px';
				logoContainer.style.transform = 'translate(-50%, -50%) scale(0.7)';
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
