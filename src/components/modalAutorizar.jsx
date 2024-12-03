import React, { useState } from "react";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const ModalComponent = ({ closeModal }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = (open) => {
        setIsModalOpen(open);
    };

    return (
        <div>
            {(
                <div class="py-12 bg-gray-700 bg-opacity-50 transition-opacity duration-150 ease-in-out z-10 fixed inset-0 flex items-center justify-center">

                    <div class="container mx-auto w-11/12 md:w-2/3 max-w-3xl h-auto max-h-screen overflow-y-auto">
                        <div class="relative rounded-xl bg-gray-900 shadow-md border border-gray-400">
                            <div className="bg-gradient-to-r from-sky-600 to-indigo-700 text-white p-6 rounded-t-xl flex justify-between items-center">
                                <div className="flex items-baseline gap-56">
                                    <h2 className="text-xl font-bold tracking-tight">
                                        Confirmación de Cambios de Software
                                    </h2>
                                    <h2 className="text-lg p-2 font-semibold opacity-80" id="fecha">
                                        {"21/09/2024"}
                                    </h2>
                                </div>

                                <button
                                    onClick={closeModal}
                                    className="hover:bg-white/20 p-2 rounded-full transition-colors"
                                    aria-label="Cerrar modal"
                                >
                                    <XCircleIcon className="h-8 w-8 hover:text-red-400 transition" />
                                </button>
                            </div>
                            <h2 class="text-white font-bold mt-2 text-md leading-tight mb-4">INFORMACIÓN DEL SOLICITANTE</h2>
                            <div className="grid md:grid-cols-2 p-3 gap-6">
                                <div class="mb-4">
                                    <label class="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Nombre del solicitante</label>
                                    <input class="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2" />
                                </div>

                                <div class="mb-4">
                                    <label class="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Área o dependencia</label>
                                    <input class="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2" />
                                </div>
                            </div>
                            <div class=" p-2 mb-4">
                                <label class="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Email de contacto</label>
                                <input type="email" name="email" id='email' class="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2" />
                            </div>

                            <div class="mb-4 ">
                                <label class="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Tipo de cambio</label>
                                <div class="mt-2 flex justify-center space-x-4">
                                    <label class="inline-flex items-center">
                                        <input type="radio" name="tipoCambio" className="form-radio h-5 w-5 text-indigo-600" />
                                        <span class="ml-2 dark:text-gray-300 text-sm">Estándar</span>
                                    </label>
                                    <label class="inline-flex items-center">
                                        <input type="radio" name="tipoCambio" className="form-radio h-5 w-5 text-indigo-600" />
                                        <span class="ml-2 dark:text-gray-300 text-sm">Normal</span>
                                    </label>
                                    <label class="inline-flex items-center">
                                        <input type="radio" name="tipoCambio" className="form-radio h-5 w-5 text-indigo-600" />
                                        <span class="ml-2 dark:text-gray-300 text-sm">Emergente</span>
                                    </label>
                                </div>
                            </div>
                            <div class="p-2 mb-4">
                                <label class="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Descripción del cambio solicitado</label>
                                <textarea class="w-full h-28 px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"></textarea>
                            </div>
                            <h2 class="text-white font-bold mt-2 text-md leading-tight mb-4">INFORMACIÓN DE APROVACIÓN</h2>
                            <div class="mb-4 ">
                                <label class="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Estado de cambio</label>
                                <div class="mt-2 flex justify-center space-x-4">
                                    <label class="inline-flex items-center">
                                        <input type="radio" name="tipoCambio" className="form-radio h-5 w-5 text-indigo-600" />
                                        <span class="ml-2 dark:text-gray-300 text-sm">Rechazado</span>
                                    </label>
                                    <label class="inline-flex items-center">
                                        <input type="radio" name="tipoCambio" className="form-radio h-5 w-5 text-indigo-600" />
                                        <span class="ml-2 dark:text-gray-300 text-sm">Aprovado</span>
                                    </label>
                                </div>
                            </div>

                            <div class=" p-2 mb-4">
                                <label class="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Descripción del estado de la solicitud</label>
                                <textarea class="w-full h-28 px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2"></textarea>
                            </div>
                            <div class="grid p-2 grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label class="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Validado por</label>
                                    <input class="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2" />
                                </div>
                                <div>
                                    <label class="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Autorizado por</label>
                                    <input class="w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2" />
                                </div>
                            </div>
                            <div class="flex items-center mb-2 justify-center">
                                <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
                                    Guardar
                                </button>
                                <button onClick={closeModal}
                                    class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalComponent;