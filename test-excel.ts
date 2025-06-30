// Test script para verificar que CoursesModelDAO funciona con Excel
import { CoursesModelDao } from './src/pages/api/data/CoursesModelDAO';

async function testExcelReading() {
    try {
        console.log('🔄 Iniciando prueba de lectura de Excel...');

        const courses = await CoursesModelDao.getCourses();

        console.log(`✅ Éxito! Se cargaron ${courses.length} cursos`);
        console.log('📋 Primeros 3 cursos:');
        courses.slice(0, 3).forEach((course, index) => {
            console.log(`\n${index + 1}. ${course.Asignatura}`);
            console.log(`   Grupo: ${course.GRUPO}`);
            console.log(`   Profesor: ${course.Nombres} ${course.Apellidos}`);
            console.log(`   Modalidad: ${course.Modalidad}`);
        });

    } catch (error) {
        console.error('❌ Error al leer archivo Excel:', error);
    }
}

testExcelReading();
