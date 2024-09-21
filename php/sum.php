<?php

// Check if the filename is provided as an argument
if ($_SERVER['argc'] < 2) {
    echo "Please provide the filename as an argument.\n";
    exit(1);
}

// Get the filename from the command line argument
$filename = $_SERVER['argv'][1];

// Initialize the sum arrays with zeros
$cal = 0;
$p = 0;
$c = 0;
$f = 0;

// Read the contents of the file
$lines = file($filename, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

// Loop through each 1x4 matrix and add their values to the sum arrays
foreach ($lines as $line) {
    // Remove brackets and split line by commas
    $line = trim($line, "[]");
    $parts = explode(", ", $line);

    // Extract the last 4 values
    $cal += (int)$parts[2];
    $p += (int)$parts[3];
    $c += (int)$parts[4];
    $f += (int)$parts[5];
}

// Output the summed matrices
echo "Total Cal: $cal\n";
echo "Total P: $p\n";
echo "Total C: $c\n";
echo "Total F: $f\n";

?>

