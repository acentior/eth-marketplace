import React, {useState} from 'react';

const Main = (props) => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  return (
    <div id="content">
      <h1>Add Product</h1>
      <form onSubmit={(event) => {
        event.preventDefault()
        const name = productName.toString()
        const price = window.web3.utils.toWei(productPrice.toString(), 'Ether')
        console.log(price, name)
        props.createProduct(name, price)
      }}>
        <div className="form-group mr-sm-2">
          <input
            id="productName"
            type="text"
            onChange={(event) => setProductName(event.target.value)}
            value = {productName}
            // ref={(input) => setProductName(input)}
            className="form-control"
            placeholder="Product Name"
            required />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="productPrice"
            type="number"
            onChange={(event) => setProductPrice(event.target.value)}
            value = {productPrice}
            className="form-control"
            placeholder="Product Price"
            required />
        </div>
        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
      <p> </p>
      <h2>Buy Product</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Owner</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="productList">
          { props.products.map((product, key) => {
            return (
              <tr key={key}>
                <th scope="row">{product.id.toString()}</th>
                <td>{product.name}</td>
                <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')}</td>
                <td>{product.owner}</td>
                <td>
                  { !product.purchased
                    ? <button
                        className="buyButton"
                        name={product.id}
                        value={product.price}
                        onClick={(event) => {
                          props.purchaseProduct(event.target.name, event.target.value)
                        }}
                      >
                        Buy
                      </button>
                    : null
                  }
                </td>
              </tr>
            )
          }) }
        </tbody>
      </table>
    </div>
  );
}

export default Main;