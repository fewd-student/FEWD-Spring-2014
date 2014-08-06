<?

	foreach ($_POST as $key => $val) {
		$$key = $val;
	}

	$errors = array();

	if (trim($name) == "") {
		$errors[] = "name";
	}

	if (trim($email) == "") {
		$errors[] = "email";
	}

	if (trim($message) == "") {
		$errors[] = "message";
	}

	if (count($errors) == 0) {
		$body = "Date: " . date("Y-m-d H:i:s") . "\r\n";
		$body .= "Name: " . $name . "\r\n";
		$body .= "Email: " . $email . "\r\n";
		$body .= "Message: " . $message . "\r\n";

		mail("mr@benplum.com", "Contact Form", $body);

		if ($ajax) {
			die("sent");
		}

		$_SESSION["sent"] = true;
	} else {
		if ($ajax) {
			echo json_encode($errors);
			die();
		}

		$_SESSION["errors"] = $errors;
	}

	header("Location: " . $return);
	die();

?>