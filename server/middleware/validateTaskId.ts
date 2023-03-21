import { errorMessage } from "./../common/returnMessage";
import { prisma } from "./../prisma/prismaClient";
import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

const schema = yup.object().shape({
  taskId: yup.string().required(),
});

export const validateTaskId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const taskId = req.query["taskId"] as string;

  try {
    await schema.validate({ taskId: taskId });
  } catch (error: any) {
    const response: errorMessage = {
      message: error.message,
    };
    res.status(400).send(response);
    return;
  }

  const result = await prisma.task.findFirst({
    where: {
      id: taskId,
    },
  });

  if (!result) {
    const response: errorMessage = {
      message: "Invalid taskId",
    };
    res.status(404).send(response);
    return;
  }

  next();
};
