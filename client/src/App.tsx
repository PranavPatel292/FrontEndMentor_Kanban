import { Container } from "./components/Container";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import Modal from "react-modal";

function App() {
  const queryClient = new QueryClient();
  Modal.setAppElement("#root");

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Container />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </QueryClientProvider>
    </>
  );
}

export default App;
