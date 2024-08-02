import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type ElementData = any;

export const useElements = (user_id: string) => {

    const apiClient = new ApiClient<ElementData>(`api/${user_id}`);

    return useQuery({
        queryKey: [user_id],
        queryFn: () => axios.get('/api/1289366093'),
        enabled: !!user_id,
    });
};
