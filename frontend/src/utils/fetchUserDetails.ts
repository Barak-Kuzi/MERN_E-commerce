import SummaryApi from "../common";
import {CustomResponse} from "./CustomResponse";


const fetchUserDetails = async (userId: string) => {
    const response = await fetch(SummaryApi.userDetails.url, {
        method: SummaryApi.userDetails.method,
        credentials: 'include',
    });

    const resData: CustomResponse = await response.json();

    return resData;
}

export default fetchUserDetails;