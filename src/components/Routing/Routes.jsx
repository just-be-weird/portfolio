import React from 'react'
import { Route, Switch } from 'react-router-dom'
import About from '../Container/Layout/About';
import Experience from '../Container/Layout/Experience';
import InfinityStones from '../Container/Layout/InfinityStones';
import Projects from '../Container/Layout/Projects';
import Contact from '../Container/Layout/Contact';
import NotFound from '../NotFound/NotFound'

export default function Routes() {
    return (
        <div className="container">
            <Switch>
                <Route exact path='/about' component={About} />
                <Route exact path='/experience' component={Experience} />
                <Route exact path='/stones' component={InfinityStones} />
                <Route exact path='/projects' component={Projects} />
                <Route exact path='/contact' component={Contact} />
                <Route component={NotFound} />
            </Switch>
        </div>
    )
}
