import React, { Component, Fragment } from 'react'
import moment from "moment"
import Print from "./Print"
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Route, Link } from "react-router-dom"

export default class Orders extends Component {

    render = () => {
        console.log(this.props)
        const props = this.props
        return (<>

            <ul>
                {props.orders && props.orders.map(order => {
                    return (<Fragment key={order.OrderID}><Order order={order} /> <div>
                    </div></Fragment>
                    )
                })}
            </ul>
        </>
        )
    }
}

export const Order = (props) => {
    console.debug("Rendering " + props.order.OrderID)
    const order = props && props.order
    if (!order) {
        return null;
    }
    order.allowedTimeInTransit = moment(order.RequiredDate).diff(order.OrderDate, 'days')
    order.rushType = order.allowedTimeInTransit < 15 ? "Rush Order" : "Standard"

    return (

        <li type="button" className="list-group-item" id="order-list" key={order.OrderID}>
            <Link to={`/order/${order.OrderID}`}>{"Preview PDF for " + order.OrderID}</Link>

            <div className="row vertical-align">

                <div className="col-sm-8 top">
                    <h4>Order {order.OrderID}</h4>
                    <p>{order.CustomerID}</p>
                </div>
                <div className="col-sm-3 text-right top">
                    <p>{order.rushType}</p>
                </div>
            </div>
        </li >

    )
}
