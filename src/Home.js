import React from 'react';
import { Route, Redirect } from 'react-router-dom';
function Home() {
    return (<Redirect to={"/"} />)
}

export default Home;