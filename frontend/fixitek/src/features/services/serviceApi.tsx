import { api } from "@/lib/api"
import { Category } from "@/types/category";
import { Service } from "@/types/service";



export const getAllServices = async () => {
    try {
        const res = await api<Service[]>(`/app/services`);
        return res.data;
    } catch (error) {
        console.error('Failed to load services', error);
        throw error
    }
}


export const getServiceCategories = async (): Promise<Category[]> => {
    try {
        const res = await api('/app/categories/');

        return res.data;
    } catch (error) {
        console.error('Failed to fetch service categories', error);
        throw error;
    }
}


export const getServicesByCategory = async (categoryId: number): Promise<Service[]> => {
    try {
        const res = await api<Service[]>(`/app/categories/${categoryId}/services/`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch services by category', error);
        throw error;
    }
}

// export const getServiceDetails = async (
//     categoryId: number,
//     serviceId: number
// ): Promise<Service> => {
//     try {
//         const res = await api.get<Service>(`/app/categories/${categoryId}/services/${serviceId}/`);
//         console.log('category service: ', res.data);
//         return res.data

//     } catch (error) {
//         console.error('Failed to load a service by category', error);
//         throw error;
//     }
// }


