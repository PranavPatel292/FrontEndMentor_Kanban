import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "./../controllers/taskController";
import { validateColumnId } from "./../middleware/validateColumnId";
import { validateTaskId } from "./../middleware/validateTaskId";
const router = require("express").Router();

router.get("/", validateTaskId, getTask);

// pass columnId in request body
router.post("/", validateColumnId, createTask);

// add taskId as query parameter and columnId to request body
router.delete("/", validateTaskId, validateColumnId, deleteTask);

router.put("/updateTask", validateTaskId, updateTask);
// TODO: made updateTask functionality

module.exports = router;
