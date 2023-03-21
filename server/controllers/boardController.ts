import { prisma } from "../prisma/prismaClient";
import { Request, Response } from "express";
import { errorMessage, successMessage } from "../common/returnMessage";

// TODO:- yup validation
export const getAllBoards = async (req: Request, res: Response) => {
  try {
    const result = await prisma.board.findMany();
    const response: successMessage = {
      message: "returned all boards",
      data: result,
    };
    res.status(200).send(response);
    return;
  } catch (error) {
    const response: errorMessage = {
      message: "Something went wrong",
    };
    res.status(500).send(response);
  }
};

export const createBoard = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      const response: errorMessage = {
        message: "no name provided",
      };
      res.status(400).send(response);
      return;
    }

    const result = await prisma.board.create({
      data: {
        name: name,
      },
    });

    const response: successMessage = {
      message: "returned all boards",
      data: result.id,
    };

    res.status(200).send(response);
    return;
  } catch (error) {
    const response: errorMessage = {
      message: "Something went wrong",
    };
    res.status(500).send(response);
  }
};

export const deleteBoard = async (req: Request, res: Response) => {
  try {
    const boardId = req.query["boardId"] as string;

    if (!boardId || boardId === "undefined") {
      const response: errorMessage = {
        message: "no boardId provided",
      };
      res.status(400).send(response);
      return;
    }

    const result = await prisma.board.delete({
      where: {
        id: boardId,
      },
    });

    const response: successMessage = {
      message: "deleted board",
      data: result.id,
    };

    res.status(200).send(response);
  } catch (error) {
    const response: errorMessage = {
      message: "Something went wrong",
    };
    res.status(500).send(response);
  }
};
