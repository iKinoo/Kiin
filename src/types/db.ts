export interface HorarioDetalle {
    dia: string;
    inicio: string;
    fin: string;
    salon: string;
}

export interface GrupoOferta {
    id: number; // ClvGrupo
    materia: string;
    profesor: string;
    creditos: number;
    horarios: HorarioDetalle[];
}