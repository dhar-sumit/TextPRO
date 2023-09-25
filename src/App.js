//import logo from './logo.svg';
import React,{ useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";

function App() {
  // setting alert...
  const [alert,setAlert] = useState(null);
  function showAlert(message,type){
    setAlert({
      msg : message,
      type: type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500);
  }
  
  // toggle between light mode & dark mode...
  const [mode,setMode] = useState("light");

  function tglMode(){
    if(mode === "light"){
      setMode("dark");
      document.body.style.backgroundColor = '#1b4d4d';
      showAlert("Dark mode was enabled...","success");
    }
    else{
      setMode("light");
      document.body.style.backgroundColor = 'white';
      showAlert("Light mode was enabled...","primary");
    }
  }


  return (
    <>
      <BrowserRouter>
        <Navbar title="TextPRO" mode={mode} toggleMode={tglMode} />
        <Alert alert={alert} />
        <div className="container my-4">
          <Routes>
            <Route exact path="/about" element={<About heading="About Us" />} />
            <Route exact path="/" element={<TextForm heading="Enter the text to analyze : " mode={mode} showAlert={showAlert} />} />              
          </Routes>
          {/* <About heading="About Us" /> */}
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
