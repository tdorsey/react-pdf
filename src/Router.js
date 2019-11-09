import React from "react";
import {
    HashRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from "./Home"
import Orders from "./Orders"
import Print from "./Print"

export default function Router() {
    return (
        <HashRouter>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/orders">Orders</Link>
                        </li>
                        <li>
                            <Link to="/print">Print</Link>
                        </li>
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/print">
                        <Print />
                    </Route>

                    <Route path="/orders">
                        <Orders />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </HashRouter>
    );
}