// deno-lint-ignore-file no-explicit-any
import { v4 } from "https://deno.land/std@0.133.0/uuid/mod.ts";
import { Product } from "../types.ts";

let products: Product[] = [
    {
        id: "1",
        name: "Product 1",
        description: "This is a product",
        price: 19.99,
    },
    {
        id: "2",
        name: "Product 2",
        description: "This is a product",
        price: 29.99,
    },
    {
        id: "3",
        name: "Product 3",
        description: "This is a product",
        price: 39.99,
    },
];

// @desc   Get all products
// @route  GET api/v1/products
const getProducts = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        data: products,
    };
};

// @desc   Get single products
// @route  GET api/v1/products/:id
const getProduct = ({
    params,
    response,
}: {
    params: { id: string };
    response: any;
}) => {
    const id = params.id;
    const product: Product | undefined = products.find((p) => p.id === id);
    if (product) {
        response.status = 200;
        response.body = { status: true, data: product };
    } else {
        response.status = 404;
        response.body = { status: false, msg: "No product found" };
    }
};

// @desc   add a product
// @route  POST api/v1/products
const addProduct = async ({
    request,
    response,
}: {
    request: any;
    response: any;
}) => {
    const body = await request.body().value;

    if (!body.name || !body.description || !body.price) {
        response.status = 400;
        response.body = {
            success: false,
            msg: "Request not formatted correctly.",
        };
    } else {
        const product: Product = body;
        product.id = crypto.randomUUID().toString();
        products.push(product);
        response.status = 201;
        response.body = {
            success: true,
            data: product,
        };
    }
};

// @desc   update product
// @route  PUT api/v1/products/:id
const updateProduct = async ({
    params,
    request,
    response,
}: {
    params: { id: string };
    request: any;
    response: any;
}) => {
    const id = params.id;
    const product: Product | undefined = products.find((p) => p.id === id);
    if (product) {
        const body = await request.body().value;

        const updateData: {
            name?: string;
            description?: string;
            price?: number;
        } = body;

        products = products.map((p) =>
            p.id === params.id ? { ...p, ...updateData } : p
        );

        response.status = 200;
        response.body = { status: true, data: products };
    } else {
        response.status = 404;
        response.body = { status: false, msg: "No product found" };
    }
};

// @desc   delete product
// @route  DELETE api/v1/products/:id
const deleteProduct = ({
    params,
    response,
}: {
    params: { id: string };
    response: any;
}) => {
    const id = params.id;
    const product: Product | undefined = products.find((p) => p.id === id);
    if (product) {
        products.splice(products.findIndex((p) => p.id === id), 1)
        response.status = 200;
        response.body = { success: true, data: products };
    } else {
        response.status = 404;
        response.body = { success: false, msg: "No product found" };
    }
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
