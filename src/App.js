import { BrowserRouter } from 'react-router-dom'
import Header from "./Components/Header";
import Routing from "./Routing.js"

import './App.css';
import AuthContextProvider from './Context/Contexts/AuthContext';
import FileContextProvider from './Context/Contexts/FileContext';

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
