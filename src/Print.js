import React, { Component } from 'react';
import { Page, Text, View, Document, StyleSheet, Font, PDFViewer, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
import moment from "moment"
import api from './api';
let grey = '#E4E4E4';
let fontSrcNormal = `http://fonts.gstatic.com/s/merriweather/v13/ZvcMqxEwPfh2qDWBPxn6nqcQoVhARpoaILP7amxE_8g.ttf`
let fontSrcBold = 'http://fonts.gstatic.com/s/merriweather/v13/ZvcMqxEwPfh2qDWBPxn6nkD2ttfZwueP-QU272T9-k4.ttf'
let fontFamily = null
//let fontFamily = 'Merriwether serif'
// Font.register({
//     family: fontFamily, fonts: [
//         { src: fontSrcNormal, fontStyle: 'normal' },
//         { src: fontSrcBold, fontStyle: 'bold', fontWeight: 700 }
//     ]
// });

// Create styles
const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: fontFamily
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: fontFamily
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: fontFamily
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        fontWeight: 'bold',
        fontFamily: fontFamily,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    page: {
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
        "&:nth-child(even)": {
            backgroundColor: 'white'
        },
        "&:nth-child(odd)": {
            backgroundColor: grey
        },

    },

});


const Even = styled.Text`
  backgroundColor: white
`;

const Odd = styled.Text`
  backgroundColor: ${grey}
`;

const formatEntry = (entry) => {
    let [key, value] = entry;
    let displayKey, displayValue
    key.toLowerCase().includes("date") === true ?
        displayValue = moment(value).local().toDate().toDateString()
        : displayValue = value
    displayKey = key
    return [displayKey, displayValue]
}

const renderEntry = (entry) => {
    let [key, value] = formatEntry(entry)
    if (value) {
        return <Text key={key}>{key}: {value}</Text>
    }

}

const renderObjectEntries = (order) => {
    return Object.entries(order).filter((entry) => {
        let [key, value] = entry
        return (!key.startsWith("@") && key !== 'rushType' && key !== 'allowedTimeInTransit' && value != null)
    }).map(renderEntry)

}
// Create Document Component
const OrderDocument = (props) => {
    console.log("Document " + props.mode)
    const order = props.order
    console.log(props)
    console.log("order" + order)
    if (!order) {
        return null
    }

    const Doc = <Document>
        <Page size="Letter" style={styles.page}>
            <View style={styles.title}>
                <Text>Order {order.OrderID}</Text>
                {renderObjectEntries(order)}
            </View>
        </Page>
    </Document>

    switch (props.mode) {
        default:
            return (<>
                <PDFViewer>{Doc}</PDFViewer>
                <div>
                    <PDFDownloadLink document={Doc} fileName={`${order.OrderID}.pdf`}>
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download')}
                    </PDFDownloadLink>
                </div></>)
        case "batch":
            return (
                <BlobProvider document={Doc}>
                    {({ blob, url, loading, error }) => (url)}
                </BlobProvider>)


    }
}

export class Print extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount = () => {
        const orderId = this.props.orderId || this.props.match.params.orderId
        api.getOrderById(orderId).then((response) => {
            this.setState({ order: response })
        })
    }

    render = () => {
        console.log("printrender")

        console.log(this.state.order)
        return (<div><OrderDocument order={this.state.order} /></div>)

    }
}

export class Batch extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount = () => {
        const orderId = this.props.orderId || this.props.match.params.orderId
        api.getOrderById(orderId).then((response) => {
            this.setState({ order: response })
        })
    }

    render = () => {
        console.log("batch")

        console.log(this.state.order)
        return (<div><OrderDocument order={this.state.order} mode={"batch"} /></div>)

    }
}

export default Print
