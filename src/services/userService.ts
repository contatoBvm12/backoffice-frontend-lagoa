import { apiModulesEnum } from "../shared/apiModulesEnum";
import { apiService } from "../shared/apiService";
import { User, UserDTO } from "../types/user";

export const userService = {
    async getAll(): Promise<User[]> {
        const users = await apiService.get<UserDTO[]>(`/${apiModulesEnum.onboard}/user/all`)
        return users.map(userDTO => mapToUser(userDTO));
    },

    async getById(id: string): Promise<User> {
        const userDTO = await apiService.get<UserDTO>(`/${apiModulesEnum.onboard}/user/${id}`)
        return mapToUser(userDTO)
    },

    async create(user: any) {
        await apiService.post(`/auth/register`, user)
    },

    async update(id: string, user: any) {
        await apiService.patch(`/${apiModulesEnum.onboard}/user/${id}`, user);
    },
}

export function mapToUser(userDTO: UserDTO): User {
    return {
        id: userDTO.id,
        email: userDTO.email,
        fullName: userDTO.fullName,
        phoneNumber: userDTO.phone,
        status: 'active',
        role: 'admin',
        companyId: userDTO.companyId,
        cpf: userDTO.cpf,
        isAdmin: userDTO.isAdmin,
        password: userDTO.password,
    }
}