export class Atleti{
    id_atleta: number;
    nome: string;
    cognome: string;
    username: string;
    data_nascita: Date;
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

export class Plicometrie{
    id_plicometria: number;
    id_atleta: number;
    pettorale: number;
    addome: number;
    gamba: number;
    percentuale: number;
    data_rilevazione: Date;
    note: string;
}