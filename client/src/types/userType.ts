export interface UserType {
    id?: number,
    name: string,
    surname: string,
    login: string,
    password: string,
}

export interface UserLogin {
    login: string,
    password: string,
}