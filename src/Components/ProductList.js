import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default class ProductList extends React.Component {
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
        console.log(product);

        axios.post(`http://127.0.0.1:8000/api/product`, product)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        axios.get(`http://127.0.0.1:8000/api/product`)
            .then((res) => {
                const products = res.data;
                this.setState({ products: products });
            });
    }

    handleDelete = event => {
        console.log(event.target.value);
        axios.delete(`http://127.0.0.1:8000/api/product/${event.target.value}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
        axios.get(`http://127.0.0.1:8000/api/product`)
            .then((res) => {
                const products = res.data;
                this.setState({ products: products });
            });
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

    render() {
        return (
            <div className='allList'>
                <div className='addForm'>
                    <form onSubmit={this.handleSubmit}>
                        <legend>Добавить продукт</legend>
                        <div class="mb-3">
                            <input type="text" id="disabledNameInput" class="form-control" placeholder="Название" onChange={this.handleName} />
                        </div>
                        <div class="mb-3">
                            <input type="text" id="disabledDetailsInput" class="form-control" placeholder="Описание" onChange={this.handleDetails} />
                        </div>
                        <div class="mb-3">
                            <input type="text" id="disabledBarcodeInput" class="form-control" placeholder="Штрих-код" onChange={this.handleBarcode} />
                        </div>
                        <div class="mb-3">
                            <input type="decimal" id="disabledSellingPriceInput" class="form-control" placeholder="Продажная цена" onChange={this.handlePrice} />
                        </div>
                        <div class="mb-3">
                            <label for="disabledSelect" class="form-label">Выберите категорию</label>
                            <select id="disabledSelect" class="form-select" onChange={this.handleCategory}>
                                <option>null</option>
                                {this.state.categories.map(category => <option>{category.id}</option>)}
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="disabledSelect" class="form-label">Выберите склад</label>
                            <select id="disabledSelect" class="form-select" onChange={this.handleStock}>
                                <option>null</option>
                                {this.state.stocks.map(stock => <option>{stock.id}</option>)}
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Добавить</button>
                    </form>
                </div>
                <div className='list'>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Название</th>
                                <th scope="col">Категория</th>
                                <th scope="col">Штрих-код</th>
                                <th scope="col">Цена продажи</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.products.map(product =>
                                <tr>
                                    <th scope="row">{product.id}</th>
                                    <td>{product.name}</td>
                                    <td>{product.category_id}</td>
                                    <td>{product.barcode}</td>
                                    <td>{product.selling_price}</td>
                                    <td><Link to={'/update/' + product.id}><button type='submit' className='btn btn-secondary'>Изменить</button></Link></td>
                                    <td><button type='submit' className='btn btn-danger' value={product.id} onClick={this.handleDelete}>Удалить</button></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}