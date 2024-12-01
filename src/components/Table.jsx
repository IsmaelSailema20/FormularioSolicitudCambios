import React from "react";

function Table() {
  return (
    <>
      <div class="flex flex-wrap -mx-3 mb-5">
        <div class="w-full max-w-full px-3 mb-6  mx-auto">
          <div class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white m-5">
            <div class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30">
              <div class="px-9 pt-5 flex justify-between items-stretch flex-wrap min-h-[70px] pb-0 bg-transparent">
                <h3 class="flex flex-col items-start justify-center m-2 ml-0 font-medium text-xl/tight text-dark">
                  <span class="mr-3 font-semibold text-dark">
                    Lista de formularios de solicitud de cambios
                  </span>
                  <span class="mt-1 font-medium text-secondary-dark text-lg/normal">
                    Todas las solicitudes de cambios que han sido registradas
                  </span>
                </h3>
                <div class="relative flex flex-wrap items-center my-2">
                  <a
                    href="javascript:void(0)"
                    class="inline-block text-[.925rem] font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-150 ease-in-out text-light-inverse bg-gray-700  border-light shadow-none border-0 py-2 px-5 hover:bg-gray-600 active:bg-gray-600 focus:bg-gray-600"
                  >
                    Nueva solicitud
                  </a>
                </div>
              </div>
              <div class="flex-auto block py-8 pt-6 px-9">
                <div class="overflow-x-auto">
                  <table class="w-full my-0 align-middle text-dark border-neutral-200">
                    <thead class="align-bottom">
                      <tr class="font-semibold text-[0.95rem] text-secondary-dark">
                        <th class="pb-3 text-start min-w-[175px]">CÓDIGO</th>
                        <th class="pb-3 text-end min-w-[100px]">SOLICITANTE</th>
                        <th class="pb-3 text-end min-w-[100px]">DESCRIPCIÓN</th>
                        <th class="pb-3 pr-12 text-end min-w-[175px]">
                          ESTADO
                        </th>
                        <th class="pb-3 pr-12 text-end min-w-[100px]">FECHA</th>
                        <th class="pb-3 text-end min-w-[50px]">DETALLE</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="border-b border-dashed last:border-b-0">
                        <td class="p-3 pl-0">
                          <div class="flex items-center">
                            <div class="relative inline-block shrink-0 rounded-2xl me-3">
                              SC-001
                            </div>
                            <div class="flex flex-col justify-start"></div>
                          </div>
                        </td>
                        <td class="p-3 pr-0 text-end">
                          <span class="font-semibold text-light-inverse text-md/normal">
                            Olivia Cambell
                          </span>
                        </td>
                        <td class="p-3 pr-0 text-end">
                          Descripcion de la solicitud
                        </td>
                        <td class="p-3 pr-12 text-end">
                          <span class="text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none text-primary bg-primary-light rounded-lg">
                            {" "}
                            In Progress{" "}
                          </span>
                        </td>
                        <td class="pr-0 text-start">
                          <span class="font-semibold text-light-inverse text-md/normal">
                            2023-08-23
                          </span>
                        </td>
                        <td class="p-3 pr-0 text-end">
                          <button class="ml-auto relative text-secondary-dark bg-light-dark hover:text-primary flex items-center h-[25px] w-[25px] text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-2xl transition-colors duration-200 ease-in-out shadow-none border-0 justify-center">
                            <span class="flex items-center justify-center p-0 m-0 leading-none shrink-0 ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-4 h-4"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                              </svg>
                            </span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-5">
        <div class="w-full max-w-full sm:w-3/4 mx-auto text-center">
          <p class="text-sm text-slate-500 py-1">
            {" "}
            Tailwind CSS Component from{" "}
            <a
              href="https://www.loopple.com/theme/riva-dashboard-tailwind?ref=tailwindcomponents"
              class="text-slate-700 hover:text-slate-900"
              target="_blank"
            >
              Riva Dashboard
            </a>{" "}
            by{" "}
            <a
              href="https://www.loopple.com"
              class="text-slate-700 hover:text-slate-900"
              target="_blank"
            >
              Loopple Builder
            </a>
            .{" "}
          </p>
        </div>
      </div>
    </>
  );
}

export default Table;
