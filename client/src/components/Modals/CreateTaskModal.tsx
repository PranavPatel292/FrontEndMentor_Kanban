import { Formik, Form, Field, FieldArray } from "formik";
import { useRef } from "react";
import * as Yup from "yup";
import ReactModal from "react-modal";
import { RxCross2 } from "react-icons/rx";

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

export const CreateTaskModal = ({ isOpen, onRequestClose }: ModalProps) => {
  return (
    <>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        shouldCloseOnOverlayClick={true}
        shouldCloseOnEsc={true}
        className="absolute top-1/2  left-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-darkBG rounded-lg p-8 h-[343px] w-[659px] md:min-h-[675px] md:min-w-[480px]"
        overlayClassName="fixed inset-0 bg-black opacity-95"
      >
        <div className="flex flex-col p-8 space-y-5">
          <h1 className="text-white leading-[22.68px] text-xl">Add new task</h1>

          <Formik
            initialValues={{ fields: [""] }}
            onSubmit={(values) => console.log(values.fields)}
          >
            {({ values }) => (
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
                  </div>

                  <div className="flex flex-col space-y-2  ">
                    <label className="text-white text-xs leading-[15.12px] font-bold">
                      Subtasks
                    </label>

                    <FieldArray name="fields">
                      {({ insert, remove, push }) => (
                        <div>
                          {/* TODO: make last element in focus */}
                          <div className="max-h-[100px] overflow-y-scroll">
                            {values.fields.map((field, index) => (
                              <div
                                key={index}
                                className="flex flex-row space-x-5 overflow-y-scroll justify-center items-center"
                              >
                                <Field
                                  placeholder={`eg: ${
                                    subTasksPlaceHolders[
                                      index % subTasksPlaceHolders.length
                                    ]
                                  } `}
                                  className="bg-darkGrey border mb-2 border-lines text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  name={`fields.${index}`}
                                />
                                <RxCross2
                                  color={"red"}
                                  size="25px"
                                  onClick={() => remove(index)}
                                />
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => push("")}
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
                      name="status"
                      as="select"
                      className="bg-darkGrey border border-lines text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option>To do</option>
                      <option>In progress</option>
                      <option>Done</option>
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
        </div>
      </ReactModal>
    </>
  );
};
