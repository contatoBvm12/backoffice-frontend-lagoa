import { apiModulesEnum } from "../shared/apiModulesEnum";
import { apiService } from "../shared/apiService";
import { Company, CompanyDTO } from "../types/company";
import { User, UserDTO } from "../types/user";
import { mapToUser } from "./userService";

export const companyService = {
    async getAll(): Promise<Company[]> {
        const companies = await apiService.get<CompanyDTO[]>(`/${apiModulesEnum.onboard}/company/all`)
        return companies.map(companyDTO => mapToCompany(companyDTO));
    },

    async getById(id: string): Promise<Company> {
        const companyDTO = await apiService.get<CompanyDTO>(`/${apiModulesEnum.onboard}/company/${id}`)
        return mapToCompany(companyDTO)
    },

    async create(company: any) {
        await apiService.post(`/${apiModulesEnum.onboard}/company/create`, company)
    },

    async update(id: string, company: any) {
        await apiService.patch(`/${apiModulesEnum.onboard}/company/${id}`, company);
    },

    async getUsersByCompanyId(companyId: string): Promise<User[]> {
        const users = await apiService.get<UserDTO[]>(`/${apiModulesEnum.onboard}/company/${companyId}/users`)
        return users.map(user => mapToUser(user))
    }
}

function mapToCompany(companyDTO: CompanyDTO): Company {
    return {
        id: companyDTO.id,
        name: companyDTO.name,
        cnpj: companyDTO.cnpj,
        plan: 'trial',
        status: 'active',
        description: companyDTO.description,
        type: companyDTO.type,
        companySlug: companyDTO.companySlug,
    }
}