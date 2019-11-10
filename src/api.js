import axios from 'axios'

class api {
    constructor() {
        this.proxyUrl = "https://cors-anywhere.herokuapp.com"
        this.baseUrl = `${this.proxyUrl}/https://services.odata.org/V4/Northwind/Northwind.svc`
        this.ordersUrl = `${this.baseUrl}/Orders`
        this.detailUrl = `${this.baseUrl}/Order_Details`
        this.metadataUrl = `${this.baseUrl}/$metadata`

        setGlobalHeaders();
        axios.create({
            baseURL: this.baseUrl
        });
    }
    getOrders = async () => {
        console.debug("getting orders")
        debugger;
        let response = await axios.get(this.ordersUrl);
        //return response.data.value;
        return response.data.value.slice(0, 2)
    }

    getMetadata = async () => {
        let response = await axios.get(`${this.baseUrl}/$metadata`);
        debugger;
        return response.data.value
    }
}


const setGlobalHeaders = () => {

    axios.interceptors.request.use((config) => {
        config.headers["X-Requested-With"] = 'axios';
        return config;
    });

}

export default new api()