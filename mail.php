<?php

$recepient = "your.mail@here.com";
$sitename = "Fabrice DUJARDIN";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$text = trim($_POST["text"]);
$message = "Name: $name \nEmail: $email \nText: $text";

$pagetitle = "New message from the \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
