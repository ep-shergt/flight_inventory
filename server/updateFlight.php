<?php

include_once './database.php';
include_once './functions.php';

sec_session_start();

$origin = filter_input(INPUT_POST, 'origin', FILTER_SANITIZE_SPECIAL_CHARS);
$destination = filter_input(INPUT_POST, 'destination', FILTER_SANITIZE_SPECIAL_CHARS);
$departure = strtotime(filter_input(INPUT_POST, 'departure', FILTER_SANITIZE_SPECIAL_CHARS));
$departureDate = date('m/d/Y', $departure);
$departureTime = date('H:i:s', $departure);
$arrival = strtotime(filter_input(INPUT_POST, 'arrival', FILTER_SANITIZE_SPECIAL_CHARS));
$arrivalDate = date('m/d/Y', $arrival);
$arrivalTime = date('H:i:s', $arrival);
$airline = filter_input(INPUT_POST, 'airline', FILTER_SANITIZE_SPECIAL_CHARS);
$aircraft = filter_input(INPUT_POST, 'aircraft', FILTER_SANITIZE_SPECIAL_CHARS);
$flightnumber = filter_input(INPUT_POST, 'flightnumber', FILTER_SANITIZE_SPECIAL_CHARS);
$availability = filter_input(INPUT_POST, 'availability', FILTER_SANITIZE_SPECIAL_CHARS);
$priceperpax = filter_input(INPUT_POST, 'priceperpax', FILTER_SANITIZE_SPECIAL_CHARS);
$id = (int) filter_input(INPUT_POST, 'id', FILTER_SANITIZE_SPECIAL_CHARS);

$db = new Database();

$db->updateRow("UPDATE tbl_flights SET origin = ?, destination = ?, departure_date = ?, departure_time = ?, arrival_date = ?, arrival_time = ?, airline = ?, aircraft = ?, flight_number = ?, availability = ?, price_per_pax = ? WHERE id = ?", [$origin, $destination, $departureDate, $departureTime, $arrivalDate, $arrivalTime, $airline, $aircraft, $flightnumber, $availability, $priceperpax, $id]);

$sendArray = array('flightUpdated' => TRUE, 'flightData' => $_POST);

$json = json_encode($sendArray, JSON_FORCE_OBJECT);
echo $json;

exit(); 

?>