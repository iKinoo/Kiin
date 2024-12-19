import React from "react";

const MotivacionPage = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 text-gray-800 min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Nuestra Motivación
      </h1>
      <p className="text-lg leading-relaxed max-w-3xl text-center">
        En <span className="font-semibold">Kiin</span>, sabemos que el proceso
        de carga académica es un calvario: horarios que chocan entre sí, casos
        en los cuales, por seleccionar un docente, no puedes cursar tus materias
        completas, y eso sin contar con la infinidad de posibles inconvenientes...
      </p>
      <p className="mt-4 text-lg leading-relaxed max-w-3xl text-center">
        Como estudiantes de la Licenciatura en Ingeniería en Software,
        pertenecientes a la Universidad Autónoma de Yucatán, sabemos que el
        software puede ofrecer un panorama más amplio de la situación,
        facilitando la toma de decisiones, las cuales resultan críticas para
        nuestro futuro.
      </p>
      <p className="mt-4 text-lg leading-relaxed max-w-3xl text-center">
        Estamos emocionados de poder ofrecerte una herramienta que te permita
        simplificar este tedioso proceso de búsqueda, así como mostrarte las
        infinitas posibilidades que tienes a tu alcance.
      </p>
      <div className="mt-8 text-center">
        <p className="text-lg font-medium">
          Atentamente (y con mucho amor), <br />
          <span className="font-semibold text-blue-500">
            El equipo de desarrollo
          </span>
        </p>
      </div>
    </div>
  );
};

export default MotivacionPage;
