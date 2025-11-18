import Cookies from 'js-cookie'
import axios, { AxiosInstance, AxiosError } from "axios";

type methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ReqApiCallTypes {
    method: methods;
    endpoint: string;
    data?: unknown | undefined;
    retryCount?: number;
    signal?: AbortSignal;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'

export class ApiServices {
    private axiosInstance: AxiosInstance

    constructor(baseURL: string) {
        this.axiosInstance = axios.create({
            baseURL,
            timeout: 15000,
        });

        // Attach token globally
        this.axiosInstance.interceptors.request.use((config) => {
            const accessToken = this.getTokens().accessToken;
            if (accessToken) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
        });

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    this.clearToken();
                    if (typeof window !== "undefined") {
                        window.location.href = "/auth/login";
                    }
                }

                return Promise.reject(error);
            }
        );
    }

    getTokens = () => {
        const accessToken = Cookies.get('access_token') ?? null;
        const refreshToken = Cookies.get('refresh_token') ?? null;

        return { accessToken, refreshToken, timestamp: Date.now() }
    }

    setTokens = (tokens: { access_token: string, refresh_token: string }) => {
        const { access_token, refresh_token } = tokens

        if (!access_token || !refresh_token) return null;

        Cookies.set("access_token", access_token)
        Cookies.set("refresh_token", refresh_token)
    }

    refereshToken = (refereshToken: string) => {
        // api implementation needed to be done.
    }

    isTokenExpired = (token: string) => {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload) {
            return payload.exp * 1000 < Date.now();
        } else {
            return null;
        }
    }

    clearToken = () => {
        Cookies.remove('access_token')
        Cookies.remove('refresh_token')
    }

    logout = () => {
        this.clearToken();
        window.location.href = 'auth/login';
    }

    reqApiCall = async ({ method, endpoint, data, retryCount = 0, signal }: ReqApiCallTypes): Promise<any> => {
        try {
            const res = await this.axiosInstance.request({
                url: endpoint,
                method,
                data, // no need to put checker for formdata, axios handles with it's own
                signal
            });

            return res.data;

        } catch (err: unknown) {
            const error = err as AxiosError;

            // If request was cancelled
            if (axios.isCancel(error)) {
                throw new Error("Request cancelled");
            }

            // no retry mechanism on 401 (handled by interceptor of axios)
            if (error.response?.status === 401) {
                throw error;
            }

            // Retry Logic (max 3 retries)
            if (retryCount < 3) {
                console.warn(`Retrying: ${endpoint} | Attempt: ${retryCount + 1}`);
                return this.reqApiCall({
                    method,
                    endpoint,
                    data,
                    signal,
                    retryCount: retryCount + 1,
                });
            }

            // Normalized Error
            throw {
                status: error.response?.status,
                message: error.response?.data || error.message,
            };
        }

    }
}

export const apiServices = new ApiServices(BASE_URL)

