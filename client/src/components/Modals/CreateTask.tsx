import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { RxCross2 } from "react-icons/rx";
import { getColumnNames } from "../../requests/column";
import { useQuery, useQueryClient } from "react-query";
import { createTask, getTask, updateTask } from "../../requests/task";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "./Modal";
import { BooleanParam, StringParam, useQueryParam } from "use-query-params";
import { showToast } from "../Common/Toast";
import ScrollableFeed from "react-scrollable-feed";

interface Task {
  subTasks: Array<any>;
  title: string;
  description: string;
  columnId: string;
}
interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const subTasksPlaceHolders = [
  "make coffee",
  "make presentation",
  "assign task",
  "scheduler interview",
];

const validateSubTask = Yup.object().shape({
  title: Yup.string().min(1).required("Please provide title"),
  id: Yup.string().optional(),
  taskId: Yup.string().optional(),
  status: Yup.string().optional(),
  position: Yup.number().optional(),
});

const generateValidationSchema = () => {
  return Yup.object().shape({
    title: Yup.string().min(1).required("Please provide title"),
    description: Yup.string().min(1).required("Please provide description"),
    columnId: Yup.string().required("Please provide columnId"),
    subTasks: Yup.array().of(validateSubTask.required()),
  });
};

const taskValidationSchema = Yup.object().shape({
  title: Yup.string().min(1).required("Please provide title"),
  description: Yup.string().min(1).required("Please provide description"),
  columnId: Yup.string().required("Please provide columnId"),
  subTasks: Yup.array().of(validateSubTask.required()),
});

