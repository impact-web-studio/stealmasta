document.addEventListener('DOMContentLoaded', function () {
	function mouseTrackingParallax() {
		const trackingContainer = document.querySelector('.parallax-container');

		if (!trackingContainer) {
			console.error('❌ Parallax container not found.');
			return;
		}

		const parallaxElement =
			trackingContainer.querySelector('.parallax-element');

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
		const MAX_ROTATION = 20; // Maximum degrees of tilt
		const MAX_Z_ROTATION = 10; // Subtle roll effect

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
			parallaxElement.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;

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
});
