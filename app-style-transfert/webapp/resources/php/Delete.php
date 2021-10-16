<?php

// Folder path to be flushed
$folder_path = "../img";
   
// List of name of files inside
// specified folder
$files = glob($folder_path.'/*'); 

var_dump($files);

// Deleting all the files in the list
foreach($files as $file) {
   
    if(is_file($file)) 
    
        // Delete the given file
        unlink($file); 
}     

?>