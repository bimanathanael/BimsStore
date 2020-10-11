import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {Home} from './pages/Home.js'
import {StoreProvider} from "./store"
import {AddProduct} from './pages/AddProduct'


function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <Link to="/"> Home</Link>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/addProduct">
              <AddProduct />
            </Route>
          </Switch>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
