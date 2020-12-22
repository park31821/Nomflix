import React from "react";
import {BrowserRouter as Router,Route, Switch,Redirect} from "react-router-dom";
import Header from "./Header";
import Home from "../Routes/Home";
import Detail from "../Routes/Detail";
import TV from "../Routes/TV";
import Search from "../Routes/Search";



const BrowserRouter=()=>(
    <Router>
        <>
            <Header />
            <Switch>
                <Route path ="/" exact component={Home} />
                <Route path ="/detail" component={Detail} />
                <Route path ="/tv" component={TV} />
                <Route path ="/search" component={Search} />
                <Route path ="/movie/:id" component={Detail}/>
                <Route path ="/show/:id" component={Detail}/>
                <Redirect from="*" to="/" />
            </Switch>
        </>
    </Router>
);

export default BrowserRouter