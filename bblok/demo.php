<?php

//simple script to handle demo file
if ($_SERVER["REQUEST_METHOD"] == "POST") {

	var_dump($_POST);

	// var_dump($_POST["body"]);
	$content = $_POST["data"];

	//flag
	$list = $_POST["list"];   //boolean = list project tutorial
	$mode = $_POST["mode"];	  //string

	if ($mode == "dev") {
		// echo "dev mode";

		// if ($data == "judul") {
		// 	echo "list mode";
		// 	$myfile = fopen("./editor/web/tut/dlist.json", "w") or die("Unable to open file!");
		// 	fwrite($myfile, $content);
		// 	fclose($myfile);
		// }
		// else if ($data == "isi") {
		// 	echo "data mode";

		// 	$id = $_POST["id"];       //project id tutorial
		// 	echo "tut mode";
		// 	$myfile = fopen("./editor/web/tut/d". $id .".js", "w") or die("Unable to open file!");
		// 	fwrite($myfile, $content);
		// 	fclose($myfile);
		// }
		// else {
		// 	die("invalid data " . $data);
		// }
	} 
	else if ($mode == "tut") {
		if ($list == "true") {
			echo "tut list mode";
			$myfile = fopen("./editor/src/List.ts", "w") or die("Unable to open file!");
			fwrite($myfile, $content);
			fclose($myfile);
		}
		else if ($list == "false") {
			$id = $_POST["id"];       //project id tutorial
			echo "tut data mode";
			$myfile = fopen("./editor/build/tut/p". $id .".js", "w") or die("Unable to open file!");
			fwrite($myfile, $content);
			fclose($myfile);
		}
	}
	else {
		die ("mode error: " . $mode);
	}
} else {
	die ("request error: ");
	var_dump($_SERVER["REQUEST_METHOD"]);
}
?>
