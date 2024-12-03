<?php

class Conexion
{
    private $server = 'localhost';
    private $db = 'almacenamientocambios';
    private $user = 'root';
    private $password = '';

    public function conectar()
    {
        try {
            $conn = new PDO("mysql:host=" . $this->server . ";port=33065;dbname=" . $this->db, $this->user, $this->password);
            return $conn;
        } catch (Exception $e) {
            die("error al conectar: " . $e->getMessage());
        }
    }
}

$conexion = new Conexion();
$conn = $conexion->conectar();

if ($conn) {
} else {
    echo json_encode(["error" => "No se pudo establecer la conexión."]);
}