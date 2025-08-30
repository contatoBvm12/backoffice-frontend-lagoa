export type CompanyDTO = {
    id: string
    cnpj: string
    name: string
    companySlug: string
    description: string
    type: string
    createdAt: string
}

export type Company = {
    name: string,
    id: string,
    cnpj: string,
    plan: string, // TODO: NÃO VOLTA DO BACK
    status: string, // TODO: NÃO VOLTA DO BACK
    description: string,
    type: string,
    companySlug: string,
}
