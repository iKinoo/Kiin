"use client";

import React, { useState, useRef, useEffect } from "react";
/**
 * Datos que tendra el formulario
 */
interface FormData {
  color: string;
  name: string;
  description: string;
  startTime: string; // Formato "HH:mm"
  endTime: string; // Formato "HH:mm"
}

/**
 * Definicio del formulario desplegable, sus propiedades y componentes
 * @returns Estrucura del formulario desplegable
 */
const TemporaryForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    color: "",
    name: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const willDismiss = formRef.current && 
      !formRef.current.contains(event.target as Node)  &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)

      if (willDismiss) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    setIsOpen(false);
  };

  const formLabel = (value: string) => {
    return (
      <label className="text-white">
        {value}
      </label>
    )
  }

  return (
    <div className="mb-4 flex flex-col items-start relative">
      {/* Botón para abrir el formulario */}
      <div className="flex flex-row justify-items-center items-centers">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-30 btn-open-form flex items-center hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          {isOpen ? "Cerrar" : "Agregar Clase"}
        </button>
      </div>

      {/* Formulario desplegable */}
      {isOpen && (
        <div
          ref={formRef}
          className="left-3/4 z-50 form-container absolute bg-slate-200 p-4 rounded-lg shadow-lg dark:bg-gray-800"
        >
          <form onSubmit={handleSubmit}>
            <div>
              {formLabel('Color:')}
              <input
                type="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
            </div>

            <div>
              {formLabel('Nombre:')}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              {formLabel('Descripción:')}
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              {formLabel('Inicio (hora:minutos):')}
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              {formLabel('Final (hora:minutos):')}
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </div>
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
