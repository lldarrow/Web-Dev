<?php
$form_action = site_url(array('account', 'processLogin'));
?>
<div>
    <?php if(!empty($errors)){print $errors; }?>
</div>
<form method="post" action="<?= $form_action; ?>">
    <div>
    <label for="user-name">User Name:</label>
    <input type="text" id="user-name" name="user_name" />
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" />
    </div>
    <div>
        <button type="submit">Log In</button>
    </div>
</form>
