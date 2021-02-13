import React from 'react';
import {
	BrowserRouter as Router,
    Switch,
	Route,
} from 'react-router-dom';

import CityLists from './components/CityLists';
import CityInformation from './components/CityInforamation';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <CityLists />
                </Route>
                <Route exact path="/:destination">
                    <CityInformation />
                </Route>
            </Switch>
        </Router>
    )
}