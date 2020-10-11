import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react'
import {Product} from '../components/Product.js'

const StoreContext = React.createContext()

export const StoreProvider = ({children}) => {
  const store = useLocalStore( () => ({
    products: [],
    product: "",
    addProd: product => {
      store.products.push(product);
    },
    fetchProds: products => {
      store.products = products
    }
  }));

  return (
    <StoreContext.Provider value={store}> {children} </StoreContext.Provider> 
  )
}

export const FetchProducts = () => {
  const store = React.useContext(StoreContext)

  const fetchData = () => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => {
        console.log(data.products, '>>>>>products')
        store.fetchProds(data.products); 
      })
      .catch( err => {
        console.log("err", err)
      })
  }
  return ( 
    <button onClick={ () => fetchData() }>
      Fetch Data
    </button>
  )
}


export const DeleteProdBtn = ({id}) => {
  const store = React.useContext(StoreContext)
  
  const DeleteProduct = () => {
    console.log(id, '<<id DALAM FUNCTION')
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then( data => {
      console.log("delete data success", data)
      fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
          console.log(data.products, '>>>>>products')
          store.fetchProds(data.products); 
        })
        .catch( err => {
          console.log("err", err)
        })
    } )
    .catch( error => console.log("delete data error", error) )
  }

  return ( 
    <a className="btn btn-danger"
    onClick={() => DeleteProduct()}>
      Delete
    </a>

  )
}

export const ProductsList = () => {
  const store = React.useContext(StoreContext)

  return useObserver( () => (
    <div className="row m-5">
      {store.products.map(product => 
        <Product key={product.id} product={product}/>
        )}
    </div>
  ))
}

export const AddProd = () => {
  const store = React.useContext(StoreContext);
  const [product, setProduct] = React.useState({
    name: "",
    SKU: "",
    image: "",
    desc: "",
    price: "",
  });

  const submitData = (e) => {
    e.preventDefault();
    store.addProd(product);
    setProduct({
      name: "",
      SKU: "",
      image: "",
      desc: "",
      price: "",
    });
    fetch('http://localhost:3000/products', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then( data => console.log("add data success", data) )
    .catch( error => console.log("add data error") )
  }

  const onDataChanges = (e) => {
    let {value, name} = e.target
    if(name === "price"){
      value = Number(value)
    }
    const newData = {
      ...product,
      [name]: value
    }
    setProduct(newData);
  }

  return (
    <form
      onSubmit={e => submitData(e)}
    >
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Name</label>
        <input type="text" name="name" className="form-control" placeholder="your product Name . . ."
          value={product.name}
          onChange={e => onDataChanges(e)}/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Image Url</label>
        <input type="text" name="image" className="form-control" placeholder="your product Image Url . . ."
          value={product.image}
          onChange={e => onDataChanges(e)}/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Description</label>
        <input type="text" name="desc" className="form-control" placeholder="your product Description . . ."
          value={product.desc}
          onChange={e => onDataChanges(e)}/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Price</label>
        <input type="number" name="price" className="form-control" placeholder="your product Price . . ."
          value={product.price}
          onChange={e => onDataChanges(e)}/>
      </div>
      <button className="btn btn-primary" type="submit">Add</button>
    </form>
  );
};


export const UpdateProdBtn = ({id}) => {
  const store = React.useContext(StoreContext)
  
  const goToUpdatePage = () => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then( data => {
      console.log("getone data success", data)
      store.product = data
    })
    .catch( error => console.log("add data error", error) )
  }

  return ( 
    <a className="btn btn-info"
    onClick={() => goToUpdatePage()}>
      Update
    </a>

  )
}


export const UpdateProd = () => {
  const store = React.useContext(StoreContext);
  const [product, setProduct] = React.useState({
    name: "",
    SKU: "",
    image: "",
    desc: "",
    price: "",
  });

  const submitData = (e) => {
    e.preventDefault();
    store.addProd(product);
    setProduct({
      name: "",
      SKU: "",
      image: "",
      desc: "",
      price: "",
    });
    fetch('http://localhost:3000/products', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then( data => console.log("add data success", data) )
    .catch( error => console.log("add data error", error) )
  }

  const onDataChanges = (e) => {
    let {value, name} = e.target
    if(name === "price"){
      value = Number(value)
    }
    const newData = {
      ...product,
      [name]: value
    }
    setProduct(newData);
  }

  return (
    <form
      onSubmit={e => submitData(e)}
    >
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Name</label>
        <input type="text" name="name" className="form-control" placeholder="your product Name . . ."
          value={product.name}
          onChange={e => onDataChanges(e)}/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Image Url</label>
        <input type="text" name="image" className="form-control" placeholder="your product Image Url . . ."
          value={product.image}
          onChange={e => onDataChanges(e)}/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Description</label>
        <input type="text" name="desc" className="form-control" placeholder="your product Description . . ."
          value={product.desc}
          onChange={e => onDataChanges(e)}/>
      </div>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Price</label>
        <input type="number" name="price" className="form-control" placeholder="your product Price . . ."
          value={product.price}
          onChange={e => onDataChanges(e)}/>
      </div>
      <button className="btn btn-primary" type="submit">Add</button>
    </form>
  );
};