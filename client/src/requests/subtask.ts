import api from "./axios_client";
import { useMutation } from "react-query";

export const updateSubTaskStatus = () => {
  return useMutation((data: any) => {
    console.log(data);
    return api.put("/subTask/updateSubtaskStatus", {
      data: {
        status: data.status,
        subTaskId: data.taskId,
      },

      params: {
        taskId: data.taskId,
      },
    });
  });
};
