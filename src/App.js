import {BrowserRouter} from 'react-router-dom'

import Header from "./Components/Header";
import Routing from "./Routing"

import './App.css';
import AuthContextProvider from './Context/Contexts/AuthContext';
import FileContextProvider from './Context/Contexts/FileContext';
require('dotenv').config()


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter>
          <FileContextProvider>
            <Header/>
            <Routing/>
          </FileContextProvider>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
