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