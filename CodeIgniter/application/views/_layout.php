<!doctype html>
<html>
<head>
    <title>CptS 483</title>
    <meta charset="UTF-8" />
    <script type="text/javascript" src="<?php print base_url('/content/js/jquery-2.2.1.min.js'); ?>"></script>
    <link rel="stylesheet" type="text/css" href="<?php print base_url('/content/css/site.css'); ?>" />
    <?php foreach($scripts as $script): ?>
    <script type="text/javascript" src="<?= base_url('/content/js') . '/' . $script;?>"></script>
    <?php endforeach; ?>
    <?php foreach($styles as $style): ?>
    <link rel="stylesheet" type="text/css" href="<?= base_ur('/content/css') . '/' . $style; ?>" />
    <?php endforeach; ?>
</head>
<body id="body">
<?php foreach($body as $view)
{
    $this->load->view($view);
}
?>
</body>
</html>