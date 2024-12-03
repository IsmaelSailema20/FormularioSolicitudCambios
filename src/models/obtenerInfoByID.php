<?php
require_once 'conexion.php';

header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');

try {
    $objetoConexion = new Conexion();
    $conn = $objetoConexion->conectar();

    $id = $_GET['id'] ?? null;

    if ($id) {
        $sql = "SELECT * FROM cambios WHERE ID_CAM = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($data);
    } else {
        echo json_encode(["error" => "ID not provided"]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
