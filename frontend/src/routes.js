import React, {Component} from 'react';
import { Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import SignInScreen from './Landing';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={SignInScreen} />
                    <Route path="/home" component={Home} />
                </Switch>
            </Router>
        )
    }
}