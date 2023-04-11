// src/AppRouter.tsx
import React from "react";
import {Router, Redirect, Route, Switch} from "react-router-dom";
import LoginPage from "@pages/loginPage";
import {createBrowserHistory} from "history";
import Layout from "@shared/layout";
import DashboardPage from "@pages/dashboardPage";
import RouteGuard from "@shared/routeGuard";
import {isLogin} from "@utils/isLogin";
import ArticlePage from "@pages/articlePage";
import PublishPage from "@pages/publishPage";

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
                        <RouteGuard guards={[isLogin]} onRejected={() => <Redirect to="/login" push={false}/>}>
                            <Layout>
                                <Switch>
                                    <Redirect from="/admin" to="/admin/dashboard" exact/>
                                    <Route path="/admin/dashboard" component={DashboardPage}/>
                                    <Route path="/admin/article" component={ArticlePage}/>
                                    <Route path="/admin/publish" component={PublishPage} />
                                </Switch>
                            </Layout>
                        </RouteGuard>
                    </Route>
                </Switch>
            </Router>
        );
    }
}