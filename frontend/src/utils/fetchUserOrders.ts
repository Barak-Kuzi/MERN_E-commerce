import {CustomResponse} from "./CustomResponse";
import SummaryApi from "../common";

const fetchUserOrders = async () => {
    const response = await fetch(SummaryApi.userOrders.url, {
        method: SummaryApi.userOrders.method,
        credentials: 'include',
    });
    const resData: CustomResponse = await response.json();
    return resData;
}

export default fetchUserOrders;