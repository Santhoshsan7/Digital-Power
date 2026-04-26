"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [promoDiscount, setPromoDiscount] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("digitalpower_cart_v2");
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                // Ensure all quantities are numbers
                const validatedCart = Array.isArray(parsedCart) ? parsedCart.map(item => ({
                    ...item,
                    quantity: parseInt(item.quantity, 10) || 1
                })) : [];
                setCartItems(validatedCart);
            } catch (e) {
                console.error("Error parsing cart:", e);
                setCartItems([]);
            }
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("digitalpower_cart_v2", JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        const qty = parseInt(quantity, 10) || 1;
        setCartItems((prev) => {
            const existingItem = prev.find((item) => item.id === product.id);
            if (existingItem) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: (parseInt(item.quantity, 10) || 0) + qty }
                        : item
                );
            }
            return [...prev, { ...product, quantity: qty }];
        });
    };

    const removeFromCart = (productId) => {
        setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    const updateQuantity = (productId, quantity) => {
        const qty = parseInt(quantity, 10);
        if (isNaN(qty) || qty <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === productId ? { ...item, quantity: qty } : item
            )
        );
    };

    const applyDiscount = (amount) => {
        setPromoDiscount(amount);
    };

    const clearCart = () => {
        setCartItems([]);
        setPromoDiscount(0);
    };

    const getCartTotal = () => {
        return cartItems.reduce(
            (total, item) => total + (item.salePrice || 0) * (parseInt(item.quantity, 10) || 0),
            0
        );
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + (parseInt(item.quantity, 10) || 0), 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount,
                promoDiscount,
                applyDiscount,
                isCartOpen,
                setIsCartOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
