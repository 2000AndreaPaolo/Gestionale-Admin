export class Auth{
    username: string;
    password: string;
}

export class Atleta{
    id_atleta: number;
    nome: string;
    cognome: string;
    data_nascita: Date;
    id_specializzazione: number;
    id_coach: number;
}

export class Specializzazione{
    id_specializzazione: number;
    descrizione: string;
}

export class Esercizio{
    id_esercizio: number;
    descrizione: string;
    id_coach: number;
}

export class Scheda{
    id_scheda: number;
    nome: string;
    durata: number;
    data_inizio: Date;
    data_fine: Date;
    id_atleta: number;
    id_coach: number;
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
export class Plicometria{
    id_plicometria: number;
    id_atleta: number;
    pettorale: number;
    addome: number;
    gamba: number;
    percentuale: number;
    data_rilevazione: Date;
    note: string;
    id_coach: number;
}

export class Programma{
    id_programma: number;
    id_atleta: number;
    data_inizio: Date;
    data_fine: Date;
    note: string;
    id_coach: number;
};

export class Programmazione{
    id_programmazione: number;
    id_programma: number;
    id_esercizio: number;
    data: Date;
    serie: number;
    carico: number;
    ripetizioni: number;
    note: string;
};

export class Prestazione{
    id_prestazione: number;
    id_atleta: number;
    id_esercizio: number;
    peso: number;
    data: Date;
    note: string;
}

export class Nota{
    id_note: number;
    id_atleta: number;
    data: Date;
    note: string;
}

export class Peso{
    id_peso: number;
    id_atleta: number;
    peso: number;
    data: Date;
    note: string;
}