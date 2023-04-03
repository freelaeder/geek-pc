// src/AppRouter.tsx
import React from "react";
import {Router, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "@pages/loginPage";
import {createBrowserHistory} from "history";
import Layout from "@shared/layout";
import DashboardPage from "@pages/dashboardPage";

export const history = createBrowserHistory();

export default class AppRouter extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    {/*首次加载重定向login*/}
                    <Redirect from="/" to="/login" exact/>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/admin">
                        <Layout>
                            <Switch>
                                <Redirect from="/admin" to="/admin/dashboard" exact/>
                                <Route path="/admin/dashboard" component={DashboardPage}/>
                            </Switch>
                        </Layout>
                    </Route>
                </Switch>
            </Router>
        );
    }
}