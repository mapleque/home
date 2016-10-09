<?php
$base64 = $_POST['base64'];
if (isset($base64)) {
	$img = base64_decode($base64);
	$file_name = 'tmp';
	Header("Content-type: application/octet-stream");
	Header("Content-Disposition: attachment; filename=" . $file_name);
	echo $img;
}
?>
<!doctype html>
<meta charset='utf-8'>
<title>base64 to image file</title>
<h1>base64 to image file</h1>
<p>input your base64 string, submit and download.
<form method='post'>
	<p><textarea name='base64' rows='30' cols='50' placeholder='base64'></textarea>
	<p><input type='submit' value='download'>
</form>
<p>change the filename extension.
