import React from 'react'
import {ProductsList, FetchProducts} from "../store"
import {Link} from "react-router-dom"


export const Home = () => {
  return (
    <>
      <div className="row">
        <div className="col">
          <h3>
            Welcome to Bims Store
          </h3>
          <p>
            How to use? Click <b>"Fetch Data"</b> and Test CRUD Operation
          </p>
          <p>
            this project build with 4 aspects of Love :<br/> 
             1. ReactJs with MobX <br/> 
             2. HapiJs for API <br/> 
             3. NodeJs <br/> 
             4. Postgre<br/> 
          </p>
        </div>
      </div>
      <FetchProducts/>
      <Link className="btn btn-secondary ml-2 mt-2" to="/addProduct"> + Add Product + </Link>
      <div className="row">
          <ProductsList/>
      </div>
    </>
  )
}
