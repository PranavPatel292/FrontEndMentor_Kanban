import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import ReactModal from "react-modal";
import { RxCross2 } from "react-icons/rx";
import { getColumnNames } from "../../requests/column";
import { useQuery, useQueryClient } from "react-query";
import { createTask } from "../../requests/task";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "./Modal";
import { StringParam, useQueryParam } from "use-query-params";
import { showToast } from "../Common/Toast";

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

const taskValidationSchema = Yup.object().shape({
  title: Yup.string().min(1).required("Please provide title"),
  description: Yup.string().min(1).required("Please provide description"),
  columnId: Yup.string().required("Please provide columnId"),
  subTasks: Yup.array().of(Yup.string().required("Can't be empty")).required(),
});

// TODO: scroll to the last position of subtasks
export const CreateTask = ({ isOpen, onRequestClose }: ModalProps) => {
  const [columnsName, setColumnNames]: any = useState(null);

  const className =
    "absolute top-1/2  left-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-darkBG rounded-lg p-8 h-[343px] w-[659px] md:min-h-[675px] md:min-w-[480px]";

  const [queryParams, _] = useQueryParam("boardId", StringParam);

  // get columns names of specific board
  const { data, isLoading } = useQuery(
    ["allColumnsNames", queryParams],
    () => getColumnNames(queryParams),
    {
      staleTime: Infinity,
    }
  );

  const queryClient = useQueryClient();
  const { mutate } = createTask();

  useEffect(() => {
    setColumnNames(data?.data.data);
  }, [data]);

  return (
    <Modal
      className={className}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      children={
        <div className="flex flex-col p-8 space-y-5">
          <h1 className="text-white leading-[22.68px] text-xl">Add new task</h1>

          {columnsName && (
            <Formik
              initialValues={{
                subTasks: [""],
                title: "",
                description: "",
                columnId: columnsName.columns[0],
              }}
              validationSchema={taskValidationSchema}
              onSubmit={(values, { resetForm }) => {
                const data = {
                  ...values,
                  subTasks: values.subTasks.map((value: any, index) => {
                    return { title: value };
                  }),
                };
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
                  },
                });
              }}
            >
              {({ values, errors, touched }) => (
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
                          {errors.title}
                        </p>
                      ) : null}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="text-white text-xs leading-[15.12px] font-bold ">
                        Description
                      </label>
                      <Field
                        name="description"
                        placeholder={`e.g. It’s always good to take a break.\n`}
                        className="bg-darkGrey border h-20 placeholder:italic placeholder:truncate border-lines text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.description && touched.description ? (
                        <p className="text-center p-0 text-[#FC1111] font-[500] text-sm   leading-[27px]">
                          {errors.description}
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
                              {values.subTasks.map((_, index) => (
                                <div key={index}>
                                  <div className="flex flex-row space-x-5 overflow-y-scroll justify-center items-center">
                                    <Field
                                      placeholder={`eg: ${
                                        subTasksPlaceHolders[
                                          index % subTasksPlaceHolders.length
                                        ]
                                      } ${
                                        errors.subTasks && touched.subTasks
                                          ? "text-red"
                                          : ""
                                      } `}
                                      className={`bg-darkGrey border mb-2 text-white border-lines  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                                      name={`subTasks.${index}`}
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
                                      name={`subTasks.${index}`}
                                      className="text-red text-sm min-w-[150px] text-right"
                                    />
                                  </div>
                                </div>
                              ))}
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
                        className="focus:outline-none w-full  text-white bg-mainPurple hover:bg-mainPurpleHover focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Create Task
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
  );
};
