import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

interface ExcelFileInfo {
  filename: string;
  date: Date;
  fullPath: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const publicDir = path.join(process.cwd(), 'public');
    
    // Leer todos los archivos en la carpeta public
    const files = fs.readdirSync(publicDir);
    
    // Filtrar solo archivos Excel (.xlsx, .xls)
    const excelFiles = files.filter(file => 
      file.endsWith('.xlsx') || file.endsWith('.xls')
    );
    
    if (excelFiles.length === 0) {
      return res.status(404).json({ error: 'No Excel files found' });
    }

    // Extraer información de fecha de cada archivo Excel
    const excelFilesWithDates: ExcelFileInfo[] = [];
    
    for (const filename of excelFiles) {
      const fullPath = path.join(publicDir, filename);
      
      // Intentar extraer fecha del nombre del archivo
      const dateFromFilename = extractDateFromFilename(filename);
      
      if (dateFromFilename) {
        excelFilesWithDates.push({
          filename,
          date: dateFromFilename,
          fullPath
        });
      } else {
        // Si no se puede extraer fecha del nombre, usar la fecha de modificación del archivo
        const stats = fs.statSync(fullPath);
        excelFilesWithDates.push({
          filename,
          date: stats.mtime,
          fullPath
        });
      }
    }

    // Ordenar por fecha (más reciente primero)
    excelFilesWithDates.sort((a, b) => b.date.getTime() - a.date.getTime());
    
    const latestFile = excelFilesWithDates[0];

    // Leer el contenido del archivo Excel más reciente
    const workbook = XLSX.readFile(latestFile.fullPath);
    
    // Obtener la primera hoja del Excel
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convertir a JSON para facilitar el manejo
    const jsonData = XLSX.utils.sheet_to_json(worksheet);
    
    // También obtener como CSV para compatibilidad
    const csvData = XLSX.utils.sheet_to_csv(worksheet);

    return res.status(200).json({
      success: true,
      filename: latestFile.filename,
      date: latestFile.date.toISOString(),
      sheetName: sheetName,
      data: jsonData,
      csvContent: csvData,
      totalRows: jsonData.length,
      availableFiles: excelFilesWithDates.map(file => ({
        filename: file.filename,
        date: file.date.toISOString()
      }))
    });

  } catch (error) {
    console.error('Error reading Excel files:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

/**
 * Extrae la fecha del nombre del archivo
 * Soporta formatos como: data_26.06.2025.xlsx, data_2025-06-26.xlsx, etc.
 */
function extractDateFromFilename(filename: string): Date | null {
  // Remover la extensión (.xlsx, .xls)
  const nameWithoutExt = filename.replace(/\.(xlsx|xls)$/i, '');
  
  // Patrones de fecha a buscar
  const patterns = [
    // Formato: data_26.06.2025
    /data_(\d{1,2})\.(\d{1,2})\.(\d{4})/,
    // Formato: data_2025-06-26
    /data_(\d{4})-(\d{1,2})-(\d{1,2})/,
    // Formato: data_2025_06_26
    /data_(\d{4})_(\d{1,2})_(\d{1,2})/,
    // Formato: data_26-06-2025
    /data_(\d{1,2})-(\d{1,2})-(\d{4})/,
    // Formato: data_verano_2025 (año solo)
    /data_\w+_(\d{4})/
  ];

  for (const pattern of patterns) {
    const match = nameWithoutExt.match(pattern);
    if (match) {
      try {
        if (pattern.source.includes('\\w+')) {
          // Para casos como data_verano_2025, usar el año y asumir enero 1
          const year = parseInt(match[1]);
          return new Date(year, 0, 1); // 1 de enero del año
        } else if (match.length === 4) {
          // Determinar si es formato día-mes-año o año-mes-día
          const first = parseInt(match[1]);
          const second = parseInt(match[2]);
          const third = parseInt(match[3]);
          
          if (first > 31) {
            // Formato año-mes-día
            return new Date(first, second - 1, third);
          } else {
            // Formato día-mes-año
            return new Date(third, second - 1, first);
          }
        }
      } catch (error) {
        console.warn(`Could not parse date from filename: ${filename}`, error);
      }
    }
  }
  
  return null;
}
