import React, { Component } from 'react'
import api from "./api"
import moment from "moment"
export default class Orders extends Component {

    constructor(props) {
        super(props)

        this.state = this.getInitialState()

    }
    getInitialState = () => { return ({ orders: [] }) };


    componentDidMount = async () => {
        try {

            let orders = await api.getOrders();
            this.setState({ orders: orders })
        }
        catch (ex) {
            console.log(ex);
        }

    }

    render = () => {
        return (

            <ul>
                {this.state.orders && this.state.orders.map(order => {
                    return (<Order order={order} />)
                })}
            </ul>
        )
    }
}

const Order = (props) => {
    const order = props && props.order
    if (!order) {
        return null;
    }
    const allowedTimeInTransit = moment(order.RequiredDate).diff(order.OrderDate, 'days')
    console.log(allowedTimeInTransit)
    return (
        <li type="button" className="list-group-item" id="order-list" key={order.OrderID}>
            <div className="row vertical-align">
                <div className="col-sm-8 top">
                    <h4>Order {order.OrderID}</h4>
                    <p> {order.CustomerID}</p>
                </div>
                <div className="col-sm-3 text-right top">
                    <h4>
                        {moment(order.OrderDate).local().toDate().toDateString()}

                    </h4>
                    <p>{allowedTimeInTransit < 15 ? "Rush Order" : "Standard"}</p>
                </div>
            </div>
        </li>
    )
}