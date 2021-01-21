import { Container } from "@material-ui/core";
import "antd/dist/antd.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import './App.css';
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
const App = () => {
  return (
    <Container maxWidth="lg">
      <Navbar />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/login">
          <Auth />
        </Route>
        <Route path="/sineUp">
          <Auth />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
