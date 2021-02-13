import React from 'react';
import {
	BrowserRouter as Router,
    Switch,
	Route,
} from 'react-router-dom';

import CityLists from './components/CityLists'

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <CityLists />
                </Route>
            </Switch>
        </Router>
    )
}