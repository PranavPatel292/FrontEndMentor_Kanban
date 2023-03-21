import { prisma } from "../prisma/prismaClient";
import { Request, Response } from "express";
import { errorMessage, successMessage } from "../common/returnMessage";
import * as yup from "yup";

const columnSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required(),
});

const boardSchema = yup.object().shape({
  boardId: yup.string().required(),
  name: yup.string().required(),
  columnData: yup.array().of(columnSchema),
});

export const updateBoardAndColumn = async (req: Request, res: Response) => {
  try {
    const { name, columnData, boardId } = req.body;

    try {
      await boardSchema.validate({ name: name, columnData: columnData });
    } catch (error: any) {
      const response: errorMessage = {
        message: error.message,
      };
      res.status(400).send(response);
      return;
    }

    const existingColumn = await prisma.columns.findMany({
      where: {
        id: boardId,
      },
      select: {
        id: true,
        name: true,
      },
    });

    // make a map of the existing columns so we can search fast
    const existingColumnsById = new Map(
      existingColumn.map((column: any) => [column.id, name])
    );

    // filtering out the existing columns
    const newColumns = columnData.filter(
      (column: any) => !existingColumnsById.has(column.id)
    );

    // finding out the updated columns
    const updatedColumns = columnData.filter(
      (column: any) =>
        existingColumnsById.has(column.id) &&
        existingColumnsById.get(column.id)?.name != column.name
    );

    // now we will make a transaction to update the  columns
    const updatedBoard: any = await prisma.$transaction(async () => {
      // { name: { not: name } },
      const updateBoard = await prisma.board.update({
        where: {
          id: boardId,
        },
        data: { name: name },
      });

      // iterate through the new columns and create a new entry for each column
      for (const newColumn of newColumns) {
        await prisma.columns.create({
          data: {
            name: newColumn.name,
            boardId: boardId,
          },
        });
      }

      // iterate through the existing columns and update each column
      for (const updatedColumn of updatedColumns) {
        await prisma.columns.update({
          where: { id: updatedColumn.id },
          data: { name: updatedColumn.name },
        });
      }

      return updatedBoard;
    });

    const response: successMessage = {
      message: "returned all boards",
      data: updatedBoard,
    };
    res.status(200).send(response);
  } catch (error) {
    const response: errorMessage = {
      message: "Something went wrong",
    };
    res.status(500).send(response);
  }
};
