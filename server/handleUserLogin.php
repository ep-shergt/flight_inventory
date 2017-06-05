<?php

include_once './database.php';
include_once './functions.php';

sec_session_start();

$username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_SPECIAL_CHARS);
$password = md5(filter_input(INPUT_POST, 'password', FILTER_SANITIZE_SPECIAL_CHARS));

$db = new Database();

$getRowNames = $db->getRows("SELECT user, password FROM tbl_admin WHERE user = ?
							 AND password = ?", [$username, $password]);

$sendArray = array('user' => count($getRowNames));
$json = json_encode($sendArray, JSON_FORCE_OBJECT);
echo $json;

exit(); 

?>