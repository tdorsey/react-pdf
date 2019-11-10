import React, { Component } from 'react'
import api from "./api"
import moment from "moment"
import { PDFDownloadLink } from '@react-pdf/renderer';
import { OrderDocument } from './Print';

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
                    debugger;
                    return (<><Order order={order} /> <div><Order order={order} mode="print" /></div></>)
                })}
            </ul>
        )
    }
}

export const Order = (props) => {
    const order = props && props.order
    if (!order) {
        return null;
    }
    order.allowedTimeInTransit = moment(order.RequiredDate).diff(order.OrderDate, 'days')
    order.rushType = order.allowedTimeInTransit < 15 ? "Rush Order" : "Standard"
    if (props.mode === "print") {
        return (<OrderDocument order={order} />)
    }
    return (
        <li type="button" className="list-group-item" id="order-list" key={order.OrderID}>
            <div className="row vertical-align">
                <div className="col-sm-8 top">
                    <h4>Order {order.OrderID}</h4>
                    <p> {order.CustomerID}</p>
                </div>
                <div className="col-sm-3 text-right top">
                    <h4>
                        {}
                    </h4>
                    <p>{order.rushType}</p>
                </div>
            </div>
        </li>
    )
}