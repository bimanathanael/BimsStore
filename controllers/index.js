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
    // return "This is Hello"
  }
}

module.exports = Controllers