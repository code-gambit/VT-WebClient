import Homepage from "./Components/Screens/Homepage";
import Dashboard from "./Components/Screens/Dashboard";
import FileDetail from "./Components/Screens/FileDetail";
import Files from "./Components/Screens/Files";
import Profile from "./Components/Screens/Profile";
import About from "./Components/Screens/About";
import Authenticate from "./Components/Screens/Authentication"
import { useContext } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { AuthContext } from "./Context/Contexts/AuthContext";
import Download from "./Components/Screens/Download";

const Routing = () => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth) {
    if (
      history.location.pathname !== "/about" &&history.location.pathname !== "/authenticate"

    ) {
      history.push("/");
    }
  }
  return (
    <>
      {authState.auth.PK ? (
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/files" component={Files} />
          <Route exact path="/file/:fileId" component={FileDetail} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/about" component={About} />
          <Route exact path="/:urlId" component={Download}/>
          <Route>
            <Redirect to="/dashboard" /> <Dashboard />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/authenticate" component={Authenticate}/>
          <Route exact path="/:urlId" component={Download}/>
          <Route exact path="/" component={Homepage} />
        </Switch>
      )}
    </>
  );
};

export default Routing;
