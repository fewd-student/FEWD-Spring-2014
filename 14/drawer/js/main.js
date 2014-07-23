	var $body;
	var $handle;

	$(document).ready(function() {
		$body = $("body");
		$handle = $(".header .handle");

		$handle.on("click", toggleDrawer);
	});

	function toggleDrawer(event) {
		$body.toggleClass("drawer_open");
	}