import React from 'react';
import axios from 'axios';

export default class CategoryList extends React.Component {
    state = {
        categories: [],
        name: '',
        parent_id: null
    }
    handleName = event => {
        this.setState({ name: event.target.value });
    }
    handleParent = event => {
        this.setState({ parent_id: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        const category = {
            name: this.state.name,
            parent_id: this.state.category_id,
        };
        console.log(category)
        axios.post(`http://127.0.0.1:8000/api/category`, category)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
        axios.get(`http://127.0.0.1:8000/api/category`)
            .then((res) => {
                const categories = res.data;
                this.setState({ categories });
            });
    }

    handleDelete = event => {
        console.log(event.target.value);
        axios.delete(`http://127.0.0.1:8000/api/category/${event.target.value}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        });
        axios.get(`http://127.0.0.1:8000/api/category`)
            .then((res) => {
                const categories = res.data;
                this.setState({ categories });
            });
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/category`)
            .then((res) => {
                const categories = res.data;
                this.setState({ categories });
            });
    }
    render() {
        return (
            <div className='allList'>
                <div className='addForm'>
                    <form onSubmit={this.handleSubmit}>
                        <legend>Добавить категорию</legend>
                        <div class="mb-3">
                            <input type="text" id="disabledNameInput" class="form-control" placeholder="Название" onChange={this.handleName} />
                        </div>
                        <div class="mb-3">
                            <label for="disabledSelect" class="form-label">Выберите подкатегорию</label>
                            <select id="disabledSelect" class="form-select" onChange={this.handleParent}>
                                <option>null</option>
                                {this.state.categories.map(category => <option>{category.id}</option>)}
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
                                <th scope="col">Родитель категорий</th>
                                <th scope="col"></th>
                                <th scope="col"></th>

                            </tr>
                        </thead>
                        <tbody>
                            {this.state.categories.map(category =>
                                <tr>
                                    <th scope="row">{category.id}</th>
                                    <td>{category.name}</td>
                                    <td>{category.parent_id}</td>
                                    <td><button type='submit' className='btn btn-secondary'>Изменить</button></td>
                                    <td><button type='submit' className='btn btn-danger' value={category.id} onClick={this.handleDelete}>Удалить</button></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}