<?php

include_once './database.php';
include_once './functions.php';

sec_session_start();

$origin = filter_input(INPUT_POST, 'origin', FILTER_SANITIZE_SPECIAL_CHARS);
$destination = filter_input(INPUT_POST, 'destination', FILTER_SANITIZE_SPECIAL_CHARS);
$departure = strtotime(filter_input(INPUT_POST, 'departure', FILTER_SANITIZE_SPECIAL_CHARS));
$departure_date = date('m/d/Y', $departure);
$departure_time = date('H:i:s', $departure);
$arrival = strtotime(filter_input(INPUT_POST, 'arrival', FILTER_SANITIZE_SPECIAL_CHARS));
$arrival_date = date('m/d/Y', $arrival);
$arrival_time = date('H:i:s', $arrival);
$airline = filter_input(INPUT_POST, 'airline', FILTER_SANITIZE_SPECIAL_CHARS);
$aircraft = filter_input(INPUT_POST, 'aircraft', FILTER_SANITIZE_SPECIAL_CHARS);
$flight_number = filter_input(INPUT_POST, 'flightnumber', FILTER_SANITIZE_SPECIAL_CHARS);
$availability = filter_input(INPUT_POST, 'availability', FILTER_SANITIZE_SPECIAL_CHARS);
$price_per_pax = filter_input(INPUT_POST, 'priceperpax', FILTER_SANITIZE_SPECIAL_CHARS);

$searchParams = array();

$valueCounter = 0;

foreach ($_POST as $key => $value) {
	if ($value == "") {
		$valueCounter++;
	}
}

if ($valueCounter == 9) {
	$db = new Database();

	$getAll = $db->getRows("SELECT * FROM tbl_flights", []);

	$sendArray = array('results' => $getAll);
	$json = json_encode($sendArray, JSON_FORCE_OBJECT);
	echo $json;

	exit(); 
}

foreach ($_POST as $key => $value) {
	if ($value != '' && $key != 'priceperpax' && $key != 'availability' && $key != 'flightnumber') {
		if ($key == 'departure' || $key == 'arrival') {
			$date = date('m/d/Y', strtotime($value));
			//$time = date('H:i:s', $value);

			$searchParams[$key . '_date'] = $date;
			//$searchParams[$key . '_time'] = $time;
		} else {
			$searchParams[$key] = $value;
		}
	}
}

$counter = 1;
$selectStr = '';
$whereStr = '';
$paramArray = array();

foreach ($searchParams as $key => $value) {
	if ($counter < sizeof($searchParams)) {
		$selectStr = $selectStr . $key . ', '; 
		$whereStr = $whereStr . $key . ' = ? AND ';
	} else {
		$selectStr = $selectStr . $key;
		$whereStr = $whereStr . $key . ' = ?';
	}
	array_push($paramArray, $value);
	$counter++;
}

$sqlString = "SELECT * FROM tbl_flights WHERE " . $whereStr;

$db = new Database();

$getRowNames = $db->getRows($sqlString, $paramArray);

$sendArray = array('results' => $getRowNames);
$json = json_encode($sendArray, JSON_FORCE_OBJECT);
echo $json;

exit(); 

?>