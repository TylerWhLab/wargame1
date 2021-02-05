import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM,
    ON_SUCCESS_BUY,
    SELECT_NOTICES,
} from './types';

export function loginUser(requestBody) {
    
    // redux 활용하기 위해 user_action.js 에서 request
    const responseData = axios.post(`http://${process.env.REACT_APP_BACKEND_SERVER}/api/users/login`, requestBody, { withCredentials: true })
                        .then(response => response.data) 

    return { // user_reducer.js 로 return
        type: LOGIN_USER, // user가 로그인 했다는 것을 설명하기 위해 명시
        payload: responseData, // 이름은 반드시 payload // user가 로그인 했는데 어떤 user인지는 data에 있다.
    }

}


export function registerUser(requestBody) {
    
    // redux 활용하기 위해 user_action.js 에서 request
    const responseData = axios.post(`http://${process.env.REACT_APP_BACKEND_SERVER}/api/users/register`, requestBody, { withCredentials: true })
                        .then(response => response.data) 

    return { // user_reducer.js 로 return
        type: REGISTER_USER, // user가 로그인 했다는 것을 설명하기 위해 명시
        payload: responseData, // 이름은 반드시 payload // user가 로그인 했는데 어떤 user인지는 data에 있다.
    }

}


export function auth() { // GET request이므로 바디 필요없음
    
    // redux 활용하기 위해 user_action.js 에서 request
    const responseData = axios.get(`http://${process.env.REACT_APP_BACKEND_SERVER}/api/users/auth`, { withCredentials: true })
        .then(response => response.data) 

    return { // user_reducer.js 로 return
        type: AUTH_USER, // user가 로그인 했다는 것을 설명하기 위해 명시
        payload: responseData, // 이름은 반드시 payload // user가 로그인 했는데 어떤 user인지는 data에 있다.
    }

}


export function logoutUser() {
    const request = axios.get(`http://${process.env.REACT_APP_BACKEND_SERVER}/api/users/logout`, { withCredentials: true })
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}


export function addToCart(id) {
    let body = {
        productId: id
    }

    const request = axios.post(`http://${process.env.REACT_APP_BACKEND_SERVER}/api/users/addToCart`, body, { withCredentials: true })
        .then(response => response.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
}


export function getCartItems(cartItems, userCart) {

    const request = axios.get(`http://${process.env.REACT_APP_BACKEND_SERVER}/api/product/products_by_id?id=${cartItems}`, { withCredentials: true })
        .then(response => {

            // CartItem들에 해당하는 정보들을  
            // Product Collection에서 가져온후에 
            // Quantity 정보를 넣어 준다.
            userCart.forEach(cartItem => {
                response.data.forEach((productDetail, index) => {
                    if (cartItem.productId === productDetail.productId) {
                        response.data[index].quantity = cartItem.quantity
                    }
                })
            })
            /* quantity 넣어주는 작업은 auth에서 해결했으므로 필요없는지 체크 */

            return response.data;
        });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}


export function removeCartItem(productId) {

    const request = axios.get(`http://${process.env.REACT_APP_BACKEND_SERVER}/api/users/removeFromCart?id=${productId}`, { withCredentials: true })
        .then(response => response.data);

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}



export function onSuccessBuy(data) {

    const request = axios.post(`http://${process.env.REACT_APP_BACKEND_SERVER}/api/users/successBuy`, data, { withCredentials: true })
        .then(response => response.data);

    return {
        type: ON_SUCCESS_BUY,
        payload: request
    }
}


export function selectNoticesAction(reqBody) {

    const responseData = axios.post(`http://${process.env.REACT_APP_BACKEND_SERVER}/api/notice`, reqBody, { withCredentials: true })
        .then(response => response.data);

    return {
        type: SELECT_NOTICES,
        payload: responseData
    }
}