import React, {useState} from 'react';

const Main = (props) => {
  const [productName, setProductName] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  return (
    <div id="content">
      <h1>Add Product</h1>
      <form onSubmit={(event) => {
        event.preventDefault()
        const name = productName
        const price = window.web3.utils.toWei(productPrice.toString(), 'Ether')
        props.createProduct(name, price)
      }}>
        <div className="form-group mr-sm-2">
          <input
            id="productName"
            type="text"
            ref={(input) => setProductName(input)}
            className="form-control"
            placeholder="Product Name"
            required />
        </div>
        <div className="form-group mr-sm-2">
          <input
            id="productPrice"
            type="text"
            ref={(input) => setProductName(input)}
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
          <tr>
            <th scope="row">1</th>
            <td>iPhone x</td>
            <td>1 Eth</td>
            <td>0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</td>
            <td><button className="buyButton">Buy</button></td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Macbook Pro</td>
            <td>3 eth</td>
            <td>0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</td>
            <td><button className="buyButton">Buy</button></td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Airpods</td>
            <td>0.5 eth</td>
            <td>0x39C7BC5496f4eaaa1fF75d88E079C22f0519E7b9</td>
            <td><button className="buyButton">Buy</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Main;