import React from 'react';
import axios from 'axios';

export default class StockList extends React.Component {
    state = {
        stocks: [],
        name: '', 
        coordinates: ''
    }
    handleName = event => {
        this.setState({ name: event.target.value });
    }
    handleCoordinates = event => {
        this.setState({ coordinates: event.target.value });
    }
    handleSubmit = event => {
        event.preventDefault();

        const stock = {
            name: this.state.name,
            coordinates: this.state.coordinates
        };

        axios.post(`http://127.0.0.1:8000/api/stock`, stock)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        axios.get(`http://127.0.0.1:8000/api/stock`)
            .then((res) => {
                const stocks = res.data;
                this.setState({ stocks });
            });
    }

    handleDelete = event => {
        axios.delete(`http://127.0.0.1:8000/api/stock/${event.target.value}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
        axios.get(`http://127.0.0.1:8000/api/stock`)
            .then((res) => {
                const stocks = res.data;
                this.setState({ stocks });
            });
    }
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/stock`)
            .then((res) => {
                const stocks = res.data;
                this.setState({ stocks });
                console.log(res.data);
            });
    }
 

    render() {
        return (
            <div className='allList'>
                <div className='addForm'>
                    <form onSubmit={this.handleSubmit}>
                        <legend>Добавить склад</legend>
                        <div class="mb-3">
                            <input type="text" id="disabledNameInput" class="form-control" placeholder="Название" onChange={this.handleName} />
                        </div>
                        <div class="mb-3">
                        <input type="text" id="disabledCoordinatesInput" class="form-control" placeholder="Введите расположение или координаты склада" onChange={this.handleCoordinates} />
                        </div>
                        <button type="submit" class="btn btn-primary">Добавить</button>
                    </form>
                </div>
                <div className='list'>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Id#</th>
                                <th scope="col">Название</th>
                                <th scope="col">Коoрдинаты</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.stocks.map(stock =>
                                <tr>
                                    <th scope="row">{stock.id}</th>
                                    <td>{stock.name}</td>
                                    <td>{stock.coordinates}</td>
                                    <td><button type='submit' className='btn btn-secondary'>Изменить</button></td>
                                    <td><button type='submit' className='btn btn-danger' value={stock.id} onClick={this.handleDelete}>Удалить</button></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}