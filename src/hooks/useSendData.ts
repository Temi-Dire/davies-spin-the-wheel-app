import ApiClient from "@/services/api-client";
import { useMutation, useQuery } from "@tanstack/react-query";

type ElementData = any;

export const useSendData = (user_id: string, bot_id: string) => {

    const apiClient = new ApiClient<ElementData>(`api/${bot_id}/${user_id}/spin`);

    return useMutation({
        mutationFn: (s: any) => apiClient.post(s),
        // enabled: !!user_id,
    });
};
