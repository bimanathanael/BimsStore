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
import {UpdateProduct} from './pages/UpdateProduct'


function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <Link className="btn btn-success ml-2 mt-2" to="/"> Home</Link>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/addProduct">
              <AddProduct />
            </Route>
            <Route path="/updateProduct">
              <UpdateProduct />
            </Route>
          </Switch>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
