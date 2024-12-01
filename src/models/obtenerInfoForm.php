<?php
require_once 'conexion.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

try {
    $objetoConexion = new Conexion();
    $conn = $objetoConexion->conectar();
    $sql = "SELECT * FROM cambios";

    $result = $conn->prepare($sql);
    $result->execute();

    $data = $result->fetchAll(PDO::FETCH_ASSOC);

    $dataJson = json_encode($data);

    echo $dataJson;

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
