import Image from "next/image";
import React from "react";

const MotivacionPage = () => {
  return (
    <div className=" flex-1 overflow-auto flex flex-col items-center  px-4">
      <h1 className="text-4xl font-bold mb-6 text-center mt-14">
        Motivación
      </h1>
      <Image src={"/img/excel_screenshot.png"} alt={""} className="mb-5" width={800} height={800}></Image>
      <p className="text-lg leading-relaxed max-w-3xl text-center">
        Sabemos que el proceso
        de carga académica es un dolor de... profesores que chocan entre sí, en algunos casos por seleccionar un docente, no puedes tomar tus materias
        completas, y no hablemos de las constantes actualizaciones o del horrible Excel.
      </p>
      <p className="mt-4 text-lg leading-relaxed max-w-3xl text-center">
        Esto inició como proyecto escolar, pero nos sorprendió tanto la aceptación que decidimos continuar con el desarrollo y lanzar una versión pública aún después aprobar la materia correspondiente.
        
      </p>
      <p className="mt-4 text-lg leading-relaxed max-w-3xl text-center">
        Quizá no podamos mejorar SICEI, pero al menos podemos ofrecerte una herramienta que te permita planear tu carga académica de forma más sencilla y eficiente.
      </p>
      <div className="mt-8 text-center mb-14">
        <p className="text-lg font-medium">
          
          <span className="font-semibold text-blue-500">
            El equipo de Kiin
          </span>
        </p>
      </div>
    </div>
  );
};

export default MotivacionPage;
