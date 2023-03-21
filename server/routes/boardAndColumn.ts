import { updateBoardAndColumn } from "./../controllers/boardAndColumnController";
import { validateBoardId } from "./../middleware/validateBoardId";
const router = require("express").Router();

// pass boardId and optional name and array of names of columns;
router.put("/", validateBoardId, updateBoardAndColumn);

module.exports = router;
