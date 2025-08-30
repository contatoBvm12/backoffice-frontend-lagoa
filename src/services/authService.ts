import { apiService } from "../shared/apiService";
import { Login, LoginDTO } from "../types/auth";
import { mapToUser } from "./userService";

export const authService = {
    async login(email: string, password: string): Promise<Login> {
        const res = await apiService.post<LoginDTO>("/auth/login", { email, password });

        return {
            accessToken: res.accessToken, user: mapToUser(res.user)
        };
    },

    async changePassword(current: string, next: string) {
        const res = await apiService.post<any>("/auth/change-password", { current, next })

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.message || "Erro ao trocar senha");
        }
        return res.json();
    },
};