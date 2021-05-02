import Homepage from "./Components/Screens/Homepage";
import Dashboard from "./Components/Screens/Dashboard";
import FileDetail from "./Components/Screens/FileDetail";
import Files from "./Components/Screens/Files";
import Profile from "./Components/Screens/Profile";
import About from "./Components/Screens/About";
import { useContext } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { AuthContext } from "./Context/Contexts/AuthContext";

const Routing = () => {
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const auth = JSON.parse(localStorage.getItem("auth"));
  if (!auth) {
    console.log(history);
    if (
      (history.location.pathname !== "/") &&
      (history.location.pathname !== "/about")
    ) {
      history.push("/");
    }
  }
  return (
    <>
      {authState.auth.PK ? (
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/files" component={Files} />
          <Route exact path="/file/:f_timestamp" component={FileDetail} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/about" component={About} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/about" component={About} />
          <Route exact path="/" component={Homepage} />
        </Switch>
      )}
    </>
  );
};

export default Routing;
