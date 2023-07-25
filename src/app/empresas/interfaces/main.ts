export interface listaEmpresa {
    ID_EMPRESA: string;
    NAME_EMPRESA: string;
    PHONE_EMPRESA: string;
    // USUARIOS: any[];
}


export interface Empresa {
    ID_EMPRESA: string;
    NAME_EMPRESA: string;
    PHONE_EMPRESA: string;
}


export interface Usuario {
    ID_EMPRESA: string;
    ID_USER: string;
    NAME_USER: string;
    SURNAME_USER: string;
}

export interface DataEmpresa {
    empresa: Empresa | null;
    event: string;
}

export interface DataUser {
    idEmp:string;
    user: Usuario | null;
    event: string;
}


