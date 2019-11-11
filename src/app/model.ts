export class AuthUser {
    id_coach: number;
    nome: string;
    cognome:string;
    token:string;
}

export class Atleti{
    id_atleta: number;
    nome: string;
    cognome: string;
    username: string;
    data_nascita: Date;
    id_specializzazione: number;
}

export class Specializzazioni{
    id_specializzazione: number;
    descrizione: string;
}

export class Esercizzi{
    id_esercizio: number;
    descrizione: string;
    id_coach: number;
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
    nome_esercizio: string;
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

export class Programmi{
    id_programma: number;
    id_atleta: number;
    data_inizio: Date;
    data_fine: Date;
    note: string;
    id_coach: number;
};

export class Programmazioni{
    id_programmazione: number;
    id_programma: number;
    id_esercizio: number;
    data: Date;
    serie: number;
    carico: number;
    ripetizioni: number;
    note: string;
};

export class Prestazioni{
    id_prestazione: number;
    id_atleta: number;
    id_esercizio: number;
    peso: number;
    data: Date;
    note: string;
}

export class Note{
    id_note: number;
    id_atleta: number;
    data: Date;
    note: string;
}

export class Pesi{
    id_peso: number;
    id_atleta: number;
    peso: number;
    data: Date;
    note: string;
}