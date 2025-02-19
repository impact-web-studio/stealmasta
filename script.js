document.addEventListener('DOMContentLoaded', function () {
	function mouseTrackingDropShadow() {
		const svg = document.querySelector('svg');

		if (!svg) {
			console.error('❌ SVG element not found.');
			return;
		}

		console.log('✅ SVG detected, initializing effect...');

		function updateShadow(event) {
			const svgRect = svg.getBoundingClientRect();
			const centerX = svgRect.left + svgRect.width / 2;
			const centerY = svgRect.top + svgRect.height / 2;

			const mouseX = event.clientX;
			const mouseY = event.clientY;

			// Calculate the angle between the mouse and the SVG center
			const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
			const shadowX = Math.cos(angle) * 10; // Adjust shadow strength
			const shadowY = Math.sin(angle) * 10;

			console.log(
				`📌 Mouse: (${mouseX}, ${mouseY}) | Angle: ${angle.toFixed(
					2
				)} rad | Shadow Offset: (${shadowX.toFixed(1)}, ${shadowY.toFixed(1)})`
			);

			// Apply drop shadow dynamically
			svg.style.filter = `drop-shadow(${shadowX}px ${shadowY}px 10px rgba(255, 255, 255, 1))`;
		}

		window.addEventListener('mousemove', updateShadow);
	}

	function parallaxEffect() {
		const parallaxContainer = document.querySelector('.parallax');
		const parallaxElement = parallaxContainer.querySelector('.stacked-svgs');

		if (!parallaxElement) return;

		parallaxContainer.addEventListener('mousemove', (event) => {
			const { width, height, left, top } =
				parallaxContainer.getBoundingClientRect();

			// Get mouse position relative to the center of the container
			const x = (event.clientX - left - width / 2) / width;
			const y = (event.clientY - top - height / 2) / height;

			// Adjust rotation values for a more dramatic effect
			const rotateX = y * 100; // Increase intensity
			const rotateY = x * -100;

			parallaxElement.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
		});

		parallaxContainer.addEventListener('mouseleave', () => {
			// Reset rotation when mouse leaves
			parallaxElement.style.transform = 'rotateX(0deg) rotateY(0deg)';
		});
	}

	// Run the functions

	mouseTrackingDropShadow();
	parallaxEffect();
});
