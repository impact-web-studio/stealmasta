document.addEventListener('DOMContentLoaded', () => {
	const logoInner = document.querySelector('.innerCrestLogo');
	const logoContainer = document.getElementById('logoContainer');
	const content = document.getElementById('content');
	const header = document.getElementById('header');
	const form = document.getElementById('newsletterForm');
	let logoScaleFactor = { desktop: 1, mobile: 0.2 };

	// Ensure proper scaling once the logo image loads
	logoInner.onload = () => {
		const logoBaseHeight = logoInner.getBoundingClientRect().height;
		logoScaleFactor.desktop = window.innerHeight / logoBaseHeight;
	};

	// Add initial animations
	logoInner.classList.add('float', 'flicker');

	// Position configurations
	const finalPositions = {
		desktop: { left: window.innerWidth - 50, top: window.innerHeight / 2 },
		mobile: { left: 50, top: 46 },
	};

	// Start transition after delay
	setTimeout(() => {
		logoInner.classList.remove('float', 'flicker');
		logoContainer.style.transition =
			'all 1.2s cubic-bezier(0.3, -0.05, 0.5, 0.85)';

		const isMobile = window.innerWidth < 1024;
		logoContainer.style.top = `${
			finalPositions[isMobile ? 'mobile' : 'desktop'].top
		}px`;
		logoContainer.style.left = `${
			finalPositions[isMobile ? 'mobile' : 'desktop'].left
		}px`;
		logoContainer.style.transform = isMobile
			? 'scale(0.2)'
			: `translate(-50%, -50%) scale(${logoScaleFactor.desktop})`;
		logoContainer.style.transformOrigin = isMobile
			? 'left top'
			: 'center center';

		// Show content after transition delay
		setTimeout(() => {
			content.style.opacity = '1';
			content.style.visibility = 'visible';
			header.style.opacity = '1';
		}, 500);
	}, 3000);

	// Handle window resize efficiently
	window.addEventListener('resize', () => {
		if (!logoContainer.style.transition) return;

		const isMobile = window.innerWidth < 1024;
		logoContainer.style.top = isMobile ? '30px' : `${window.innerHeight / 2}px`;
		logoContainer.style.left = isMobile
			? '20px'
			: `${window.innerWidth - 100}px`;
		logoContainer.style.transform = isMobile
			? 'scale(0.2)'
			: `translate(-50%, -50%) scale(${logoScaleFactor.desktop})`;
		logoContainer.style.transformOrigin = isMobile
			? 'left top'
			: 'center center';
	});

	// Handle newsletter form submission
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = document.getElementById('name').value;
		const email = document.getElementById('email').value;
		alert(`Thank you, ${name}! Your email (${email}) has been registered.`);
	});
});
