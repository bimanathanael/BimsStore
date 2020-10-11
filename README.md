# BimsStore
a fascinating online store with CRUD operation using ReactJs, MobX, HapiJs, and Postgre

## How to use
- Clone to your local directory
- Enter to Client Folder and run `npm install`
- Enter to Server Folder and run `npm install`
- Change database Postgre configuration under /server/config/config.json 
- Run below command to setup databae Postgre
  - `seqelize db:craete`
  - `seqelize db:migrate`
- To run Server : `npm start`
- To run Client : `npm start`

## Restful EndPoint

### GET /products
> Get all Products

_Request Header_
```
```

_Request Body_
```
```

_Response (success)_
```
{
  "products": [
    {
      "id": 6,
      "name": "Iphone 11",
      "SKU": "ini SKU",
      "image": "https://static.bmdstatic.com/pk/product/medium/5de49770c6c3f.jpg",
      "desc": "ini Iphone 11 yang mahal itu loh",
      "price": 10000000,
      "createdAt": "2020-10-11T06:36:34.281Z",
      "updatedAt": "2020-10-11T06:36:34.281Z"
    },
    {
      "id": 15,
      "name": "MU Logo",
      "SKU": "",
      "image": "https://pbs.twimg.com/profile_images/1059666623852728320/mPxvy9rq_400x400.jpg",
      "desc": "MU FOREVER",
      "price": 9800,
      "createdAt": "2020-10-11T14:45:16.610Z",
      "updatedAt": "2020-10-11T14:45:16.610Z"
    }
  ]
}
```

### GET /products/:id
> Get Product by Id

_Request Header_
```
```

_Request Body_
```
```

_Response (success)_
```
{
  "product":
    {
      "id": 6,
      "name": "Iphone 11",
      "SKU": "ini SKU",
      "image": "https://static.bmdstatic.com/pk/product/medium/5de49770c6c3f.jpg",
      "desc": "ini Iphone 11 yang mahal itu loh",
      "price": 10000000,
      "createdAt": "2020-10-11T06:36:34.281Z",
      "updatedAt": "2020-10-11T06:36:34.281Z"
    }
}
```

### POST /products
> Add new Product

_Request Header_
```
```

_Request Body_
```
  name  : <product name to be added>
  SKU   : <product SKU to be added>
  image : <product image to be added>
  desc  : <product description to be added>
  price : <product price to be added>
```

_Response (success)_
```
{
  "newProduct": {
    "id": 33,
    "name": "Iphone 11",
    "SKU": "ini SKU",
    "image": "https://static.bmdstatic.com/pk/product/medium/5de49770c6c3f.jpg",
    "desc": "ini Iphone 11 ini",
    "price": 10000000,
    "updatedAt": "2020-10-11T17:31:32.600Z",
    "createdAt": "2020-10-11T17:31:32.600Z"
  }
}
```

### PUT /products/:id
> Update one Product base on Id

_Request Header_
```
```

_Request Body_
```
  name  : <product name to be updated>
  SKU   : <product SKU to be updated>
  image : <product image to be updated>
  desc  : <product description to be updated>
  price : <product price to be updated>
```

_Response (success)_
```
"success update product <id>"
```

### DELETE /products/:id
> Delete one Product base on Id

_Request Header_
```
```

_Request Body_
```
```

_Response (success)_
```
"success delete product <id>"
```
