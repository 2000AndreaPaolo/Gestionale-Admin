export class Atleta{
    id_atleta: number;
    nome: string;
    cognome: string;
}

export class Esercizio{
    id_esercizio: number;
    descrizione: string;
    id_gruppoMuscolare: number;
}

export class Scheda{
    id_scheda: number;
    nome: string;
    durata: number;
    data_inizio: Date;
    data_fine: Date;
    id_atleta: number;
}

export class Progressione{
    id_progressione: number;
    id_scheda: number;
    id_esercizio: number;
    giorno: number;
    serie: number;
    ripetizioni: number;
    note: string;
}