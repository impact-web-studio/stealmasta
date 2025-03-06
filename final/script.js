document.addEventListener('DOMContentLoaded', function () {
	// Add initial animations
	const logoInner = document.getElementById('logoInner');
	logoInner.classList.add('float', 'flicker');

	// Start transitions after 3 seconds
	setTimeout(function () {
		const logoContainer = document.getElementById('logoContainer');
		const content = document.getElementById('content');
		const header = document.getElementById('header');

		// Remove floating and flickering animations
		logoInner.classList.remove('float', 'flicker');

		// First - apply transition styling before changing classes
		// This ensures the transition is smooth
		logoContainer.style.transition =
			'all 1.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)';

		// Apply different transitions based on screen size
		if (window.innerWidth <= 768) {
			// Mobile transition
			logoContainer.style.top = '30px';
			logoContainer.style.left = '20px';
			logoContainer.style.transform = 'scale(0.15)';
			logoContainer.style.transformOrigin = 'left top';
		} else {
			// Desktop transition
			logoContainer.style.top = '50%';
			logoContainer.style.left = 'auto';
			logoContainer.style.right = '100px';
			logoContainer.style.transform = 'translate(0, -50%) scale(0.7)'; // Increased size for desktop
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
				logoContainer.style.right = 'auto';
				logoContainer.style.transform = 'scale(0.15)';
				logoContainer.style.transformOrigin = 'left top';
			} else {
				logoContainer.style.top = '50%';
				logoContainer.style.left = 'auto';
				logoContainer.style.right = '100px';
				logoContainer.style.transform = 'translate(0, -50%) scale(0.7)';
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
