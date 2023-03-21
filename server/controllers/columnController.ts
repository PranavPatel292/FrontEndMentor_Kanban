import { BoardData } from "../common/BoardData";
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
            position: true,
            subTask: {
              orderBy: { position: "asc" },
              select: {
                id: true,
                status: true,
                title: true,
                taskId: true,
                position: true,
              },
            },
          },
        },
      },
    });

    colsData.map((col) => {
      result[col.id] = {
        name: col.name,
        items: col.task,
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

// TODO: use yup for validation purposes
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

// TODO: use yup for validation purposes
export const moveWithInTheColumn = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    for (let i = 0; i < data.length; i++) {
      await prisma.task.update({
        where: {
          id: data[i].taskId,
        },
        data: {
          // assuming the 0th index value
          position: data[i].position + 1,
        },
      });
    }

    const response: successMessage = {
      message: "updated column",
    };

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    const response: errorMessage = {
      message: "Something went wrong",
    };
    res.status(500).send(response);
  }
};

export const moveInterDataColumn = async (req: Request, res: Response) => {
  try {
    const {
      destinationColumnId,
      sourceColumnId,
      sourceColData,
      destinationColData,
    } = req.body.data;

    if (
      !destinationColumnId ||
      !sourceColumnId ||
      !sourceColData ||
      !destinationColData
    ) {
      const response: errorMessage = {
        message: "bad request",
      };
      res.status(400).send(response);
      return;
    }

    // update all source column data
    for (let i = 0; i < sourceColData.length; ++i) {
      await prisma.task.update({
        where: {
          id: sourceColData[i].id,
        },
        data: {
          columnId: sourceColumnId,
          position: i + 1,
        },
      });
    }

    // update all destination column data
    for (let i = 0; i < destinationColData.length; ++i) {
      await prisma.task.update({
        where: {
          id: destinationColData[i].id,
        },
        data: {
          columnId: destinationColumnId,
          position: i + 1,
        },
      });
    }

    const response: successMessage = {
      message: "data moved",
      data: [],
    };

    res.status(200).send(response);
  } catch (error) {
    const response: errorMessage = {
      message: "Something went wrong",
    };
    console.log(response);
    res.status(500).send(response);
  }
};
