import { validateMultipleColumnsIds } from "./../middleware/validateColumnId";
import { updateBoard } from "./../controllers/boardAndColumnController";
import { validateBoardId } from "./../middleware/validateBoardId";
const router = require("express").Router();

// pass boardId and optional name and array of names of columns;

router.put("/", validateBoardId, validateMultipleColumnsIds, updateBoard);

module.exports = router;
