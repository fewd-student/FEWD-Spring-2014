// MyTabs Plugin
;(function ($, window) {

	// Public methods
	var pub = {
		// Activate tab
		// usage: $(".tabs").myTabs("activate", 2);
		activate: function(index) {
			// Cache all plugin instances
			var $target = $(this);

			// Loop through all instances
			$target.each(function() {
				var $this = $(this);
				// Query for cached data
				var data = $this.data("my-tabs");

				// Update tabs
				data.$links.removeClass("active").eq(index).addClass("active");
				data.$content.removeClass("active").eq(index).addClass("active");
			});
		}
	};

	// Initialization
	function _init(opts) {
		// Cache all plugin instances
		var $target = $(this);

		// Extend options
		opts = $.extend({}, options, opts);

		// Loop through all instances
		$target.each(function() {
			var $this = $(this);

			// Cache elements as data
			var data = {
				$links: $this.find(".tab-nav .tab"),
				$content: $this.find(".tab-content .tab")
			};

			// Bind events and store cached data for use later on
			$this.on("click", ".tab-nav .tab", data, onTabClick).data("my-tabs", data);
		});
	}

	// Handle tab clicks
	function onTabClick(event) {
		// Prevent normal link action
		event.preventDefault();

		// Cahce variables
		var $target = $(event.target);
		var data = event.data;
		var index = data.$links.index($target);

		// Update tabs
		data.$links.removeClass("active").eq(index).addClass("active");
		data.$content.removeClass("active").eq(index).addClass("active");
	}

	// Define plugin
	$.fn.myTabs = function(method) {
		if (pub[method]) {
			// Delegate method (if found)
			return pub[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			// Initialize plugin
			return _init.apply(this, arguments);
		}
		// Maintain chain-ability
		return this;
	};
})(jQuery, this);