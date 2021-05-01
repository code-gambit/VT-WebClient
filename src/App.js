import {useState} from 'react';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom'

import Header from "./Components/Header";
import Homepage from "./Components/Screens/Homepage";
import Dashboard from "./Components/Screens/Dashboard";
import FileDetail from "./Components/Screens/FileDetail";
import Files from "./Components/Screens/Files";
import Profile from "./Components/Screens/Profile";
import About from './Components/Screens/About';

import './App.css';
import AuthContextProvider from './Context/Contexts/AuthContext';
import FileContextProvider from './Context/Contexts/FileContext';


const Routing= () =>{
  const history=useHistory()
  const auth = JSON.parse(localStorage.getItem("auth"));
  if(!auth){
    if(!(history.location.pathname="/") && !(history.location.pathname="/about")){
      history.push("/");
    }
  }

  return(
    <Switch>
      <Route exact path="/">
        <Homepage/>
      </Route>
      <Route exact path="/dashboard">
        <Dashboard/>
      </Route>
      <Route exact path="/files">
        <Files/>
      </Route>
      <Route exact path="/file/:f_timestamp">
        <FileDetail/>
      </Route>
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route exact path="/about">
        <About/>
      </Route>
    </Switch>
  )
}

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
