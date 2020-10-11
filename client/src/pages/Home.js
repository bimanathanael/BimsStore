import React from 'react'
import {ProductsList, FetchProducts} from "../store"
import {Link} from "react-router-dom"


export const Home = () => {
  return (
    <>
      <h1>
        This is Home
      </h1>
      <FetchProducts/>
      <Link to="/addProduct"> Add Product</Link>
      <div className="row">
          <ProductsList/>
      </div>
    </>
  )
}
