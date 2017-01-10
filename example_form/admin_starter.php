<?php

//note: CSV location should probably not exist in web-accessible folder
header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=data.csv");
header("Pragma: no-cache");
header("Expires: 0");
$contents = file_get_contents("data.csv");
print $contents;
exit();
?>