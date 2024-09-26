import React, { createContext, useReducer, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';


const getCartFromCookie = () => {
    const savedCart = Cookies.get('MyCart');
    if (savedCart) {
        return JSON.parse(savedCart);
    }
    return [];
}


const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItemIndex = state.findIndex(
                item => item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color
            );
            if (existingItemIndex > -1) {
                const updatedCart = [...state];
                updatedCart[existingItemIndex].quantity += action.payload.quantity;
                return updatedCart;
            }
            return [...state, action.payload];
        case 'REMOVE_FROM_CART':
            return state.filter(item => item.id !== action.payload.id || item.size !== action.payload.size || item.color !== action.payload.color|| item.quantity !== action.payload.quantity);
        case 'UPDATE_QUANTITY':
            const updatedCart = state.map(item =>
                item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color
                    ? { ...item, quantity: action.payload.quantity }
                    : item
            );
            return updatedCart
        case 'CLEAR_CART':
            return [];
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, getCartFromCookie());
    const [user, setUser] = useState(null)
    const [admin, setAdmin] = useState(null)
    const [search, setSearch] = useState(false)

    useEffect(() => {
        const storedUser = localStorage.getItem('User');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        const storedAdmin = localStorage.getItem('Admin');
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }
    }, [])

    useEffect(() => {
        if (cart.length > 0) {
            Cookies.set('MyCart', JSON.stringify(cart), { expires: 7, secure: true });
        } else {
            Cookies.remove('MyCart');
        }
    }, [cart])

    return (
        <CartContext.Provider value={{ cart, dispatch, user, setUser, admin, setAdmin, search, setSearch }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};