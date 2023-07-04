export interface TUser {
    ID?: number;
    NOMBRE: string;
    APELLIDO: string;
    FECHA_NACIMIENTO: Date;
    EMAIL: string;
    CARGO: string;
    PASSWORD: string;
}


export interface Data {
    user: TUser | null;
    event: string;
}