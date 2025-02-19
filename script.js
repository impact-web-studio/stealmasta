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

	mouseTrackingDropShadow();
});
