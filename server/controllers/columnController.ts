import { BoardData } from "./../common/types";
import { prisma } from "../prisma/prismaClient";
import { Request, Response } from "express";
import { errorMessage, successMessage } from "../common/returnMessage";

export const getAllColumns = async (req: Request, res: Response) => {
  try {
    const boardId = req.query["boardId"] as string;

    const result: BoardData = {};

    const colsData = await prisma.columns.findMany({
      where: {
        boardId: boardId,
      },
      select: {
        id: true,
        name: true,
        task: {
          orderBy: { position: "asc" },
          select: {
            id: true,
            columnId: true,
            title: true,
            description: true,
            subTask: {
              orderBy: { position: "asc" },
              select: { id: true, status: true, title: true, taskId: true },
            },
          },
        },
      },
    });

    colsData.map((col) => {
      result[col.id] = {
        name: col.name,
        item: col.task,
      };
    });

    const response: successMessage = {
      message: "All the columns data",
      data: result,
    };

    res.status(200).send(response);
  } catch (error) {
    const response: errorMessage = {
      message: "Something went wrong",
    };
    res.status(500).send(response);
  }
};

export const getAllColumnsName = async (req: Request, res: Response) => {
  try {
    const boardId = req.query["boardId"] as string;

    const result = await prisma.columns.findMany({
      where: {
        boardId: boardId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    const response: successMessage = {
      message: "All the columns name",
      data: result,
    };

    res.status(200).send(response);
  } catch (error) {
    const response: errorMessage = {
      message: "Something went wrong",
    };
    res.status(500).send(response);
  }
};

export const createColumn = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const boardId = req.query["boardId"] as string;

    if (!boardId || !name || boardId === "undefined") {
      const response: errorMessage = {
        message: "no boardId or name provided",
      };
      res.status(400).send(response);
      return;
    }

    const result = await prisma.columns.create({
      data: {
        name: name,
        boardId: boardId,
      },
    });

    const response: successMessage = {
      message: "Column added",
      data: result,
    };

    res.status(200).send(response);
  } catch (error) {
    const response: errorMessage = {
      message: "Something went wrong",
    };
    res.status(500).send(response);
  }
};

export const deleteColumn = async (req: Request, res: Response) => {
  try {
    const { columnId } = req.body;

    if (!columnId) {
      const response: errorMessage = {
        message: "no columnId provided",
      };
      res.status(400).send(response);
      return;
    }

    const result = await prisma.columns.delete({
      where: {
        id: columnId,
      },
    });

    const response: successMessage = {
      message: "Successfully deleted column",
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
