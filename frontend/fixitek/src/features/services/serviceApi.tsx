import { api } from "@/lib/api"
import { ServiceCategory } from "@/types/service";

export const getServices = async () => {
    const res = await api("/app/services/");
    console.log(`I am services: ${res.data}`);

    return res.data;
}


export const getServiceCategories = async (): Promise<ServiceCategory[]> => {
    const res = await api('/app/categories/');

    return res.data;
}