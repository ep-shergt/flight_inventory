<?php

include_once './database.php';
include_once './functions.php';

sec_session_start();

$id = (int) filter_input(INPUT_POST, 'id', FILTER_SANITIZE_SPECIAL_CHARS);

$db = new Database();

$db->deleteRow("DELETE FROM tbl_flights WHERE id = ?", [$id]);

$sendArray = array('flightDeleted' => TRUE, 'flight_id' => (string) $id);
$json = json_encode($sendArray, JSON_FORCE_OBJECT);
echo $json;

exit(); 

?>