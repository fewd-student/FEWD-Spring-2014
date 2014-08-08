;(function ($, window) {

	// Public methods
	var $window,
		$instances,
		scrollTop = 0,
		windowHeight = 0,
		initialized = false,
		pub = {},
		options = {};

	// Initialization
	function _init(opts) {
		var $this = $(this);

		opts = $.extend({}, options, opts);

		for (var i = 0, count = $this.length; i < count; i++) {
			build($this.eq(i), opts);
		}

		$instances = $(".plaxed");

		if (!initialized) {
			initalized = true;
			$window = $(window);
			$window.on("scroll.plax", onScroll)
				   .on("resize.plax", onResize)
				   .trigger("resize.plax");
		}

		return $this;
	}

	function build($this, opts) {
		if (!$this.hasClass("plaxed")) {
			$this.addClass("plaxed");

			var data = $.extend({
				$target: $this,
				$content: $this.find(".plax-content")
			}, opts);

			$this.data("plax", data);
		}
	}

	function onScroll() {
		scrollTop = $window.scrollTop();

		for (var i = 0, count = $instances.length; i < count; i++) {
			var data = $instances.eq(i).data("plax");

			if (data) {
				var pos = windowHeight - ((scrollTop + windowHeight) - data.offset.top) * data.velocity;

				data.$target.css({
					backgroundPosition: "center " + pos + "px"
				});

				var pos = ((scrollTop + windowHeight) - data.offset.top + data.contentHeight) / data.velocity / 2;

				if (pos < data.contentTop)    pos = data.contentTop;
				if (pos > data.contentbottom) pos = data.contentbottom;

				data.$content.css({
					top: pos
				});
			}
		}
	}

	function onResize() {
		windowHeight = $window.height();

		for (var i = 0, count = $instances.length; i < count; i++) {
			var data = $instances.eq(i).data("plax");

			if (data) {
				data.velocity = 1.25;
				data.height = windowHeight;
				data.bgHeight = windowHeight * 2;
				data.offset = data.$target.offset();
				data.position = data.$target.position();

				data.contentHeight = data.$content.outerHeight();
				data.contentTop = 0;
				data.contentBottom = data.height - data.contentHeight;

				data.$target.css({
					height: windowHeight,
					backgroundSize: "auto " + data.bgHeight + "px"
				});
			}
		}

		onScroll();
	}

	// Define plugin
	$.fn.plax = function(method) {
		if (pub[method]) {
			return pub[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return _init.apply(this, arguments);
		}
		return this;
	};
})(jQuery, this);