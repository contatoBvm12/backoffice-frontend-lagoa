import { CompanyDTO } from "./company"

export type UserDTO = {
    id: string
    fullName: string
    phone: string
    email: string
    cpf: string
    pixKey: any
    createdAt: string
    isActive: boolean
    isAdmin: boolean
    companyId: string,
    company: CompanyDTO
    password: string,
}
export type User = {
    id: string;
    fullName: string;
    cpf: string,
    phoneNumber: string
    email: string;
    status: string; //TODO: NÃO VOLTA DO BACK
    role: string; //TODO: NÃO VOLTA DO BACK
    isAdmin: boolean,
    companyId: string,
    password: string,
}