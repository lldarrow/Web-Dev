<?php
if(!empty($_REQUEST['password']))
{
    //In real life, probably do a user/pw lookup in DB
    if($_REQUEST['password'] == 'password' && $_REQUEST['username'] == 'username')
    {
        //note: CSV location should probably not exist in web-accessible folder
        header("Content-type: text/csv");
        header("Content-Disposition: attachment; filename=results.csv");
        header("Pragma: no-cache");
        header("Expires: 0");
        $contents = file_get_contents("results.csv");
        print $contents;
        echo "";
        exit();
    } else {
        echo "invalid login";
    }
}
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Get Results</title>
        <link href="style.css" rel="stylesheet" />
    </head>

    <body>
        <h1>Admin Login</h1>

        <form id="login-form" method="post" action="<?php print $_SERVER['PHP_SELF']; ?>">
            <p><label for="username-box">Username</label><br><input type='text' name='username' value=''><br></p>
            <p><label for="password-box">Password</label><br>
            <input type="password" name="password" id="password-box" /><br>
            <label></label><br><button type="submit">Export Results</button></p>
        </form>
    </body>
</html>