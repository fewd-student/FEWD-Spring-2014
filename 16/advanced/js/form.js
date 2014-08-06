
	$(document).ready(function() {

		$("#form").on("submit", onSubmit);

	});

	function onSubmit(e) {
		e.preventDefault();

		var $form = $(this),
			url = $form.attr("action"),
			data = $form.serialize();

		$form.find(".button").prop("disabled", true);

		$form.find(".fieldset").removeClass("error");

		$.ajax({
			url: url,
			type: "POST",
			data: data + "&ajax=true",
			success: function(response) {
				if (response.indexOf("sent") > -1) {

					$form.replaceWith("<p>Thanks!</p>");

				} else {
					var errors = JSON.parse(response);

					for (var i in errors) {
						$form.find("[name='" + errors[i] + "']").parents(".fieldset").addClass("error");
					}
				}

				$form.find(".button").prop("disabled", false);
			},
			error: function() {

			}
		});
	}





















/*
	function onSubmit(e) {
		e.preventDefault();

		var $form = $(this),
			url = $form.attr("action"),
			data = $form.serialize();

		$form.find(".button").prop("disabled", true);

		$.ajax({
			url: url,
			type: "post",
			data: data + "&ajax=true",
			success: function(response) {
				if (response.indexOf("sent") < 0) {
					var errors = JSON.parse(response);

					for (var i in errors) {
						$form.find("[name='" + errors[i] + "']").parent(".fieldset").addClass("error");
					}
				} else {
					console.log( "sent!" );
				}

				$form.find(".button").prop("disabled", false);
			},
			error: function() {
				$form.find(".button").prop("disabled", false);
			}
		});
	}
*/