<div class="row subpage">
	<div class="mobile-full tablet-full desktop-8 desktop-push-2">
		<h1>Support</h1>

		<?
			if ($_SESSION["sent"]) {
		?>
		<p>Thanks!</p>
		<?
			} else {
		?>
		<form action="<?=$www_root?>ajax/send-mail/#form" method="POST" id="form" class="form">
			<input type="hidden" name="return" value="<?=$www_root?>support/">

			<fieldset class="fieldset <? if (in_array("name", $_SESSION["errors"])) echo 'error' ?>">
				<label class="label">Name</label>
				<input type="text" name="name" class="input">
			</fieldset>

			<fieldset class="fieldset <? if (in_array("email", $_SESSION["errors"])) echo 'error' ?>">
				<label class="label">Email</label>
				<input type="text" name="email" class="input">
			</fieldset>

			<fieldset class="fieldset <? if (in_array("message", $_SESSION["errors"])) echo 'error' ?>">
				<label class="label">Message</label>
				<textarea name="message" class="input textarea"></textarea>
			</fieldset>
			<input type="submit" value="Send" class="button">
		</form>
		<?
			}
		?>

	</div>
</div>
<?

	unset($_SESSION["errors"]);
	unset($_SESSION["sent"]);

?>