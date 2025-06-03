import axios, { type AxiosInstance } from "axios";
import { z } from "zod";
import { BASE_URL } from "../consts";
import { type BaseResponse } from "../../schemas/backendResponseSchema";

export default class ApiBase {
  private readonly baseUrl: string;
  private axiosInstance: AxiosInstance;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url.includes("/auth/login")
        ) {
          originalRequest._retry = true;

          try {
            await this.axiosInstance.post(
              `${this.baseUrl}/auth/refresh/`,
              null,
            );

            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      },
    );
  }

  protected async get<T>(
    url: string,
    schema: z.ZodType<T>,
    errorMessage: string = "GET request failed",
  ): Promise<T> {
    const response = await this.axiosInstance
      .get(`${this.baseUrl}${url}`)
      .catch((error) => {
        if (error.response.status === 401) return;
        throw new Error(errorMessage);
      });

    // console.log(response);

    if (!response) throw new Error(errorMessage);

    const { success, data } = await schema.safeParseAsync(response.data);

    // console.log(success, error);

    if (!success) throw new Error(errorMessage);

    return data as T;
  }

  protected async post<T extends BaseResponse, D extends object | null>(
    url: string,
    body: D,
    schema: z.ZodType<T>,
    errorMessage: string = "POST request failed",
  ): Promise<T> {
    const response = await this.axiosInstance
      .post(`${this.baseUrl}${url}`, body)
      .catch(() => {
        throw new Error(errorMessage);
      });

    const { success, data, error } = await schema.safeParseAsync(response.data);

    if (!success || !data || typeof data === "undefined") {
      console.log(error);
      throw new Error(errorMessage);
    }

    return data;
  }

  protected async put<T extends BaseResponse, D extends object>(
    url: string,
    body: D,
    schema: z.ZodType<T>,
    errorMessage: string = "PUT request failed",
  ): Promise<T> {
    const response = await this.axiosInstance
      .put(`${this.baseUrl}${url}`, body)
      .catch(() => {
        throw new Error(errorMessage);
      });

    const { success, data } = await schema.safeParseAsync(response.data);

    if (!success) throw new Error(errorMessage);

    return data;
  }

  /**
   * PATCH запит
   */
  protected async patch<T extends BaseResponse, D extends object>(
    url: string,
    body: D,
    schema: z.ZodType<T>,
    errorMessage: string = "PATCH request failed",
  ): Promise<T> {
    const response = await this.axiosInstance
      .patch(`${this.baseUrl}${url}`, body)
      .catch(() => {
        throw new Error(errorMessage);
      });

    const { success, data } = await schema.safeParseAsync(response.data);

    if (!success) throw new Error(errorMessage);

    return data;
  }

  protected async delete(
    url: string,
    errorMessage: string = "DELETE request failed",
  ): Promise<void> {
    const response = await this.axiosInstance
      .delete(`${this.baseUrl}${url}`)
      .catch(() => {
        throw new Error(errorMessage);
      });

    return response.data;
  }
}
