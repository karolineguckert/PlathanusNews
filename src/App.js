import TopBar from "./news/TopBar";
import React from "react";
import View from "./news/view/View";
import {Toolbar} from "@material-ui/core";
import  {BrowserRouter, Route, Redirect} from "react-router-dom";
import Register from "./news/register/Register";

function App() {
  return (
        <header>
            <TopBar/>
            <Toolbar/>
            <BrowserRouter>
                <Route exact path={'/'}>
                    <Redirect to={'/view'}/>
                </Route>
                <Route path={'/view'}>
                    <View/>
                </Route>
                <Route path={'/register'}>
                    <Register/>
                </Route>
            </BrowserRouter>
        </header>
  );
}

export default App;
