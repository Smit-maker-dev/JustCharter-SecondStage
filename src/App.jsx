import { ToastContainer } from 'react-toastify';
import "./App.css";
import Router from "./RouterFile/Router";
import "../src/Firebase/firebase";

function App() {
  return (
    <>
      <Router />
      <ToastContainer />
    </>
  );
}

export default App;
