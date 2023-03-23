import api from "./axios_client";
import { useMutation } from "react-query";

export const createTask = () => {
  return useMutation((data: any) => {
    return api.post("/task", { data });
  });
};

export const deleteTask = () => {
  return useMutation((data: any) => {
    return api.delete("/task?taskId", {
      params: {
        taskId: data.taskId,
      },
      data: { data: { columnId: data.columnId } },
    });
  });
};
