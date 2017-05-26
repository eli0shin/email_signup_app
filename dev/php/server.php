<?
$con = mysql_connect('localhost','root','') or die('couldn\'t connect.');
mysql_select_db ('alcohol');

if($_SERVER['REQUEST_METHOD'] == 'POST'){
	if(isset($_REQUEST['EMAIL'])){
		$email = htmlentities($_REQUEST['email'],ENT_QUOTES);
	}
	else{
		exit();
	}

	$sql = "INSERT INTO subscribers (email) VALUES ('$email')";
	mysql_query($sql) or die(mysql_error());

}

if($_SERVER['REQUEST_METHOD'] == 'GET'){
	getSubscribers();
}

function getSubscribers(){
	$sql = "SELECT * FROM subscribers ORDER BY _id ASC";
	$result = mysql_query($sql) or die(mysql_error());
	$x = 0;
	$emailArr = array();
	while($myrow = mysql_fetch_array($result)){
		$tmpArr['EMAIL'] = $myrow['EMAIL'];
		array_push($emailArr,$tmpArr);
	}
	array_to_csv_download($emailArr);
}

function array_to_csv_download($array, $filename = "export.csv", $delimiter=";") {
    // open raw memory as file so no temp files needed, you might run out of memory though
    $f = fopen('php://memory', 'w');
    // loop over the input array
    foreach ($array as $line) {
        // generate csv lines from the inner arrays
        fputcsv($f, $line, $delimiter);
    }
    // reset the file pointer to the start of the file
    fseek($f, 0);
    // tell the browser it's going to be a csv file
    header('Content-Type: application/csv');
    // tell the browser we want to save it instead of displaying it
    header('Content-Disposition: attachment; filename="'.$filename.'";');
    // make php send the generated csv lines to the browser
    fpassthru($f);
}

?>
