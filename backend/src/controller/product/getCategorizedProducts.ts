import {CustomRequest, CustomResponse} from "../../utils";
import productModel from "../../models/productModel.js";

const getCategorizedProducts = async (req: CustomRequest, res: CustomResponse) => {
    try {
        const products = await productModel.find({});

        const categories = ["watches", "phones", "headphones", "desktops", "laptops", "televisions"];

        // const categorizedProducts: { [key: string]: any[] } = {};
        const categorizedProducts: { categoryName: string, categoryProducts: any[] }[] = [];

        // categories.forEach(category => {
        //     categorizedProducts[category] = products.filter(product => product.productCategory.toLowerCase() === category);
        // });

        const capitalizeFirstLetter = (str: string) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };

        categories.forEach(category => {
            const categoryProducts = products.filter(product => product.productCategory.toLowerCase() === category);
            categorizedProducts.push({
                categoryName: capitalizeFirstLetter(category),
                categoryProducts: categoryProducts
            });
        });

        return res.status(200).json({
            message: "Categorized products fetched successfully",
            success: true,
            error: false,
            data: categorizedProducts,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            error: true,
            message: "Failed to fetch categorized products",
        });
    }
};

export default getCategorizedProducts;