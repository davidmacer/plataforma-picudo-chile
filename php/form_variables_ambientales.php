<?php

// Agrega el header para dar acceso al servidor en el puerto 8000 porque este archivo no está en este puerto
header("Access-Control-Allow-Origin: http://localhost:8000");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');

// Abre una conexion al servidor de pgsql
$connection=pg_connect ("host=localhost dbname=db_picudo_chile port=5432 user=postgres password=postgres");
if (!$connection) {
  die("No se ha podido establecer conexion con la bd.  ");
  exit;
}

$mes = $tmin = $tmax = $precip = "";
$mes = $_POST['mes'];
$tmin = $_POST['tmin'];
$tmax = $_POST['tmax'];
$precip = $_POST['precip'];

// Genera la consulta a la base de datos
$query = "SELECT st_asgeojson(geom), no_trampa, localidad, ubicacion, longitud, latitud, trampa_id FROM tabla_trampas;";

$result = pg_query($query);

if (!$result) {
  die("Invalid query: " . pg_error());
}

$data = array();
// Itera por los renglones
while ($row = @pg_fetch_assoc($result)){ 
  $renglon = array("no_trampa"=>$row['no_trampa'], "localidad"=>$row['localidad'], 
  "ubicacion"=>$row['ubicacion'], "longitud"=>$row['longitud'], "latitud"=>$row['latitud'], 
  "mes"=>$mes, "tmin"=>$tmin, "tmax"=>$tmax, "precip"=>$precip);
  array_push($data, $renglon);
}
    //returns data as JSON format
    echo json_encode($data);
?>
