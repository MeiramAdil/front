import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ProductUpdate() {
  state = {
    products: [],
    categories: [],
    stocks: [],
    name: '',
    category_id: null,
    stock_id: null,
    details: '',
    barcode: '',
    supply_price: null,
    selling_price: null,
    price_cheat: null
  }

  handleId = event => {
    this.setState({ id: this.params.id });
  }
  handleName = event => {
    this.setState({ name: event.target.value });
  }
  handleDetails = event => {
    this.setState({ details: event.target.value });
  }
  handleBarcode = event => {
    this.setState({ barcode: event.target.value });
  }
  handlePrice = event => {
    this.setState({ selling_price: event.target.value });
  }
  handleCategory = event => {
    this.setState({ category_id: event.target.value });
  }
  handleStock = event => {
    this.setState({ stock_id: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const product = {
      name: this.state.name,
      category_id: this.state.category_id,
      stock_id: this.state.stock_id,
      details: this.state.details,
      barcode: this.state.barcode,
      supply_price: this.state.supply_price,
      selling_price: this.state.selling_price,
      price_cheat: this.state.price_cheat
    };

    axios.put(`http://127.0.0.1:8000/api/product/${this.state.id}`, product)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
    axios.get(`http://127.0.0.1:8000/api/product`)
      .then((res) => {
        const products = res.data;
        this.setState({ products: products });
      });
    <Link to="/"></Link>
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/api/product`)
      .then((res) => {
        const products = res.data;
        this.setState({ products: products });
      });
    axios.get(`http://127.0.0.1:8000/api/category`)
      .then((res) => {
        const categories = res.data;
        this.setState({ categories: categories });
      });
    axios.get(`http://127.0.0.1:8000/api/stock`)
      .then((res) => {
        const stocks = res.data;
        this.setState({ stocks: stocks });
      });
  }


  let product = this.state.products.find(prod => prod.id == params.id);
  return (
    <div className='addForm'>
      <form onSubmit={this.handleSubmit}>
        <legend>Изменить продукт</legend>
        <div class="mb-3">
          Продукт с Id: {this.state.id}
        </div>
        <div class="mb-3">
          <input type="text" id="disabledNameInput" class="form-control" value={product.name} placeholder="Название" onChange={this.handleName} />
        </div>
        <div class="mb-3">
          <input type="text" id="disabledDetailsInput" class="form-control" value={product.details} placeholder="Описание" onChange={this.handleDetails} />
        </div>
        <div class="mb-3">
          <input type="text" id="disabledBarcodeInput" class="form-control" value={product.barcode} placeholder="Штрих-код" onChange={this.handleBarcode} />
        </div>
        <div class="mb-3">
          <input type="decimal" id="disabledSellingPriceInput" class="form-control" value={product.selling_price} placeholder="Продажная цена" onChange={this.handlePrice} />
        </div>
        <div class="mb-3">
          <label for="disabledSelect" class="form-label">Выберите категорию</label>
          <select id="disabledSelect" class="form-select" onChange={this.handleCategory}>
            <option>{product.category_id}</option>
            <option>null</option>
            {this.state.categories.map(category => <option>{category.id}</option>)}
          </select>
        </div>
        <div class="mb-3">
          <label for="disabledSelect" class="form-label">Выберите склад</label>
          <select id="disabledSelect" class="form-select" onChange={this.handleStock}>
            <option>{product.stock_id}</option>
            <option>null</option>
            {this.state.stocks.map(stock => <option>{stock.id}</option>)}
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Изменить</button>
      </form>
    </div>

  )
}


