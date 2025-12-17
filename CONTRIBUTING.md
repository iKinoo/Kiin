# Guía de Contribución

¡Gracias por tu interés en contribuir a Kiin! 🎉

## Configuración del Entorno de Desarrollo

### 1. Fork y Clona el Repositorio

```bash
git clone https://github.com/KiinMx/Kiin.git
cd Kiin
```

### 2. Instala las Dependencias

```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Variables de Entorno (Opcional)

El proyecto está configurado para funcionar **sin credenciales** en modo desarrollo.

- ✅ **No necesitas configurar nada** para empezar a contribuir
- ✅ Todas las funcionalidades principales funcionan sin `.env`
- ⚠️ Solo la exportación a Google Calendar requiere credenciales de Supabase

Si ves este mensaje al iniciar la aplicación, es completamente normal:

```
⚠️ Ambiente de desarrollo sin credenciales: La exportación a Google Calendar no estará disponible
```

#### Si necesitas probar la funcionalidad de Google Calendar:

1. Copia el archivo de ejemplo:

```bash
cp .env.example .env.local
```

2. Contacta al equipo para obtener las credenciales de Supabase de desarrollo

## Ejecutar el Proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── components/        # Componentes React reutilizables
│   ├── widgets/           # Componentes de widget específicos
│   └── generador/         # Página principal del generador
├── domain/                # Lógica de dominio (Clean Architecture)
│   ├── entities/         # Entidades del dominio
│   ├── repositories/     # Interfaces de repositorios
│   └── use_cases/        # Casos de uso
├── infrastructure/        # Implementaciones de infraestructura
│   ├── datasource/       # Fuentes de datos (CSV, APIs)
│   ├── mappers/          # Mapeadores de datos
│   └── repositories/     # Implementaciones de repositorios
└── utils/                # Utilidades generales
```

## Flujo de Trabajo para Contribuir

1. **Crea una rama** para tu feature/fix:

```bash
git checkout -b feature/mi-nueva-funcionalidad
```

2. **Haz tus cambios** y asegúrate de:

   - Seguir el estilo de código existente
   - Agregar comentarios cuando sea necesario
   - Probar tus cambios localmente

3. **Commit** tus cambios:

```bash
git add .
git commit -m "feat: descripción clara de tu cambio"
```

Formato de commits sugerido:

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bugs
- `docs:` Cambios en documentación
- `style:` Cambios de formato (no afectan la lógica)
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Tareas de mantenimiento

4. **Push** a tu fork:

```bash
git push origin feature/mi-nueva-funcionalidad
```

5. **Crea un Pull Request** en GitHub

## Áreas de Contribución

### 🎨 Frontend

- Componentes React
- Estilos con Tailwind CSS
- Mejoras de UX/UI
- Responsive design

### 🧮 Lógica de Negocio

- Algoritmo de generación de horarios
- Filtros y categorías
- Validaciones

### 📊 Datos

- Actualización de materias/profesores
- Mejoras en parseo de CSV
- Optimizaciones de rendimiento

### 📝 Documentación

- Mejorar README
- Agregar comentarios al código
- Crear guías de usuario

## Testing

Actualmente el proyecto usa Jest para testing:

```bash
npm test
```

## Preguntas o Problemas

Si tienes dudas o encuentras problemas:

1. Revisa los [Issues existentes](https://github.com/KiinMx/Kiin/issues)
2. Crea un nuevo Issue si no existe uno similar
3. Únete a las discusiones en el repositorio

## Código de Conducta

- Sé respetuoso con otros contribuidores
- Proporciona feedback constructivo
- Mantén un ambiente colaborativo y positivo

¡Gracias por contribuir a Kiin! 🚀
