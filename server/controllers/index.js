const {Product} = require('../models')

class Controllers{

  static welcome (request, h) {
    return 'Welcome to Bims Store!';
  }

  static getProd (request, h){
    return Product.findAll()
      .then(prod => {
        return { 
          products: prod
        }
      })
      .catch(err => {
          return `Error: ${err}`
        })
  }

  static getProdById (request, h){
    const id = request.params.id
    return Product.findByPk(id)
      .then(prod => {

        //if product with requested ID is found
        if(prod !== null){
          return { 
            product: prod
          }
        } else {
          return "Product not Found"
        }
      })
      .catch(err => {
          return `Error: ${err}`
        })
  }

  static addProd (request, h){
    const newProd = {
      name: request.payload.name,
      SKU: request.payload.SKU,
      image: request.payload.image,
      desc: request.payload.desc,
      price: request.payload.price,
    }

    return Product.create(newProd)
      .then(prod => {
        return { 
          newProduct: prod
        }
      })
      .catch(err => {
          return `Error: ${err}`
        })
  }

  static updateProd (request, h){
    const id = request.params.id
    const newProd = {
      name: request.payload.name,
      SKU: request.payload.SKU,
      image: request.payload.image,
      desc: request.payload.desc,
      price: request.payload.price,
    }

    //try find product first to avoid error direct update
    return Product.findByPk(id)
      .then(prod => {
        //if product with requested ID is found
        if(prod != null){
          return prod.update(newProd)
            .then ( success => {
              return "success update product " + id
            })
            .catch ( err => {
              return "failed with error " + err
            })
        } else {
          return "Product not found"
        }
      })
      .catch(err => {
          return `Error: ${err}`
        })
  }

  static delProd (request, h){
    const id = request.params.id

    //try find product first to avoid error direct delete
    return Product.findByPk(id)
      .then(prod => {

        //if product with requested ID is found
        if(prod != null){
          return prod.destroy()
            .then ( success => {
              return "success delete product " + id
            })
            .catch ( err => {
              return "failed with error " + err
            })
        } else {
          return "Product not found"
        }
      })
      .catch(err => {
          return `Error: ${err}`
        })
  }
}

module.exports = Controllers