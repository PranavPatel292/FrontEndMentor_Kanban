import api from "./axios_client";
import { useMutation } from "react-query";

export const createTask = () => {
  return useMutation((data: any) => {
    return api.post("/task", { data });
  });
};
