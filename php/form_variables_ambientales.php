<?php 
// Abre una conexion al servidor de pgsql
$connection=pg_connect ("host=localhost dbname=db_picudo_chile port=5432 user=postgres password=postgres");
// if (!$connection) {
//     echo "No establecí contacto con la BD"
// }

$mes = $_POST['mes'];
// $tmax = $_POST['tmax'];
// $tmin = $_POST['tmax'];
// $precip = $_POST['pr'];

// Genera la consulta a la base de datos
$query = "SELECT st_asgeojson(geom), st_asgeojson(geom), no_trampa, localidad, ubicacion, longitud, latitud, trampa_id
FROM tabla_trampas";

echo $query;

$result = pg_query($query);

if (!$result) {
  die("Invalid query: " . pg_error());
}

// $data = array();
// // Itera por los renglones
// while ($row = @pg_fetch_assoc($result)){ 
//   $renglon = array("nombre"=>$row['nombre'],"tipo"=>$row['tipo'],"delmun"=>$row['delmun'],"entidad"=>$row['entidad'],"sector"=>$row['sector'],"rama"=>$row['rama'],"clase"=>$row['clase']);
//   array_push($data,$renglon);
// }
//     //returns data as JSON format
//     echo json_encode($data);
?>
