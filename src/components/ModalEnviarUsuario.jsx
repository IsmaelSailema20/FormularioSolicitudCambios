import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const ModalEnviarUsuario = ({ isOpen, onClose, onFormSubmit }) => {
  const today = new Date().toISOString().split("T")[0];
  const initialFormData = {
    fecha: today,
    nombreSolicitante: "",
    dependencia: "",
    cambio: "",
    descripcion: "",
    email: "",
  };

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
    if (!formData.email) newErrors.email = "Correo electrónico requerido";
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
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formBody,
        }
      );

      const result = await response.json();

      if (result.error) {
        setErrors({ general: result.error });
      } else {
        setErrors({});
        setSubmitted(true);
        onFormSubmit();
        setFormData(initialFormData);
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
        className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative dark:bg-gray-800 dark:border-gray-700"
        >
          {submitted ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <CheckCircleIcon className="h-24 w-24 text-emerald-500 mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Solicitud Enviada Exitosamente
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Su solicitud de cambio ha sido recibida y será procesada.
              </p>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-sky-600 to-indigo-700 text-white p-6 rounded-t-xl flex justify-between items-center">
                <div className="flex items-baseline gap-56">
                  <h2 className="text-xl font-bold tracking-tight">
                    Solicitud de Cambios de Software
                  </h2>
                  <h2 className="text-lg font-semibold opacity-80" id="fecha">
                    {formData.fecha || "No hay fecha disponible"}
                  </h2>
                </div>

                <button
                  onClick={onClose}
                  className="hover:bg-white/20 p-2 rounded-full transition-colors"
                  aria-label="Cerrar modal"
                >
                  <XCircleIcon className="h-8 w-8 hover:text-red-400 transition" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="nombreSolicitante"
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Nombre del Solicitante
                    </label>
                    <input
                      type="text"
                      id="nombreSolicitante"
                      name="nombreSolicitante"
                      value={formData.nombreSolicitante}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.nombreSolicitante
                          ? "border-red-500 focus:ring-red-300"
                          : "border-gray-300 dark:border-gray-600 focus:border-sky-500 focus:ring-sky-300"
                      }`}
                      placeholder="Nombre completo"
                    />
                    {errors.nombreSolicitante && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.nombreSolicitante}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="dependencia"
                      className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      Área o Dependencia
                    </label>
                    <input
                      type="text"
                      id="dependencia"
                      name="dependencia"
                      value={formData.dependencia}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.dependencia
                          ? "border-red-500 focus:ring-red-300"
                          : "border-gray-300 dark:border-gray-600 focus:border-sky-500 focus:ring-sky-300"
                      }`}
                      placeholder="Ingrese su Departamento"
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
                    className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    Email de Contacto
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-red-500 focus:ring-red-300"
                        : "border-gray-300 dark:border-gray-600 focus:border-sky-500 focus:ring-sky-300"
                    }`}
                    placeholder="usuario@empresa.com"
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                      Tipo de Cambio
                    </h2>
                    <div className="mt-2 flex justify-center space-x-4">
                      {["Estándar", "Normal", "Urgente"].map((type) => (
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
                            className="form-radio h-4 w-4 text-sky-600 border-gray-300 focus:ring-sky-500"
                          />
                          <span className="ml-2 text-gray-700 dark:text-gray-300">
                            {type}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="block mb-2 text-sm font-bold text-gray-700 dark:text-gray-300">
                      Descripción del Cambio
                    </h2>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.descripcion
                          ? "border-red-500 focus:ring-red-300"
                          : "border-gray-300 dark:border-gray-600 focus:border-sky-500 focus:ring-sky-300"
                      }`}
                      placeholder="Describa detalladamente el cambio solicitado..."
                    />
                    {errors.descripcion && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.descripcion}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-6 flex justify-center space-x-4">
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    onClick={onClose}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition"
                  >
                    Enviar Solicitud
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

ModalEnviarUsuario.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func,
};

export default ModalEnviarUsuario;
