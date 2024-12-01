import React, { useState } from "react";

const ModalComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModal = (open) => {
        setIsModalOpen(open);
    };

    return (
        <div>
            {/* Button to open modal */}
            <div className="w-full flex justify-center py-12">
                <button
                    className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 mx-auto transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-4 sm:px-8 py-2 text-xs sm:text-sm"
                    onClick={() => handleModal(true)}
                >
                    Open Modal
                </button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div class="py-12 bg-gray-700 bg-opacity-50 transition-opacity duration-150 ease-in-out z-10 fixed inset-0 flex items-center justify-center">
                    <div class="container mx-auto w-11/12 md:w-2/3 max-w-3xl h-auto max-h-screen overflow-y-auto">
                        <div class="relative py-8 px-10 bg-white shadow-md rounded border border-gray-400">
                            <h1 class="text-gray-800 font-bold text-lg tracking-normal text-center mb-6">ENCABEZADO</h1>
                            <div class="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label class="text-gray-800 text-sm font-bold leading-tight">Código</label>
                                    <input class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border" />
                                </div>
                                <div>
                                    <label class="text-gray-800 text-sm font-bold leading-tight">Fecha de solicitud</label>
                                    <input type="date" class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border" />
                                </div>
                            </div>
                            <h2 class="text-gray-800 font-bold text-md leading-tight mb-4">Información del solicitante</h2>
                            <div class="mb-4">
                                <label class="text-gray-800 text-sm font-bold leading-tight">Nombre del solicitante</label>
                                <input class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border" />
                            </div>
                            <div class="mb-4">
                                <label class="text-gray-800 text-sm font-bold leading-tight">Área o dependencia</label>
                                <input class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border" />
                            </div>
                            <h2 class="text-gray-800 font-bold text-md leading-tight mb-4">Información del cambio</h2>
                            <div class="mb-4 ">
                                <label class="text-gray-800 text-sm font-bold leading-tight">Tipo de cambio</label>
                                <div class="mt-2 flex justify-center space-x-4">
                                    <label class="inline-flex items-center">
                                        <input type="radio" name="tipoCambio" class="form-radio h-5 w-5 text-indigo-600" />
                                        <span class="ml-2 text-gray-800 text-sm">Estándar</span>
                                    </label>
                                    <label class="inline-flex items-center">
                                        <input type="radio" name="tipoCambio" class="form-radio h-5 w-5 text-indigo-600" />
                                        <span class="ml-2 text-gray-800 text-sm">Normal</span>
                                    </label>
                                    <label class="inline-flex items-center">
                                        <input type="radio" name="tipoCambio" class="form-radio h-5 w-5 text-indigo-600" />
                                        <span class="ml-2 text-gray-800 text-sm">Emergente</span>
                                    </label>
                                </div>
                            </div>
                            <div class="mb-4">
                                <label class="text-gray-800 text-sm font-bold leading-tight">Infraestructura que impacta</label>
                                <input class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border" />
                            </div>
                            <div class="mb-4">
                                <label class="text-gray-800 text-sm font-bold leading-tight">Descripción del cambio solicitado</label>
                                <textarea class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-24 pl-3 text-sm border-gray-300 rounded border"></textarea>
                            </div>
                            <div class="mb-4">
                                <label class="text-gray-800 text-sm font-bold leading-tight">Descripción del estado de la solicitud</label>
                                <textarea class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-24 pl-3 text-sm border-gray-300 rounded border"></textarea>
                            </div>
                            <div class="grid grid-cols-2 gap-4 mb-6">
                                <div>
                                    <label class="text-gray-800 text-sm font-bold leading-tight">Validado por</label>
                                    <input class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border" />
                                </div>
                                <div>
                                    <label class="text-gray-800 text-sm font-bold leading-tight">Autorizado por</label>
                                    <input class="mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 pl-3 text-sm border-gray-300 rounded border" />
                                </div>
                            </div>
                            <div class="flex items-center justify-end">
                                <button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm">
                                    Guardar
                                </button>
                                <button onClick={() => handleModal(false)}
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
