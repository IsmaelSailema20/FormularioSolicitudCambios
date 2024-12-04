import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

import React, { useEffect, useState } from "react";

const ModalComponent = ({ closeModal, id }) => {
    const [formData, setFormData] = useState({
        FEC_SOL: "",
        NOM_SOL: "",
        ARE_CAM: "",
        EMAIL_SOL: "",
        DES_CAM: "",
        TIP_CAM: "",
        ESTD_SOL: "",
    });
    const [estadoCambio, setEstadoCambio] = useState(""); // "Aprobado" o "Rechazado"
    const [descripcionEstado, setDescripcionEstado] = useState("");
    const [validadoPor, setValidadoPor] = useState("");
    const [autorizadoPor, setAutorizadoPor] = useState("");
    const [idCam, setIdCam] = useState(null); // Constante para almacenar ID_CAM

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `http://localhost/FormularioSolicitudCambios/src/models/obtenerInfoByID.php?id=${id}`
                );
                const data = await response.json();
                setFormData({
                    id: data.ID_CAM,
                    FEC_SOL: data.FEC_SOL,
                    NOM_SOL: data.NOM_SOL,
                    ARE_CAM: data.ARE_CAM,
                    EMAIL_SOL: data.EMAIL_SOL,
                    DES_CAM: data.DES_CAM,
                    TIP_CAM: data.TIP_CAM,
                    ESTD_SOL: data.ESTD_SOL,
                });
                setIdCam(data.ID_CAM); // Guardar ID_CAM en la constante
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (id) fetchData();
    }, [id]);

    const handleGuardar = async () => {
        if (!descripcionEstado || !validadoPor || !autorizadoPor || !estadoCambio) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        const formData = new FormData();
        formData.append("descripcionEstado", descripcionEstado);
        formData.append("validadoPor", validadoPor);
        formData.append("autorizadoPor", autorizadoPor);
        formData.append("estadoCambio", estadoCambio);
        formData.append("id", idCam);
        try {
            const response = await fetch(
                `http://localhost/FormularioSolicitudCambios/src/models/guardarEstado.php`,
                {
                    method: "POST",
                    body: formData, // Enviar el formulario
                }
            );

            if (!response.ok) {
                throw new Error("Error al realizar la solicitud");
            }

            const data = await response.json();
            console.log("Respuesta del servidor:", data);
            alert("Datos guardados con éxito.");
            closeModal();
            window.location.reload();
        } catch (error) {
            console.error("Error al realizar la solicitud:", error);
            alert("Ocurrió un error al guardar los datos.");
        }
    };

    return (
        <div>
            {
                <div class="py-12 bg-gray-700 bg-opacity-50 transition-opacity duration-150 ease-in-out z-10 fixed inset-0 flex items-center justify-center">
                    <div class="container mx-auto w-11/12 md:w-2/3 max-w-3xl h-auto max-h-screen overflow-y-auto">
                        <div class="relative rounded-xl bg-gray-900 shadow-md border border-gray-400">
                            <div className="bg-gradient-to-r from-sky-600 to-indigo-700 text-white p-6 rounded-t-xl flex justify-between items-center">
                                <div className="flex items-baseline gap-56">
                                    <h2 className="text-xl font-bold tracking-tight">
                                        Confirmación de Cambios de Software
                                    </h2>
                                </div>
                                <h2
                                    className="text-lg ml-14  p-2 w-60 font-bold opacity-100"
                                    id="fecha"
                                >
                                    {formData.FEC_SOL || "Cargando..."}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className="hover:bg-white/20 p-2 rounded-full transition-colors"
                                    aria-label="Cerrar modal"
                                >
                                    <XCircleIcon className="h-8 w-8 hover:text-red-400 transition" />
                                </button>
                            </div>
                            <h2 className="text-white font-bold mt-2 text-md leading-tight mb-4">
                                INFORMACIÓN DEL SOLICITANTE
                            </h2>
                            <div className="grid md:grid-cols-2 p-3 gap-6">
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Nombre del solicitante
                                    </label>
                                    <input
                                        disabled
                                        value={formData.NOM_SOL || ""}
                                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Área o dependencia
                                    </label>
                                    <input
                                        disabled
                                        value={formData.ARE_CAM || ""}
                                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                                    />
                                </div>
                            </div>
                            <div className=" p-2 mb-4">
                                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Email de contacto
                                </label>
                                <input
                                    disabled
                                    type="email"
                                    value={formData.EMAIL_SOL || ""}
                                    className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                                />
                            </div>

                            <div className="mb-4 ">
                                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Tipo de cambio
                                </label>
                                <div className="mt-2 flex justify-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            disabled
                                            type="radio"
                                            checked={formData.TIP_CAM === "Estandar"}
                                            className="form-radio h-5 w-5 text-indigo-600"
                                        />
                                        <span className="ml-2 dark:text-gray-300 text-sm">
                                            Estándar
                                        </span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            disabled
                                            type="radio"
                                            checked={formData.TIP_CAM === "Normal"}
                                            className="form-radio h-5 w-5 text-indigo-600"
                                        />
                                        <span className="ml-2 dark:text-gray-300 text-sm">
                                            Normal
                                        </span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            disabled
                                            type="radio"
                                            checked={formData.TIP_CAM === "Emergente"}
                                            className="form-radio h-5 w-5 text-indigo-600"
                                        />
                                        <span className="ml-2 dark:text-gray-300 text-sm">
                                            Emergente
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div className="p-2 mb-4">
                                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Descripción del cambio solicitado
                                </label>
                                <textarea
                                    disabled
                                    value={formData.DES_CAM || ""}
                                    className="w-full h-28 px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                                ></textarea>
                            </div>
                            <h2 className="text-white font-bold mt-2 text-md leading-tight mb-4">
                                INFORMACIÓN DE APROBACIÓN
                            </h2>
                            <div className="mb-4 ">
                                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Estado de cambio
                                </label>
                                <div className="mt-2 flex justify-center space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="estadoCambio"
                                            value="Rechazado"
                                            disabled={
                                                formData.ESTD_SOL === "Aprobado" ||
                                                formData.ESTD_SOL === "Rechazado"
                                            }
                                            onChange={(e) => setEstadoCambio(e.target.value)}
                                            className="form-radio h-5 w-5 text-indigo-600"
                                        />
                                        <span className="ml-2 dark:text-gray-300 text-sm">
                                            Rechazado
                                        </span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="estadoCambio"
                                            value="Aprobado"
                                            disabled={
                                                formData.ESTD_SOL === "Aprobado" ||
                                                formData.ESTD_SOL === "Rechazado"
                                            }
                                            onChange={(e) => setEstadoCambio(e.target.value)}
                                            className="form-radio h-5 w-5 text-indigo-600"
                                        />
                                        <span className="ml-2 dark:text-gray-300 text-sm">
                                            Aprobado
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div className=" p-2 mb-4">
                                <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Descripción del estado de la solicitud
                                </label>
                                <textarea
                                    disabled={
                                        formData.ESTD_SOL === "Aprobado" ||
                                        formData.ESTD_SOL === "Rechazado"
                                    }
                                    value={descripcionEstado}
                                    onChange={(e) => setDescripcionEstado(e.target.value)}
                                    className="w-full h-28 px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                                ></textarea>
                            </div>
                            <div className="grid p-2 grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Validado por
                                    </label>
                                    <input
                                        disabled={
                                            formData.ESTD_SOL === "Aprobado" ||
                                            formData.ESTD_SOL === "Rechazado"
                                        }
                                        value={validadoPor}
                                        onChange={(e) => setValidadoPor(e.target.value)}
                                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        Autorizado por
                                    </label>
                                    <input
                                        disabled={
                                            formData.ESTD_SOL === "Aprobado" ||
                                            formData.ESTD_SOL === "Rechazado"
                                        }
                                        value={autorizadoPor}
                                        onChange={(e) => setAutorizadoPor(e.target.value)}
                                        className="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center mb-2 justify-center">
                                <button
                                    type="submit"
                                    onClick={handleGuardar}
                                    style={{
                                        display:
                                            formData.ESTD_SOL === "Aprobado" ||
                                                formData.ESTD_SOL === "Rechazado"
                                                ? "none"
                                                : "block",
                                    }}
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm"
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default ModalComponent;
