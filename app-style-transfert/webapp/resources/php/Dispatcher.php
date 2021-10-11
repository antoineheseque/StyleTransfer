<?php

//test
$_POST['action']='process';
//

//includes
include('ImgProcessing.php');
//

if(isset($_POST['action'])){

    switch($_POST['action']){

        case 'process':
            Process::processImg();
            break;
            
    }
}



?>