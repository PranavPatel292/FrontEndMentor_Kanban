import express from "express";
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/api/v1/board", require("./routes/board"));
app.use("/api/v1/column", require("./routes/column"));
app.use("/api/v1/boardAndColumnUpdate", require("./routes/boardAndColumn"));
app.use("/api/v1/task", require("./routes/task"));
app.use("/api/v1/subTask", require("./routes/subtask"));

app.listen(port, () => console.log("Server listening on port " + port));
