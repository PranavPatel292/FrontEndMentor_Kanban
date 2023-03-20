interface SubTask {
  title: string;
  id: string;
  status: "COMPLETE" | "INCOMPLETE";
  taskId: string;
}
interface ColumnItem {
  columnId: string;
  title: string;
  description: string;
  subTask: SubTask[];
  id: string;
}

interface ColumnData {
  name: string;
  item: ColumnItem[];
}
export interface BoardData {
  [columnId: string]: ColumnData;
}
