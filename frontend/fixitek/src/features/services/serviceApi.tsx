import { api } from "@/lib/api"
import { Category } from "@/types/category";
import { Service } from "@/types/service";

export const getServicesByCategory = async (categoryId: number): Promise<Service[]> => {
    try {
        const res = await api(`/app/categories/${categoryId}/services/`);
        console.log(`I am services: ${res.data}`);

        return res.data;
    } catch (error) {
        console.error('Failed to fetch services by category', error);

    }
}


export const getServiceCategories = async (): Promise<Category[]> => {
    const res = await api('/app/categories/');

    return res.data;
}