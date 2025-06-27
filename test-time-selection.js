import { CoursesModelDao } from './src/pages/api/data/CoursesModelDAO';

async function testTimeSelection() {
    try {
        console.log('🧪 Probando selección de archivos por fecha y hora...');

        // Limpiar cache para forzar nueva lectura
        CoursesModelDao.clearCache();

        const courses = await CoursesModelDao.getCourses();

        console.log(`✅ Éxito! Se cargaron ${courses.length} cursos`);

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testTimeSelection();
