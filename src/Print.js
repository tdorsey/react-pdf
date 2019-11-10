import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font } from '@react-pdf/renderer';
import styled from '@react-pdf/styled-components';
let grey = '#E4E4E4';
let fontSrcNormal = `http://fonts.gstatic.com/s/merriweather/v13/ZvcMqxEwPfh2qDWBPxn6nqcQoVhARpoaILP7amxE_8g.ttf`
let fontSrcBold = 'http://fonts.gstatic.com/s/merriweather/v13/ZvcMqxEwPfh2qDWBPxn6nkD2ttfZwueP-QU272T9-k4.ttf'
let fontFamily = 'Merriwether serif'
Font.register({
    family: fontFamily, fonts: [
        { src: fontSrcNormal, fontStyle: 'normal' },
        { src: fontSrcBold, fontStyle: 'bold', fontWeight: 700 }
    ]
});

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

const renderEntry = (entry) => {
    let [key, value] = entry
    if (value) {
        return <Text key={key}>{key}: {value}</Text>
    }

}

const renderObjectEntries = (order) => {
    return Object.entries(order).filter((entry) => {
        let [key, value] = entry
        return (value != null)
    }).map(renderEntry)

}
// Create Document Component
export const OrderDocument = (props) => {
    const order = { ...props.order }
    if (!order) {
        return null
    }

    return (
        <PDFViewer>
            <Document>
                <Page size="Letter" style={styles.page}>
                    <View style={styles.title}>
                        <Text>Order {order.OrderID}</Text>
                        {renderObjectEntries(order)}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );

}


export default OrderDocument
