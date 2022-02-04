import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Navbar from './Navbar';
import Marketplace from '../abis/Marketplace.json'
import Main from './Main'

const App = () => {
  const [account, setAccount] = useState('')
  const [productCount, setProductCount] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [marketplace, setMarketplace] = useState(undefined)

  useEffect(() => {
    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.request({method: 'eth_requestAccounts'})
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      }
      else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    }

    const loadBlockchainData = async () => {
      const web3 = window.web3
      // Load account
      const accounts = await web3.eth.getAccounts()
      setAccount(accounts[0])
      const networkId = await web3.eth.net.getId()
      const networkData = Marketplace.networks[networkId]
      if (networkData) {
        const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address)
        console.log(marketplace)
        setMarketplace(marketplace)
        const productCount = await marketplace.methods.productCount().call()
        setProductCount(productCount)
        for (let i = 1; i <= productCount; i++) {
          const product = await marketplace.methods.products(i).call()
          setProducts([...products, product])
        }
        console.log(productCount.toString())
        setLoading(false)
      } else {
        window.alert('Marketplace contract not deployed to detected network.')
      }
      console.log(accounts)
    }

    loadWeb3().catch(console.error)
    loadBlockchainData().catch(console.error)
  }, [])

  const createProduct = (name, price) => {
    console.log(name, price)
    setLoading(true)
    marketplace.methods.createProduct(name, price)
    .send({from: account})
    .once('receipt', (receipt) => {
      setLoading(false)
    })
  }

  const purchaseProduct = (id, price) => {
    setLoading(true)
    marketplace.methods.purchaseProduct(id)
    .send({ from: account, value: price })
    setLoading(false)
  }

  return (
    <div>
      <Navbar account={account}/>
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 d-flex text-center">
            { loading
              ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
              : <Main
                products={products}
                createProduct={createProduct}
                purchaseProduct={purchaseProduct} />
            }
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
