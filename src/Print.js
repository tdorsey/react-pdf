import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

let grey = '#E4E4E4';

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
        fontFamily: 'Oswald'
    },
    author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald'
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
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
        backgroundColor: grey
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    tbody: {
        "&:nth-child(even)": {
            color: 'white'
        },
        "&:nth-child(odd)": {
            color: grey
        },
    },

});

const renderEntry = (key, value) => {
    if (value) {
        return <View render={() => (
            <View>
                <Text>{`${key}`}</Text>
            </View>
        )} />
    };

}

const renderObjectEntries = (order) => {
    return Object.entries(order).filter((property) => {
        let [key, value] = property
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
                    <View style={styles.section}>
                        <Text>Order {order.OrderID}</Text>
                        {renderObjectEntries(order)}
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );

}


export default OrderDocument
