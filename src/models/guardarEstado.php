<?php
require_once 'conexion.php';
header("Access-Control-Allow-Origin: http://localhost:5173"); // Permitir solicitudes desde localhost:5173
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type");
date_default_timezone_set("America/Guayaquil"); // Zona horaria para Ecuador

$objetoConexion = new Conexion;
$conn = $objetoConexion->conectar();

$fecha = date("Y-m-d");
$DES_EST_CAM = $_POST['descripcionEstado'];
$NOM_VAL = $_POST['validadoPor'];
$NOM_AUT = $_POST['autorizadoPor'];
$ESTD_SOL = $_POST['estadoCambio'];
$id = $_POST['id']; 

$guardarEstado = "
    UPDATE cambios 
    SET 
        fec_res = :fecha,
        DES_EST_CAM = :DES_EST_CAM,
        NOM_VAL = :NOM_VAL,
        NOM_AUT = :NOM_AUT,
        ESTD_SOL = :ESTD_SOL
    WHERE ID_CAM = :id;
";

try {
    $stmt = $conn->prepare($guardarEstado);
    $stmt->bindParam(':fecha', $fecha);
    $stmt->bindParam(':DES_EST_CAM', $DES_EST_CAM);
    $stmt->bindParam(':NOM_VAL', $NOM_VAL);
    $stmt->bindParam(':NOM_AUT', $NOM_AUT);
    $stmt->bindParam(':ESTD_SOL', $ESTD_SOL);
    $stmt->bindParam(':id', $id, PDO::PARAM_INT); 
    $stmt->execute();

    $dataJson = json_encode("Se actualizó correctamente");
    print_r($dataJson);
} catch (PDOException $e) {
    http_response_code(500);
    $dataJson = json_encode("Error al actualizar: " . $e->getMessage());
    print_r($dataJson);
}
?>
