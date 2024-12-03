"use client";

import React, { useState, useRef, useEffect } from "react";

interface FormData {
  color: string;
  name: string;
  description: string;
  startTime: string; // Formato "HH:mm"
  endTime: string; // Formato "HH:mm"
}

const TemporaryForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la visibilidad
  const [formData, setFormData] = useState<FormData>({
    color: "",
    name: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const formRef = useRef<HTMLDivElement>(null); // Referencia para detectar clics fuera del formulario

  // Cerrar el formulario si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Manejar los cambios en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData); // Acción con los datos del formulario
    setIsOpen(false); // Cierra el formulario después del envío
  };

  return (
    <div>
      {/* Botón para abrir el formulario */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="btn-open-form"
      >
        {isOpen ? "Cerrar formulario" : "Abrir formulario"}
      </button>

      {/* Formulario desplegable */}
      {isOpen && (
        <div
          ref={formRef}
          className="form-container"
          style={{
            position: "absolute",
            background: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form onSubmit={handleSubmit}>
            {/* Campo Color */}
            <div>
              <label>Color:</label>
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </div>

            {/* Campo Nombre */}
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Campo Descripción */}
            <div>
              <label>Descripción:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Campo Hora de Comienzo */}
            <div>
              <label>Comienzo (hora:minutos):</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* Campo Hora de Finalización */}
            <div>
              <label>Final (hora:minutos):</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>

            {/* Botón de Submit */}
            <button type="submit" className="btn-submit">
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default TemporaryForm;
