<?php
/*error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}

include 'conexion.php';

class Cambios {
    private $conn;

    public function __construct() {
        $conexion = new Conexion();
        $this->conn = $conexion->conectar();
    }

    public function guardarCambio($data) {
        try {
            $sql = "INSERT INTO cambios
                    (ID_CAM, FEC_SOL, NOM_SOL, ARE_CAM, TIP_CAM, DES_CAM, FEC_RES, DES_EST_CAM, NOM_VAL, NOM_AUT, ESTD_SOL)
                    VALUES
                    (:ID_CAM, :FEC_SOL, :NOM_SOL, :ARE_CAM, :TIP_CAM, :DES_CAM, :FEC_RES, :DES_EST_CAM, :NOM_VAL, :NOM_AUT, :ESTD_SOL)";

            $stmt = $this->conn->prepare($sql);

            $stmt->bindParam(':ID_CAM', $data['code']);
            $stmt->bindParam(':FEC_SOL', $data['requestDate']);
            $stmt->bindParam(':NOM_SOL', $data['requestorName']);
            $stmt->bindParam(':ARE_CAM', $data['department']);
            $stmt->bindParam(':TIP_CAM', $data['changeType']);
            $stmt->bindParam(':DES_CAM', $data['changeDescription']);
            $stmt->bindParam(':FEC_RES', $data['responseDate']);
            $stmt->bindParam(':DES_EST_CAM', $data['statusDescription']);
            $stmt->bindParam(':NOM_VAL', $data['validatedBy']);
            $stmt->bindParam(':NOM_AUT', $data['authorizedBy']);
            $stmt->bindParam(':ESTD_SOL', $status = 'Enviado');

            $stmt->execute();

            return ["message" => "Solicitud guardada exitosamente"];
        } catch (PDOException $e) {
            http_response_code(500);
            return ["error" => $e->getMessage()];
        }
    }
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        $cambios = new Cambios();
        $resultado = $cambios->guardarCambio($data);
        echo json_encode($resultado);
    } else {
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}

*/
require_once 'conexion.php';
header("Access-Control-Allow-Origin: http://localhost:5173"); // Permitir solicitudes desde localhost:5173
header("Access-Control-Allow-Methods: POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type");
$objetoConexion = new Conexion;
$conn = $objetoConexion->conectar();
$fecha = $_POST['fecha'];
$nombreSolicitante = $_POST['nombreSolicitante'];
$dependencia = $_POST['dependencia'];
$tipoCambio = $_POST['cambio'];
$descripcion = $_POST['descripcion'];
$email = $_POST['email'];
$guardarEstudiante = "INSERT INTO cambios (ID_CAM, FEC_SOL, NOM_SOL, ARE_CAM,EMAIL_SOL, TIP_CAM, DES_CAM, FEC_RES, DES_EST_CAM, NOM_VAL, NOM_AUT, FIRMA, ESTD_SOL) VALUES (NULL, '$fecha', '$nombreSolicitante', '$dependencia','$email','$tipoCambio', '$descripcion', NULL, NULL, NULL, NULL, NULL, 'Enviado');";
$result = $conn->prepare($guardarEstudiante);
$result->execute();
//print_r("se inserto correctamente");
$dataJson = json_encode("Se inserto correctamente");
print_r($dataJson);