import { createTask, deleteTask } from "./../controllers/taskController";
import { validateColumnId } from "./../middleware/validateColumnId";
import { validateTaskId } from "./../middleware/validateTaskId";
const router = require("express").Router();

router.get("/", validateColumnId, validateTaskId);

// pass columnId in request body
router.post("/", validateColumnId, createTask);

// add taskId as query parameter and columnId to request body
router.delete("/", validateTaskId, validateColumnId, deleteTask);

// TODO: made updateTask functionality
router.put("/", validateTaskId);

module.exports = router;
