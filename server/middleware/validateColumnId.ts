import { errorMessage } from "./../common/returnMessage";
import { prisma } from "./../prisma/prismaClient";
import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

const schema = yup.object().shape({
  columnId: yup.string().required(),
});

export const validateColumnId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { columnId } = req.body;

  try {
    await schema.validate(req.body);
  } catch (error: any) {
    const response: errorMessage = {
      message: error.message,
    };
    res.status(400).send(response);
    return;
  }

  const result = await prisma.columns.findFirst({
    where: {
      id: columnId,
    },
  });

  if (!result) {
    const response: errorMessage = {
      message: "boardId is not in the database",
    };
    res.status(404).send(response);
    return;
  }

  next();
};
