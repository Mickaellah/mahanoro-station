import React from 'react';
import {
	BrowserRouter as Router,
    Switch,
	Route,
} from 'react-router-dom';

import CityLists from './components/CityLists';
import CityInformation from './components/CityInforamation';
import SeatsInformation from './components/SeatsInformation';
import UserAccount from './components/UserAccount';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <CityLists />
                </Route>
                <Route exact path="/city/:destination">
                    <CityInformation />
                </Route>
                <Route exact path="/:destination/:id">
                    <SeatsInformation />
                </Route>
                <Route exact path="/user">
                    <UserAccount />
                </Route>
            </Switch>
        </Router>
    )
}