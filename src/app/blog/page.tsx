import React from "react";

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold mb-4 text-center">Últimas Novedades</h1>
      <p className="text-xl leading-relaxed max-w-2xl text-center">
        Actualmente nos encontramos trabajando para traerte nuevas mejoras que
        te permitan tomar las mejores decisiones respecto a tu carga académica.
        Próximamente estaremos publicando las nuevas actualizaciones por este
        medio.
      </p>
      <p className="mt-4 text-lg text-gray-600 text-center">
        ¡Mantente pendiente, lo mejor está por llegar!
      </p>
      <div className="mt-8 text-center">
        <p className="text-lg font-medium">
          Atentamente, <br />
          <span className="font-semibold text-blue-500">
            El equipo de desarrollo
          </span>
        </p>
      </div>
    </div>
  );
};

export default BlogPage;
