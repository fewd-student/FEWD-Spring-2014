
	// Wait for document to parse and render
	$(document).ready(function() {

		// Initialize plugin
		$(".tabs").myTabs({
			autoPlay: true
		});

		// Keyboard controled tabs
		var currentIndex = 0;
		$(window).on("keypress", function(e) {
			if (e.key == "Right") {
				currentIndex++;
			} else if (e.key == "Left") {
				currentIndex--;
			}

			if (currentIndex < 0) {
				currentIndex = 2;
			}

			if (currentIndex > 2) {
				currentIndex = 0;
			}

			$(".tabs").myTabs("activate", currentIndex);
		});

	});