// TODO: scroll to the last position of subtasks
export const CreateTask = ({ isOpen, onRequestClose }: ModalProps) => {
  const [columnsName, setColumnNames]: any = useState(null);

  const className =
    "absolute top-1/2  left-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-darkBG rounded-lg p-8 h-[343px] w-[659px] md:min-h-[675px] md:min-w-[480px]";

  const [queryParams, _] = useQueryParam("boardId", StringParam);
  console.log(queryParams);
  const [taskId, setTaskId] = useQueryParam("taskId", StringParam);
  const [editTask, setEditTask] = useQueryParam("EditBoard", BooleanParam);

  const componentRef = useRef<HTMLDivElement>(null);

  const { data: taskData, isLoading: taskDataLoading } = useQuery(
    ["getTaskByIdForUpdate", taskId],
    () => getTask(taskId),
    {
      staleTime: Infinity,
      enabled: !editTask === false,
    }
  );

  useEffect(() => {
    componentRef?.current?.scrollIntoView();
  });

  /* get columns names of specific board */
  const { data } = useQuery(
    ["allColumnsNames", queryParams],
    () => getColumnNames(queryParams),
    {
      staleTime: Infinity,
    }
  );

  const queryClient = useQueryClient();
  const { mutate } = createTask();

  const { mutate: editTaskMutate } = updateTask();

  useEffect(() => {
    setColumnNames(data?.data.data);
  }, [data]);

  const initialData = {
    subTasks: editTask && !taskDataLoading ? taskData?.data.data.subTask : [""],
    title: editTask && !taskDataLoading ? taskData?.data.data.title : "",
    description:
      editTask && !taskDataLoading ? taskData?.data.data.description : "",
    columnId: editTask && !taskDataLoading ? taskData?.data.data.columnId : "",
  };

  return (
    <>
      {taskDataLoading ? (
        <h1>Loading</h1>
      ) : (
        <Modal
          className={className}
          isOpen={isOpen || editTask !== undefined}
          onRequestClose={onRequestClose}
          children={
            <div className="flex z-10 flex-col p-8 space-y-5">
              <h1 className="text-white leading-[22.68px] text-xl">
                {editTask ? `Edit task` : `Add new task`}
              </h1>

              {columnsName && (
                <Formik
                  initialValues={initialData}
                  validationSchema={generateValidationSchema()}
                  onSubmit={(values, { resetForm }) => {
                    const data = {
                      ...values,
                      subTasks: values.subTasks.map((value: any, _: number) => {
                        if (value.id)
                          return { id: value.id, title: value.title };
                        return { title: value.title };
                      }),
                    };
                    //

                    if (editTask) {
                      const editTaskData = {
                        ...data,
                        taskId: taskData?.data.data.id,
                      };
                      editTaskMutate(editTaskData, {
                        onSuccess: () => {
                          showToast.success("Task updated successfully");
                        },
                        onError: () => {
                          showToast.error("Something went wrong");
                        },
                        onSettled: () => {
                          queryClient.invalidateQueries("allColumnData");
                          queryClient.invalidateQueries("getTaskByIdForUpdate");
                          queryClient.invalidateQueries("getTaskById");
                        },
                      });
                    } else {
                      mutate(data, {
                        onSuccess: () => {
                          showToast.success("Data inserted successfully");
                          resetForm();
                        },
                        onError: () => {
                          showToast.error("Sorry something went wrong");
                        },
                        onSettled: () => {
                          queryClient.invalidateQueries("allColumnData");
                          resetForm();
                        },
                      });
                    }
                  }}
                >
                  {({ values, errors, touched, dirty }) => (
                    <Form>
                      <div className="flex flex-col space-y-5">
                        <div className="flex flex-col space-y-2">
                          <label className="text-white text-xs leading-[15.12px] font-bold ">
                            Title
                          </label>
                          <Field
                            name="title"
                            placeholder="eg: take coffee break"
                            className="bg-darkGrey border border-lines text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                          {errors.title && touched.title ? (
                            <p className="text-center p-0 text-[#FC1111] font-[500] text-sm   leading-[27px]">
                              {<span>errors.title</span>}
                            </p>
                          ) : null}
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="text-white text-xs leading-[15.12px] font-bold ">
                            Description
                          </label>
                          <Field
                            as="textarea"
                            name="description"
                            value={values?.description}
                            placeholder={`e.g. It’s always good to take a break.\n`}
                            className="bg-darkGrey border h-20 placeholder:italic placeholder:truncate border-lines text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          />
                          {errors.description && touched.description ? (
                            <p className="text-center p-0 text-[#FC1111] font-[500] text-sm   leading-[27px]">
                              {<span>errors.description</span>}
                            </p>
                          ) : null}
                        </div>

                        <div className="flex flex-col space-y-2  ">
                          <label className="text-white text-xs leading-[15.12px] font-bold">
                            Subtasks
                          </label>

                          <FieldArray name="subTasks">
                            {({ remove, push }) => (
                              <div>
                                {/* TODO: make last element in focus */}

                                <div className="max-h-[100px] overflow-y-scroll">
                                  <ScrollableFeed>
                                    {values.subTasks.map(
                                      (_: any, index: number) => (
                                        <div key={index}>
                                          <div className="flex flex-row space-x-5 overflow-y-scroll justify-center items-center">
                                            <Field
                                              placeholder={`eg: ${
                                                subTasksPlaceHolders[
                                                  index %
                                                    subTasksPlaceHolders.length
                                                ]
                                              } `}
                                              className={`bg-darkGrey border mb-2 text-white border-lines  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                              name={`subTasks.${index}.title`}
                                              value={
                                                values.subTasks[index]?.title ??
                                                ""
                                              }
                                            />

                                            <RxCross2
                                              color={"red"}
                                              size="25px"
                                              onClick={() => {
                                                remove(index);
                                              }}
                                            />

                                            <ErrorMessage
                                              component="p"
                                              name={`subTasks.${index}.id`}
                                              className="text-red text-sm min-w-[150px] text-right"
                                            />
                                          </div>
                                        </div>
                                      )
                                    )}
                                  </ScrollableFeed>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => {
                                    push("");
                                  }}
                                  className="w-full mt-5 flex justify-center items-center bg-white rounded-3xl font-bold h-10 text-mainPurple"
                                >
                                  + Add New Subtask
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="text-white text-xs leading-[15.12px] font-bold ">
                            Status
                          </label>

                          <Field
                            name="columnId"
                            as="select"
                            className="bg-darkGrey border border-lines text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option></option>
                            {columnsName.columns.map(
                              (column: any, index: number) => {
                                return (
                                  <option value={column.id} key={index}>
                                    {column.name.toUpperCase()}
                                  </option>
                                );
                              }
                            )}
                          </Field>
                        </div>

                        <div className="flex flex-row justify-center items-center">
                          <button
                            type="submit"
                            className={`focus:outline-none w-full  text-white bg-mainPurple hover:bg-mainPurpleHover focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                              dirty === false
                                ? "disabled:bg-gray-400 disabled:opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={dirty === false}
                          >
                            {`${editTask ? "Update Task" : "Create Task"}`}
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          }
        />
      )}
    </>
  );
};
