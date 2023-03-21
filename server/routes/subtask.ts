import { deleteSubTask } from "../controllers/subTaskController";
import { validateSubTaskId } from "./../middleware/validateSubTaskId";
const router = require("express").Router();

router.delete("/", validateSubTaskId, deleteSubTask);

module.exports = router;
