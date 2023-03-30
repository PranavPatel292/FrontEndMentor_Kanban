import { Modal } from "./Modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createBoard } from "../../requests/board";
import { showToast } from "../Common/Toast";
import { useQueryClient } from "react-query";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const CreateBoardValidationSchema = Yup.object().shape({
  name: Yup.string().required("Please provide name"),
});

export const CreateBoard = ({ isOpen, onRequestClose }: ModalProps) => {
  const className =
    "absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 bg-darkBG rounded-lg p-8 h-[343px] w-[659px] md:min-h-[200px] md:min-w-[480px]";

  const { mutate } = createBoard();
  const queryClient = useQueryClient();

  return (
    <>
      <Modal
        isOpen={isOpen}
        className={className}
        onRequestClose={onRequestClose}
        children={
          <div className="flex flex-col p-8 space-y-10">
            <h1 className="text-white leading-[22.68px] text-xl">
              Add new board
            </h1>
            <Formik
              initialValues={{ name: "" }}
              validationSchema={CreateBoardValidationSchema}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                mutate(values, {
                  onSuccess: () => {
                    showToast.success("New board added");
                    resetForm();
                  },
                  onError: () => {
                    showToast.error("Something went wrong");
                  },
                  onSettled: () => {
                    queryClient.invalidateQueries("allBoards");
                  },
                });
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="flex flex-col space-y-10">
                    <div className="flex flex-col space-y-2">
                      <label className="text-white text-xs leading-[15.12px] font-bold ">
                        Name
                      </label>
                      <Field
                        name="name"
                        placeholder="eg: Todo"
                        className="bg-darkGrey border border-lines text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {errors.name && touched.name ? (
                        <p className="text-center p-0 text-[#FC1111] font-poppins font-[500] text-sm   leading-[27px]">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>
                    <div className="flex flex-row justify-center items-center">
                      <button
                        type="submit"
                        className="focus:outline-none w-full  text-white bg-mainPurple hover:bg-mainPurpleHover focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      >
                        Create Board
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        }
      />
    </>
  );
};
