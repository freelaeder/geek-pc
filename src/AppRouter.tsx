// src/AppRouter.tsx
import React from "react";
import { Router, Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "@pages/loginPage";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Redirect from="/" to="/login" exact />
                    <Route path="/login" component={LoginPage} />
                </Switch>
            </Router>
        );
    }
}