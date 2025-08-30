import { User, UserDTO } from "./user";

export type LoginDTO = {
    accessToken: string,
    user: UserDTO,
}

export type Login = {
    accessToken: string,
    user: User,
}