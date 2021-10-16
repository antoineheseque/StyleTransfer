<?php

class Process{

    static function processImg(){

        /////IMG UPLOAD/////
        
        if(isset($_FILES['file']['name'])){

            // file name
            $filename = $_FILES['file']['name'];
                        
            // Location
            $location = '../img/'.$filename;
                        
            // file extension
            $file_extension = pathinfo($location, PATHINFO_EXTENSION);
            $file_extension = strtolower($file_extension);
                        
            // Valid extensions
            $valid_ext = array("png","jpg","jpeg");
                     
            // $response = 0;
            if(in_array($file_extension,$valid_ext)){
                // Upload file
                if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
                    // $response = 1;
                } 
            }
            
            // $answer=[$filename,$response];
            // echo json_encode($answer); 
            exit;
        }
        
    }
}

?>