import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

type ElementData = any;

export const useElements = (user_id: string, bot_id: string) => {

    const apiClient = new ApiClient<ElementData>(`api/${bot_id}/${user_id}`);

    return useQuery({
        queryKey: [user_id],
        queryFn: () => apiClient.get(),
        enabled: !!user_id,
    });
};
