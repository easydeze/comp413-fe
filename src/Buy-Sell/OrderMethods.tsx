import { typedFetch, validateHelper } from "../Model/model";
import orderSchema from "./schemas/order.json"

const buy_sell_url = "https://us-central1-comp413fe.cloudfunctions.net/Sample";

export interface Order {
    isBuy: boolean;
    tickerSymbol: string;
    stockAmount: number;
    limitPrice: number;
    requestSubmitted: number;
    status: string;
}

//Todo: Modify and test JSON function to see
export function sendOrderRequest(order: Order): Promise< Order | String > {

    const options: RequestInit = {
        method: `POST`,
        headers: {
            accept: `application/json`,
            "Content-Type": `application/json`,
        },
        body: JSON.stringify(order)
    };

    const orderSuccess = typedFetch<Order>(buy_sell_url, options, orderSchema).then((response: Order | String) => {
        //Returns if the order was successful
        return response
    }).catch((error: Error) =>  {
        //Returns the error messags if the order was unsuccessful
        return error.message
    });

    return orderSuccess
}

export function getMarketPrice(tickerSymbol: string): Promise<number | string> {
    const token = ""
    const options: RequestInit = {
        method: `GET`,
        headers: {
            accept: `application/json`,
            "Content-Type": `application/json`,
        },
        body: JSON.stringify({
            tickerSymbol: tickerSymbol,
        })
    };

    const marketPrice = typedFetch<number>(buy_sell_url, options, orderSchema).then((response: number) => {
        return response
    }).catch((error: Error) => {
        return error.message;
    });

    return marketPrice;
}
