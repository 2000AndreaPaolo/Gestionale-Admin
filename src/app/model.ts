export class Atleti{
    id_atleta: number;
    nome: string;
    cognome: string;
    username: string;
}

export class Esercizzi{
    id_esercizio: number;
    descrizione: string;
    id_gruppoMuscolare: number;
}

export class GruppiMuscolari{
    id_gruppoMuscolare: number;
    descrizione: string;
}

export class Schede{
    id_scheda: number;
    nome: string;
    durata: number;
    data_inizio: Date;
    data_fine: Date;
    id_atleta: number;
}

export class Progressioni{
    id_progressione: number;
    id_scheda: number;
    id_esercizio: number;
    giorno: number;
    serie: number;
    ripetizioni: number;
    note: string;
}