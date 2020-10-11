import React, { useEffect } from 'react';
import { useLocalObservable, useObserver } from 'mobx-react'
import {Product} from '../components/Product.js'
import { useHistory } from 'react-router';
import swal from 'sweetalert';

const StoreContext = React.createContext()

export const StoreProvider = ({children}) => {
  const store = useLocalObservable( () => ({
    products: [],
    product: "",
    oneProd: product => {
      store.product = product
    },
    addProd: product => {
      store.products.push(product);
    },
    updateProd: (id, product) => {
      let newData = store.products.filter( oneProd => oneProd.id !== id )
      newData.push(product)
      store.products = newData
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
        swal("Fetched!","Success Fetch Data", "success")
        store.fetchProds(data.products); 
      })
      .catch( err => {
        swal("Failed!","Failed Fetch Data", "error")
      })
  }
  return ( 
    <button className="btn btn-info ml-2 mt-2" onClick={ () => fetchData() }>
      Fetch Data
    </button>
  )
}

export const DeleteProdBtn = ({id}) => {
  const store = React.useContext(StoreContext)
  
  const DeleteProduct = () => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then( data => {
      swal("Deleted!","Success Delete Data", "success");
      fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
          store.fetchProds(data.products); 
        })
        .catch( err => {
        })
    } )
    .catch( error => swal("Failed!","Failed Delete Data", "error") )
  }

  return ( 
    <a className="btn btn-danger m-1"
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
  const history = useHistory()

  const [product, setProduct] = React.useState({
    name: "",
    SKU: "",
    image: "",
    desc: "",
    price: "",
  });

  const submitData = (e) => {
    e.preventDefault();
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
    .then( data => {
      store.addProd(data.newProduct);
      history.push('/')
      swal("Added!","Success Add Data", "success")
    } )
    .catch( error => swal("Failed!", "Failed Add Data", "error") )
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
        <label htmlFor="exampleFormControlInput1">SKU</label>
        <input type="text" name="SKU" className="form-control" placeholder="your product SKU . . ."
          value={product.SKU}
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
  const history = useHistory()
  
  const goToUpdatePage = () => {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then( data => {
      store.oneProd(data.product); 
      history.push('/updateProduct')
    })
  }

  return ( 
    <a className="btn btn-info m-1"
    onClick={() => goToUpdatePage()}>
      Update
    </a>
  )
}


export const UpdateProd = () => {
  const store = React.useContext(StoreContext);
  const history = useHistory()

  const [product, setProduct] = React.useState({
    name: "",
    SKU: "",
    image: "",
    desc: "",
    price: "",
  });

  useEffect( () => {
    setProduct(store.product)
  }, [store.product])

  const submitData = (e, id) => {
    e.preventDefault();
    store.updateProd(id, product);
    setProduct({
      name: "",
      SKU: "",
      image: "",
      desc: "",
      price: "",
    });
    fetch(`http://localhost:3000/products/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product)
    })
    .then( data => {

      history.push('/')
      swal("Updated!","Success Update Data", "success");
    } )
    .catch( error => swal("Failed!","Failed update data", "error") )
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
      onSubmit={e => submitData(e, store.product.id)}
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
      <button className="btn btn-primary" type="submit">Update</button>
    </form>
  );
};