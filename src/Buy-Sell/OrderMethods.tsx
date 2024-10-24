import { typedFetch, validateHelper } from "../Model/model";
import orderSchema from "../../schemas/order.json"


//Todo: Modify and test JSON function to see
export function sendBuySellRequest(isBuy: boolean, tickerSymbol: string, stockAmount: number, limitPrice: number) {
    const buy_sell_url = "";
    const token = ""
    const options: RequestInit = {
        method: `PUT`,
        headers: {
            accept: `application/json`,
            "Content-Type": `application/json`,
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            isBuy: isBuy,
            tickerSymbol: tickerSymbol,
            stockAmount: stockAmount,
            limitPrice: limitPrice,
        })
    };

    typedFetch<boolean>(buy_sell_url, options, orderSchema);
}

export function getMarketPrice(tickerSymbol: string): Promise<void | number | string> {
    const buy_sell_url = "";
    const token = ""
    const options: RequestInit = {
        method: `GET`,
        headers: {
            accept: `application/json`,
            "Content-Type": `application/json`,
            Authorization: `Bearer ${token}`,
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
