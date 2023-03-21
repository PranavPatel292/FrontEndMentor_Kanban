import { validateColumnId } from "./../middleware/validateColumnId";
import {
  createColumn,
  deleteColumn,
  getAllColumns,
  getAllColumnsName,
} from "../controllers/columnController";
import { validateBoardId } from "./../middleware/validateBoardId";
const router = require("express").Router();

router.get("/allColumns", validateBoardId, getAllColumns);

router.get("/allColumnsName", validateBoardId, getAllColumnsName);

// pass boardId as query parameter and column name in request body
router.post("/", validateBoardId, createColumn);

// pass boardId as query parameter and columnId in request body
router.delete("/", validateBoardId, validateColumnId, deleteColumn);

// TODO: how to handle update request

module.exports = router;
