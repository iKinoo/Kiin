export function getEnumValues<T extends object>(enumObj: T): T[keyof T][] {
    return Object.keys(enumObj)
    .filter(key => isNaN(Number(key))) // Filtrar las claves numéricas (si las hay)
    .map(key => enumObj[key as keyof T]);}
