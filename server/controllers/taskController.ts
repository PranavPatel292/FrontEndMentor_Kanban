import { prisma } from "../prisma/prismaClient";
import { Request, Response } from "express";
import { errorMessage, successMessage } from "../common/returnMessage";
import * as yup from "yup";

const decrementEachPosition = async (columnId: string) => {
  const tasks = await prisma.task.findMany({
    where: { columnId },
    orderBy: { position: "asc" },
  });

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    await prisma.task.update({
      where: {
        id: task.id,
      },
      data: {
        position: i + 1,
      },
    });
  }
};

const subTaskSchema = yup.object().shape({
  title: yup.string().required(),
});

const createTaskSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  subTasks: yup.array().of(subTaskSchema).required(),
  columnId: yup.string().required(),
});

export const getTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.query["taskId"] as string;

    const result = await prisma.task.findMany({
      where: {
        id: taskId,
      },
      orderBy: { position: "asc" },
      select: {
        id: true,
        title: true,
        description: true,
        columnId: true,
        columName: true,
        position: true,
        subTask: {
          orderBy: { position: "asc" },
          select: {
            id: true,
            title: true,
            taskId: true,
            status: true,
            position: true,
          },
        },
      },
    });

    const response: successMessage = {
      message: "returned specified task",
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

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, subTasks, columnId } = req.body;

    try {
      await createTaskSchema.validate({
        title: title,
        description: description,
        subTasks: subTasks,
        columnId: columnId,
      });
    } catch (error: any) {
      const response: errorMessage = {
        message: error.message,
      };
      res.status(400).send(response);
      return;
    }

    const result = await prisma.$transaction(async () => {
      // count the total number
      const totalRecords = await prisma.task.count({
        where: {
          columnId: columnId,
        },
      });

      const result = await prisma.task.create({
        data: {
          title: title,
          description: description,
          position: totalRecords + 1,
          columnId: columnId,
        },
      });

      for (const subTask of subTasks) {
        // find the total number of subtask for given taskId
        const totalRecords = await prisma.subTask.count({
          where: {
            taskId: result.id,
          },
        });

        // add into the database new subtask
        await prisma.subTask.create({
          data: {
            title: subTask.title,
            position: totalRecords + 1,
            taskId: result.id,
          },
        });
      }
    });

    const response: successMessage = {
      message: "All the columns name",
      data: [],
    };

    res.status(200).send(response);
  } catch (error) {
    const response: errorMessage = {
      message: "Something went wrong",
    };
    res.status(500).send(response);
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.query["taskId"] as string;
    const { columnId } = req.body;

    const result = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    await decrementEachPosition(columnId);
    const response: successMessage = {
      message: "returned specified task",
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
