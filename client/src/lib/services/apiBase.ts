import axios, { type AxiosRequestConfig } from "axios";
import { z } from "zod";
import Cookies from "js-cookie";
import { BASE_URL } from "../consts";
import { type BaseResponse } from "../../schemas/backendResponseSchema";

export default class ApiBase {
  private readonly baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private getConfig(): AxiosRequestConfig {
    const token = Cookies.get("_auth_access");

    return {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      withCredentials: true,
    };
  }

  protected async get<T extends BaseResponse>(
    url: string,
    schema: z.ZodType<T>,
    errorMessage: string = "GET request failed"
  ): Promise<T> {
    const response = await axios
      .get(`${this.baseUrl}${url}`, this.getConfig())
      .catch(() => {
        throw new Error(errorMessage);
      });

    const { success, data } = await schema.safeParseAsync(response.data);

    if (!success) throw new Error(errorMessage);

    return data;
  }

  protected async post<T extends BaseResponse, D extends object>(
    url: string,
    body: D,
    schema: z.ZodType<T>,
    errorMessage: string = "POST request failed"
  ): Promise<T> {
    const response = await axios
      .post(`${this.baseUrl}${url}`, body, this.getConfig())
      .catch(() => {
        throw new Error(errorMessage);
      });
    const { success, data } = await schema.safeParseAsync(response.data);

    if (!success || !data || typeof data === "undefined")
      throw new Error(errorMessage);

    return data;
  }

  protected async put<T extends BaseResponse, D extends object>(
    url: string,
    body: D,
    schema: z.ZodType<T>,
    errorMessage: string = "PUT request failed"
  ): Promise<T> {
    const response = await axios
      .put(`${this.baseUrl}${url}`, body, this.getConfig())
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
    errorMessage: string = "PATCH request failed"
  ): Promise<T> {
    const response = await axios
      .patch(`${this.baseUrl}${url}`, body, this.getConfig())
      .catch(() => {
        throw new Error(errorMessage);
      });

    const { success, data } = await schema.safeParseAsync(response.data);

    if (!success) throw new Error(errorMessage);

    return data;
  }

  protected async delete(
    url: string,
    errorMessage: string = "DELETE request failed"
  ): Promise<void> {
    const response = await axios
      .delete(`${this.baseUrl}${url}`, this.getConfig())
      .catch(() => {
        throw new Error(errorMessage);
      });

    return response.data;
  }
}
