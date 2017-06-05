<?php

include_once './database.php';
include_once './functions.php';

sec_session_start();

$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$payment_method = filter_input(INPUT_POST, 'payment', FILTER_SANITIZE_SPECIAL_CHARS);
$flight_id = (int) filter_input(INPUT_POST, 'flight_id', FILTER_SANITIZE_SPECIAL_CHARS);
$pax_number = (int) filter_input(INPUT_POST, 'pax', FILTER_SANITIZE_SPECIAL_CHARS);


$db = new Database();

$getRowNames = $db->getRows("SELECT * FROM tbl_customer WHERE email = ?", [$email]);

if (count($getRowNames) > 0) {
	$db->insertRow("INSERT INTO tbl_flight_customer (flight_id, customer_id, pax_number) VALUES (?, ?, ?)", [$flight_id, $getRowNames['0']['id'], $pax_number]);
} else {
	$db->insertRow("INSERT INTO tbl_customer (name, email, payment_method) VALUES (?, ?, ?)", [$name, $email, $payment_method]);

	$getRow = $db->getRows("SELECT id FROM tbl_customer WHERE email = ?", [$email]);

	$db->insertRow("INSERT INTO tbl_flight_customer (flight_id, customer_id, pax_number) VALUES (?, ?, ?)", [$flight_id, $getRow['0']['id'], $pax_number]);
}

$getAvailablility = $db->getRows("SELECT availability FROM tbl_flights WHERE id = ?", [$flight_id]);
$seats = (int) $getAvailablility['0']['availability'];
$newAvailability = $seats;

if ($seats >= $pax_number) {
	$newAvailability = $seats - $pax_number;

	$db->updateRow("UPDATE tbl_flights SET availability = ? WHERE id = ?", [ (string) $newAvailability, $flight_id]);
	$sendArray = array('booked' => TRUE, 'flight_id' => (string) $flight_id, 'availability' => (string) $newAvailability);
} else {
	$sendArray = array('booked' => FALSE, 'flight_id' => (string) $flight_id, 'availability' => (string) $newAvailability);
}


$json = json_encode($sendArray, JSON_FORCE_OBJECT);
echo $json;

exit(); 

?>