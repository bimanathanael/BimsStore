import React from 'react'
import { DeleteProdBtn, UpdateProdBtn } from "../store"


export const Product = ({product}) => {
  return (
    <div className="col-3 mb-3">
      <div className="card">
        <img src={product.image} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.desc}</p>
          <p className="card-text">{product.price}</p>
          <UpdateProdBtn id={product.id}/>
          <DeleteProdBtn id={product.id}/>
        </div>
      </div>
    </div>
  )
}
