import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Container from "./components/Container";
//Redux
import {Provider} from "react-redux";
import store from "./store";
//Firebase
import "./components/Firebase/Firebase";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Container/>
      </Router>
    </Provider>
  );
};

export default App;
