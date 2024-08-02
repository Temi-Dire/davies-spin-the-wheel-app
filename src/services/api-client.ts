import { API_URI } from "@/utilities/constants";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const axiosInstance = axios.create({
    baseURL: API_URI,
    // withCredentials: true,
});

class ApiClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    get =  () => {
        try {
            // const response = await axiosInstance.get<T>(this.endpoint, {
            //     withCredentials: true,
            // });
            return({
                _id: "1289366093",
                spins: 5,
                wheels: [
                    { _id: "66a912c37828e3ca4dfcb98e", type: "product", value: "30" },
                    { _id: "66a912d37828e3ca4dfcb98f", type: "product", value: "30" },
                    { _id: "66a912f17828e3ca4dfcb990", type: "credits", value: 30 },
                    { _id: "66a912f17828e3ca4dfcb990", type: "credits", value: 30 },
                    { _id: "66a912f17828e3ca4dfcb990", type: "credits", value: 30 },
                    { _id: "66a912f17828e3ca4dfcb990", type: "credits", value: 30 },
                    { _id: "66a912f17828e3ca4dfcb990", type: "credits", value: 30 },
                    { _id: "66a912f17828e3ca4dfcb990", type: "credits", value: 30 },
                ],
            });
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
