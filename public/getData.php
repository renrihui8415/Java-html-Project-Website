<?php

// database settings
$db = null;
$db_engine = 'mysql';
$host = 'localhost';
$charset = 'utf8';

$db_user = 'YOUR_USER';
$db_password = 'YOUR_PASSWORD';
$db_base = 'YOUR_DATABASE';
$dsn = "mysql:host=$host;dbname=$db_base;charset=$charset";

// Connection to our database
try{

    $dsn = "mysql:host=$host;dbname=$db_base;charset=$charset";
    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ,
        PDO::ATTR_EMULATE_PREPARES   => true,
    ];
    $db = new PDO($dsn, $db_user, $db_password, $options);

}catch (PDOException $e){
     print(json_encode(array('outcome' => false, 'message' => 'Unable to connect')));
}

// Get all my users
function getFullListOfUsers($dbh)
{
    $request = $dbh->prepare( "SELECT * FROM it_users WHERE user_subs_time > 2015-12 OR user_subs_time <= 2016-12 " );
    return $request->execute() ?  $request->fetchAll() : null;
}

$users = getFullListOfUsers($db);

// I want data for just some months
$months = ['Jan' => 0, 'Feb' => 0, 'Mar' => 0, 'Apr' => 0, 'May' => 0, 'Jun' => 0];

// Look for subscribers for each month
foreach ($users as $user) {
    if (array_key_exists(date('M', $user->user_subs_time), $months)) {
        $months[date('M', $user->user_subs_time)] ++;
    }
}

// List of the chart rows
$rows = [];

// Create rows for each month
foreach ($months as $key => $value) {
     $rows[] =  ['c' => 
                        [
                          ['v' => $key],
                          ['v' => $value, 'f' => 'Share']
                        ]
                ];
}

// Structure data for google visualization API 
$data = [

     'cols' => [
            ['1', 'Months', 'type' => 'string'],
            ['2',  'Subscriptions', 'type' => 'number']
      ],
      'rows' => $rows

];

header('Content-Type: application/json');
echo json_encode($data);