import React from "react";
import {
    HashRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Home from "./Home"
import Orders from "./Orders"
import { Batch, Print } from "./Print"

export default function Router(props) {
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
                    </ul>
                </nav>

                {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                <Switch>
                    <Route path="/print/{:number}">
                        {/* <Print order={props.orders.pop()} /> */}
                    </Route>

                    <Route path="/orders">
                        <Orders orders={props.orders} />
                    </Route>
                    <Route path={`/order/:orderId`} exact component={Print} {...props} />
                    <Route path={`/batch/:orderId`} exact component={Batch} {...props} />

                    <Route path="/" exact>
                        <Home />
                    </Route>

                </Switch>
            </div>
        </HashRouter>
    );
}