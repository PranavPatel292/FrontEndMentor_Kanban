import api from "./axios_client";
import { useMutation } from "react-query";

export const getAllColumns = async () => {
  const response = await api.get("/column/allColumns", {
    params: {
      boardId: "483a8091-9ddf-459e-9760-be473ccfd659",
    },
  });
  return response;
};

export const moveWithInTheColumns = () => {
  return useMutation((data: any) => {
    return api.post("/column/moveWithInTheColumn", { data: data });
  });
};

export const moveDataInterColumn = () => {
  return useMutation((data: any) => {
    return api.post("/column/moveDataInterColumns", { data });
  });
};

export const createColumn = () => {
  return useMutation((data: any) => {
    return api.post(
      "/column",
      { data },
      {
        params: {
          boardId: "483a8091-9ddf-459e-9760-be473ccfd659",
        },
      }
    );
  });
};
