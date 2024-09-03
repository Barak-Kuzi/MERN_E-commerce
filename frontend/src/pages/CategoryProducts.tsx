import React from 'react';
import {useParams} from "react-router-dom";

export default function CategoryProducts(): React.JSX.Element {

    const params = useParams();

    console.log(params);

    return (
        <div>
            <h1>Category Products</h1>
        </div>
    );
}