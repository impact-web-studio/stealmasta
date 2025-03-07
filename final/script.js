document.addEventListener('DOMContentLoaded', () => {
	// Logo Animations
	const logoInner = document.querySelector('.innerCrestLogo');
	const logoOuter = document.querySelector('.outerCrestLogo');
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
	logoInner.classList.add('floatFlicker');
	logoOuter.classList.add('floatFlicker');

	// Position configurations
	const finalPositions = {
		desktop: { left: window.innerWidth - 50, top: window.innerHeight / 2 },
		mobile: { left: 50, top: 46 },
	};

	// Start transition after delay
	setTimeout(() => {
		logoInner.classList.remove('floatFlicker');
		logoOuter.classList.remove('floatFlicker');
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

		logoContainer.classList.add('no-after');
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

	// Handle mouse movement
	function mouseTrackingParallax() {
		const trackingContainer = document.querySelector('main');

		if (!trackingContainer) {
			console.error('❌ Parallax container not found.');
			return;
		}

		const parallaxElement = document.querySelector('.innerCrestLogo');

		if (!parallaxElement) {
			console.error('❌ Parallax element not found.');
			return;
		}

		console.log('✅ Parallax effect initialized.');

		// Rotation variables
		let rotateX = 0,
			rotateY = 0,
			rotateZ = 0;
		let targetRotateX = 0,
			targetRotateY = 0,
			targetRotateZ = 0;
		let ticking = false;
		let isMouseOver = false;

		// Rotation limits
		const MAX_ROTATION = 8; // Maximum degrees of tilt
		const MAX_Z_ROTATION = 0.1; // Subtle roll effect

		// Perspective enhancement
		parallaxElement.style.transformStyle = 'preserve-3d';
		parallaxElement.style.transition = 'transform 0.1s ease-out';

		// Handle mouse movement
		trackingContainer.addEventListener(
			'mousemove',
			throttle((event) => {
				const { width, height, left, top } =
					trackingContainer.getBoundingClientRect();

				// Normalized mouse position (-1 to 1)
				const x = ((event.clientX - left) / width) * 2 - 1;
				const y = ((event.clientY - top) / height) * 2 - 1;

				// Corrected rotation mapping (opposite tilt)
				targetRotateX = -y * MAX_ROTATION;
				targetRotateY = x * MAX_ROTATION;
				targetRotateZ = -x * MAX_Z_ROTATION;

				isMouseOver = true;

				// Start animation loop if not already running
				if (!ticking) {
					ticking = true;
					requestAnimationFrame(updateTransform);
				}
			}, 16) // ~60FPS throttle
		);

		// Reset when mouse leaves
		trackingContainer.addEventListener('mouseleave', () => {
			targetRotateX = 0;
			targetRotateY = 0;
			targetRotateZ = 0;
			isMouseOver = false;

			// Ensure animation continues until fully reset
			if (!ticking) {
				ticking = true;
				requestAnimationFrame(updateTransform);
			}
		});

		// Smooth transition effect using damping
		function updateTransform() {
			const dampingFactor = 0.1; // Smoothness control

			rotateX += (targetRotateX - rotateX) * dampingFactor;
			rotateY += (targetRotateY - rotateY) * dampingFactor;
			rotateZ += (targetRotateZ - rotateZ) * dampingFactor;

			// Apply transformation
			parallaxElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;

			// Continue updating if movement is ongoing or resetting
			if (
				Math.abs(targetRotateX - rotateX) > 0.1 ||
				Math.abs(targetRotateY - rotateY) > 0.1 ||
				Math.abs(targetRotateZ - rotateZ) > 0.1
			) {
				requestAnimationFrame(updateTransform);
			} else {
				ticking = false;
			}
		}
	}

	// Throttle function to limit event frequency
	function throttle(callback, limit) {
		let lastCall = 0;
		return function (...args) {
			const now = performance.now();
			if (now - lastCall >= limit) {
				lastCall = now;
				callback.apply(this, args);
			}
		};
	}

	mouseTrackingParallax();

	// Handle newsletter form submission
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = document.getElementById('name').value;
		const email = document.getElementById('email').value;
		alert(`Thank you, ${name}! Your email (${email}) has been registered.`);
	});
});
