import React, { useState, useEffect } from "react";
import ModalFormulario from "./ModalFormularioUsuario";

function Table({ reload }) {
  const [data, setData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/FormularioSolicitudCambios/src/models/obtenerInfoForm.php"
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Cargar datos cuando el componente se monta
  }, []);

  useEffect(() => {
    if (reload) {
      fetchData(); // Recargar datos cuando `reload` cambia
    }
  }, [reload]);

  return (
    <div className="flex flex-wrap -mx-3 mb-5">
      <div className="w-full max-w-full px-3 mb-6 mx-auto">
        <div className="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
          <div className="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
            {/* Header */}
            <div className="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
              <h3 className="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                <span className="mr-3 font-semibold text-dark">
                  Lista de formularios de solicitud de cambios
                </span>
                <span className="mt-1 font-medium text-secondary-dark text-lg/normal">
                  Todas las solicitudes de cambios que han sido registradas
                </span>
              </h3>
              <div className="relative flex flex-wrap items-center my-2">
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-gray-700  border-light shadow-none border-0 py-2 px-5 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600"
                >
                  Nueva solicitud
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-auto block py-8 pt-6 px-9">
              <div className="overflow-x-auto">
                <table className="w-full my-0 align-middle text-dark border-neutral-200">
                  <thead className="align-bottom">
                    <tr className="font-semibold text-[0.95rem] text-secondary-dark">
                      <th className="pb-3 text-center min-w-[175px]">CÓDIGO</th>
                      <th className="pb-3 text-center min-w-[200px]">
                        SOLICITANTE
                      </th>
                      <th className="pb-3 text-center min-w-[300px]">
                        DESCRIPCIÓN
                      </th>
                      <th className="pb-3 text-center min-w-[150px]">ESTADO</th>
                      <th className="pb-3 text-center min-w-[100px]">FECHA</th>
                      <th className="pb-3 text-center min-w-[100px]">
                        DETALLE
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.length > 0 ? (
                      data.map((item) => (
                        <tr
                          key={item.ID_CAM}
                          className="border-b border-dashed last:border-b-0"
                        >
                          <td className="p-3 pl-0">{`SC-${item.ID_CAM.toString().padStart(
                            3,
                            "0"
                          )}`}</td>
                          <td className="p-3 pl-0">{item.NOM_SOL}</td>
                          <td className="p-3 pl-0">
                            {item.DES_CAM.length > 50
                              ? `${item.DES_CAM.substring(0, 80)}...`
                              : item.DES_CAM}
                          </td>
                          <td className="p-3 pl-0">
                            <span
                              className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg ${
                                item.ESTD_SOL === "Enviado"
                                  ? "text-blue-700 bg-blue-100"
                                  : item.ESTD_SOL === "Aprobado"
                                  ? "text-green-700 bg-green-100"
                                  : item.ESTD_SOL === "Rechazado"
                                  ? "text-red-700 bg-red-100"
                                  : "text-gray-500 bg-gray-200"
                              }`}
                            >
                              {item.ESTD_SOL || "Pendiente"}
                            </span>
                          </td>
                          <td className="p-3 pl-0">{item.FEC_SOL}</td>
                          <td className="p-3 pr-0 text-end">
                            <button
                              className="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center"
                              aria-label="Detalle de solicitud"
                            >
                              <span className="flex items-center justify-center p-0 m-0 leading-none shrink-0">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="w-4 h-4"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                  />
                                </svg>
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="p-3 text-center text-gray-500"
                        >
                          No hay datos disponibles
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalFormulario
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onFormSubmit={fetchData}
      />
    </div>
  );
}

export default Table;
