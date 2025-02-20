document.addEventListener('DOMContentLoaded', function () {
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

	// Run the function
	parallaxEffect();
});
