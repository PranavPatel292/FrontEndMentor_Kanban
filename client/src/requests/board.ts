import api from "./axios_client";
import { useMutation } from "react-query";

export const updateBoard = () => {
  return useMutation((data: any) => {
    return api.put(
      "/boardAndColumnUpdate",
      { data: data },
      {
        params: {
          boardId: "483a8091-9ddf-459e-9760-be473ccfd659",
        },
      }
    );
  });
};

export const deleteBoard = () => {
  return useMutation((data: any) => {
    return api.delete("/board", {
      params: {
        boardId: data.boardId,
      },
    });
  });
};
