import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const axiosInstance = axios.create({
    baseURL: "/",
    // withCredentials: true,
});

class ApiClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    get = async () => {
        try {
            const response = await axiosInstance.get<T>(this.endpoint, {
                withCredentials: true,
            });
            return(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };

    post = async (data: any) => {
        return axiosInstance.post<T>(this.endpoint, data, { withCredentials: true }).then((res) => res.data);
    };

    patch = async (data: any) => {
        try {
            const response = await axiosInstance.patch<T>(this.endpoint, data, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };

    delete = async () => {
        try {
            const response = await axiosInstance.delete<T>(this.endpoint, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    };
}

export default ApiClient;
