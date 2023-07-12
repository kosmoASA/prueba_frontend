export interface TUser {
    ID?: number;
    NOMBRE: string;
    APELLIDO: string;
    FECHA_NACIMIENTO: Date;
    EMAIL: string;
    ID_CARGO: number;
    PASSWORD: string;
}


export interface Data {
    user: TUser | null;
    event: string;
}

export interface UserLogin {
    EMAIL: string;
    PASSWORD: string;
}

export interface Cargo {
    ID_CARGO: number,
    CARGO: string
}

export interface ListaDeCargos {
    data: Cargo[],
    message: string
}

