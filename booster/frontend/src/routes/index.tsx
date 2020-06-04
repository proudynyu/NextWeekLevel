import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import CreatePoint from '../pages/CreatePoint';

const Router: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/create-point" exact component={CreatePoint} />
            </Switch>
        </BrowserRouter>
    );
}

export default Router;