import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

const ModalFormularioUsuario = ({ isOpen, onClose, onFormSubmit }) => {
  const today = new Date().toISOString().split("T")[0];
  const initialFormData = {
    fecha: today,
    nombreSolicitante: "",
    dependencia: "",
    cambio: "",
    descripcion: "",
    email: "",
  };
  // Estado del formulario
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value || "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombreSolicitante)
      newErrors.nombreSolicitante = "Nombre del solicitante requerido";
    if (!formData.dependencia)
      newErrors.dependencia = "Área o dependencia requerida";
    if (!formData.descripcion)
      newErrors.descripcion = "Descripción del cambio requerida";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Convierte formData a query string
      const formBody = new URLSearchParams(formData).toString();

      const response = await fetch(
        "http://localhost:8081/FormularioSolicitudCambios/src/models/guardar.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded", // Cambiar a formulario
          },
          body: formBody, // Enviar como string
        }
      );

      const result = await response.json();

      if (result.error) {
        setErrors({ general: result.error });
      } else {
        setErrors({});
        setSubmitted(true);
        onFormSubmit();
        setFormData(initialFormData); // Limpia el formulario
        setTimeout(() => {
          onClose();
          setSubmitted(false);
        }, 2000);
      }
    } catch (error) {
      setErrors({ general: "Error al enviar la solicitud" });
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <CheckCircleIcon className="h-24 w-24 text-green-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Solicitud Enviada Exitosamente
              </h2>
              <p className="text-gray-600">
                Su solicitud de cambio ha sido recibida y será procesada.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-indigo-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
                <div className="flex items-baseline gap-56">
                  <h2 className="text-xl font-semibold">
                    Formulario de Solicitud de Cambios
                  </h2>
                  <h2 className="text-xl font-semibold" id="fecha">
                    {formData.fecha || "No hay fecha disponible"}
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="hover:bg-indigo-500 p-2 rounded-full transition-colors"
                  aria-label="Cerrar modal"
                >
                  <XCircleIcon className="h-8 w-8" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <input
                      type="date"
                      id="fecha"
                      name="fecha"
                      value={formData.fecha}
                      onChange={handleInputChange}
                      className="hidden w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
                <h2 class="text-gray-800 font-bold text-md leading-tight mb-4">
                  Información del solicitante
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="nombreSol icitante"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Nombre del Solicitante
                    </label>
                    <input
                      type="text"
                      id="nombreSolicitante"
                      name="nombreSolicitante"
                      value={formData.nombreSolicitante}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none ${
                        errors.requestorName
                          ? "border-red-500"
                          : "border-gray-300 focus:border-indigo-500"
                      }`}
                    />
                    {errors.requestorName && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.requestorName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="dependencia"
                      className="block mb-2 text-sm font-medium text-gray-700"
                    >
                      Área o Dependencia
                    </label>
                    <input
                      type="text"
                      id="dependencia"
                      name="dependencia"
                      value={formData.dependencia}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none ${
                        errors.dependencia
                          ? "border-red-500"
                          : "border-gray-300 focus:border-indigo-500"
                      }`}
                    />
                    {errors.dependencia && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.dependencia}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Email Solicitante
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none ${
                      errors.email
                        ? "border-red-500"
                        : "border-gray-300 focus:border-indigo-500"
                    }`}
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="block mb-2 text-sm font-bold text-black">
                      Tipo de Cambio
                    </h2>
                    <div className="flex space-x-4">
                      {["Estándar", "Normal", "Emergente"].map((type) => (
                        <label
                          key={type}
                          className="inline-flex items-center cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="cambio"
                            value={type}
                            checked={formData.cambio === type}
                            onChange={handleInputChange}
                            className="form-radio h-5 w-5 text-indigo-600"
                          />
                          <span className="ml-2 text-black">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2
                      htmlFor="descripcion"
                      className="block mb-2 text-sm font-bold text-black"
                    >
                      Descripción del Cambio
                    </h2>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none ${
                        errors.descripcion
                          ? "border-red-500"
                          : "border-gray-300 focus:border-indigo-500"
                      }`}
                    />
                    {errors.changeDescription && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.changeDescription}
                      </p>
                    )}
                  </div>
                </div>
                <h2 class="text-gray-800 font-bold text-md leading-tight mb-4">
                  Respuesta de la solicitud
                </h2>
                <div className="my-4">
                  <div>
                    <label
                      htmlFor="statusDescription"
                      className="block font-medium text-gray-700"
                    >
                      Descripción del Estado
                    </label>
                    <textarea
                      id="statusDescription"
                      name="statusDescription"
                      value={formData.statusDescription}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      rows={3}
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="responseDate"
                      className="block font-medium text-gray-700"
                    >
                      Fecha de Respuesta
                    </label>
                    <input
                      type="date"
                      id="responseDate"
                      name="responseDate"
                      value={formData.responseDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      disabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="validatedBy"
                      className="block font-medium text-gray-700"
                    >
                      Validado por
                    </label>
                    <input
                      type="text"
                      id="validatedBy"
                      name="validatedBy"
                      value={formData.validatedBy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      disabled
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="authorizedBy"
                      className="block font-medium text-gray-700"
                    >
                      Autorizado por
                    </label>
                    <input
                      type="text"
                      id="authorizedBy"
                      name="authorizedBy"
                      value={formData.authorizedBy}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      disabled
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="mr-4 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Enviar
                  </button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

ModalFormularioUsuario.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalFormularioUsuario;
