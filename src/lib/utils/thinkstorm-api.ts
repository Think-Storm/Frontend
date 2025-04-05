import { TProjects } from "./types";

const BASE_URL = "https://ts-backend.fly.dev/api-docs";
const checkResponse = <T>(res: Response): Promise<T> =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getProjects = async ()=> {
    fetch(`${BASE_URL}/projects/{id}`)
    .then((res) => checkResponse<TProjects[]>(res))
}