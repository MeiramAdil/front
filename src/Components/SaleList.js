import React from 'react';
import axios from 'axios';

export default class SaleList extends React.Component {
    state = {
        sales: []
    }
    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/api/sale`)
            .then((res) => {
                const sales = res.data;
                this.setState({ sales });
                console.log(res.data);
            });
    }
    render() {
        return (
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Название</th>
                            <th scope="col">Сумма</th>
                            <th scope="col">Дата исполнения</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sales.map(sale =>
                            <tr>
                                <th scope="row">{sale.id}</th>
                                <td>{sale.name}</td>
                                <td>{sale.sum}</td>
                                <td>{sale.sale_date}</td>
                                <td><div className='btn btn-primary'>Детали</div></td>
                            </tr>)}
                    </tbody>
                </table>
            </div>
        )
    }
}