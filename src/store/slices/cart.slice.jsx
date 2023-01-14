import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../../utils/getConfig";
import { setIsLoading } from "./isLoading.slice";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        setCart: (state, action) => {
            const cart = action.payload;
            return cart;
        }
    }
})


export const getCartThunk = () => dispatch => {
    dispatch(setIsLoading(true))
    return axios.get("https://e-commerce-api.academlo.tech/api/v1/cart", getConfig())
        .then(res => dispatch(setCart(res.data.data.cart.products)))
        .finally(() => dispatch(setIsLoading(false)))
}

export const addToCartThunk = (product) => dispatch => {
    dispatch (setIsLoading(true))
    axios.post("https://e-commerce-api.academlo.tech/api/v1/cart", product, getConfig())
    .then(res => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsLoading(false)))
}





export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;