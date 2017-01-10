<?php
if(isset($_POST['submit'])){

    //collect form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $major = $_POST['major'];
    $standing = $_POST['standing'];
    $graduation = $_POST['graduation'];
    $monday = $_POST['monday'];
    $tuesday = $_POST['tuesday'];
    $wednesday = $_POST['wednesday'];
    $thursday = $_POST['thursday'];
    $friday = $_POST['friday'];
    $saturday = $_POST['saturday'];
    $sunday = $_POST['sunday'];

    $monday_times = $_POST['monday_times'];
    $tuesday_times = $_POST['tuesday_times'];
    $wednesday_times = $_POST['wednesday_times'];
    $thursday_times = $_POST['thursday_times'];
    $friday_times = $_POST['friday_times'];
    $saturday_times = $_POST['saturday_times'];
    $sunday_times = $_POST['sunday_times'];

    //check name is set
    if($name == ''){
        $error[] = 'Name is required';
    }
    else if (!preg_match('/[a-zA-Z] [a-zA-Z]/', $name)) {
        $error[] = 'Please include first and last name';
    }

    //check for a valid email address
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
         $error[] = 'Please enter a valid email address';
    }

    //check for valid phone number
    if($phone == '') {
        $error[] = 'Phone number is required';
    }
    else if (!preg_match( '/^[+]?([\d]{0,3})?[\(\.\-\s]?([\d]{3})[\)\.\-\s]*([\d]{3})[\.\-\s]?([\d]{4})$/', $phone )) {
        $error[] = 'Please include a valid phone number';
    }

    //check for valid major
    if($major == '') {
        $error[] = 'Major is required';
    }
    else if (!preg_match('/[a-zA-Z]{1,}/', $name)) {
        $error[] = 'Please include a valid major without numbers or symbols';
    }

    //check for valid class standing
    if($standing == '' || $standing == 'Select...') {
        $error[] = 'Standing is required';
    }

    //check for valid graduation date
    if($graduation == '') {
        $error[] = 'Graduation is required';
    }
    else if (!preg_match('/[0-9]{1,}/', $graduation)) {
        $error[] = 'Please include a valid graduation date without letters or symbols';
    }

    //don't check on the checkboxes since they could be not available on any day

    //if no errors carry on
    if(!isset($error)){

        # Title of the CSV
        //$Content = "Name, Email, Phone, Major, Standing, Graduation\n";

        $Days = "";

        //set days available
        if($monday == 'Yes') {
            $Days .= "Mon: ";
            $Days .= $monday_times;
            $Days .= " ";
        }

        if($tuesday == 'Yes') {
            $Days .= "Tue: ";
            $Days .= $tuesday_times;
            $Days .= " ";
        }

        if($wednesday == 'Yes') {
            $Days .= "Wed: ";
            $Days .= $wednesday_times;
            $Days .= " ";
        }

        if($thursday == 'Yes') {
            $Days .= "Thu: ";
            $Days .= $thursday_times;
            $Days .= " ";
        }

        if($friday == 'Yes') {
            $Days .= "Fri: ";
            $Days .= $friday_times;
            $Days .= " ";
        }

        if($saturday == 'Yes') {
            $Days .= "Sat: ";
            $Days .= $saturday_times;
            $Days .= " ";
        }

        if($sunday == 'Yes') {
            $Days .= "Sun: ";
            $Days .= $sunday_times;
            $Days .= " ";
        }

        //set the data of the CSV
        $Content = "$name, $email, $phone, $major, $standing, $graduation, $Days\n";

        # set the file name and create CSV file
        //$FileName = "results.csv";
        //header('Content-Type: application/csv'); 
        //header('Content-Disposition: attachment; filename="' . $FileName . '"'); 
        //echo $Content;

        $fp = fopen("results.csv", "a");
        //write to the file
        fwrite($fp, $Content);
        fclose($fp);
        echo "Survey Results Successfully Sent";

        //exit();
    }
}

//if their are errors display them
if(isset($error)){
    foreach($error as $error){
        echo "<p style='color:#ff0000'>$error</p>";
    }
}
?> 

<!DOCTYPE html>
<html>
    <head>
        <title>Cougar Club Survey</title>
        <link href="style.css" rel="stylesheet" />
        <meta charset="utf-8" />
    </head>
    <h1>Cougar Club Survey</h1><a id="admin_link" href="login.php" position="absolute">Admin</a>
    <h2>This is fake survey made by Luke Darrow for WebDev</h2>
    
    <div id="cougar"><img src="cougars.png"></img></div>

    <div id="survey">
        <form action='' method='post'>
            <p><label>Name</label><br><input type='text' name='name' value=''></p> 
            <p><label>Email</label><br><input type='text' name='email' value=''></p> 
            <p><label>Phone</label><br><input type='text' name='phone' value=''></p> 
            <p><label>Major</label><br><input type='text' name='major' value=''></p> 
            <p><label>Class Standing</label><br>
                <select name="standing" font-size="12px">
                    <option value="">Select...</option>
                    <option value="freshman">Freshman</option>
                    <option value="sophmore">Sophmore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                </select>
            </p>
            <p><label>Expected Graduation</label><br><input type='text' name='graduation' value=''></p> 
            <p><label>Available Times</label><br><label></label><br>
                <input type='text' name='monday_times' value='hours'><input id='check' type='checkbox' name='monday' value='Yes'>Monday<br>
                <input type='text' name='tuesday_times' value='hours'><input id='check' type='checkbox' name='tuesday' value='Yes'>Tuesday<br>
                <input type='text' name='wednesday_times' value='hours'><input id='check' type='checkbox' name='wednesday' value='Yes'>Wednesday<br>
                <input type='text' name='thursday_times' value='hours'><input id='check' type='checkbox' name='thursday' value='Yes'>Thursday<br>
                <input type='text' name='friday_times' value='hours'><input id='check' type='checkbox' name='friday' value='Yes'>Friday<br>
                <input type='text' name='saturday_times' value='hours'><input id='check' type='checkbox' name='saturday' value='Yes'>Saturday<br>
                <input type='text' name='sunday_times' value='hours'><input id='check' type='checkbox' name='sunday' value='Yes'>Sunday<br>
            </p>
            <p><input type='submit' name='submit' value='Submit'></p> 
        </form>
    </diiv>

</html>