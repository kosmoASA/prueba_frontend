export interface TUser {
    id?: number;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    email: string;
    cargo: string;
    password: string;
}


export interface Data {
    user: TUser | null;
    event: string;
}