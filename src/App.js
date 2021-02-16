import React from 'react';
import {
	BrowserRouter as Router,
    Switch,
	Route
} from 'react-router-dom';

import CityLists from './components/CityLists';
import Header from './components/Header';
import NextTrip from './components/NextTrip';
import SeatsInformation from './components/SeatsInformation';
import UserAccount from './components/UserAccount';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Header />
                    <CityLists />
                </Route>
                <Route exact path="/city/:destination">
                    <Header />
                    <NextTrip />
                </Route>
                <Route exact path="/:destination/:id">
                    <Header />
                    <SeatsInformation />
                </Route>
                <Route exact path="/user">
                    <Header />
                    <UserAccount />
                </Route>
            </Switch>
        </Router>
    )
}