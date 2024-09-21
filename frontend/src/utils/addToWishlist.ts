import SummaryApi from "../common";
import {CustomResponse} from "./CustomResponse";

const addToWishlist = async (productId: string) => {
    const response = await fetch(SummaryApi.addToWishlist.url, {
        method: SummaryApi.addToWishlist.method,
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
    });

    const resData: CustomResponse = await response.json();

    return resData;
}

export default addToWishlist;