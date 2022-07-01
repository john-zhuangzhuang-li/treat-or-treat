import { useReducer } from "react";
import CartContext from "./CartContext";

const defaultCart = {
  items: [],
  totalPrice: 0,
  totalQuantity: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const {
      items: prevItems,
      totalPrice: prevTotalPrice,
      totalQuantity: prevTotalQuantity,
    } = state;

    // CAPACITY LIMIT FOR WHOLE CART
    if (prevItems.length >= 30) {
      return {
        items: prevItems,
        totalPrice: prevTotalPrice,
        totalQuantity: prevTotalQuantity,
      };
    }

    const messageAdded = action.item.cartItemType.endsWith("message");
    const timeStamp = Math.floor(Date.now() * Math.random());

    // ITEMS WITH MESSAGE ARE CONSIDERED UNIQUE AND WILL NOT STACK IN CART
    if (messageAdded) {
      const currentItem = { ...action.item, quantity: 1, timeStamp };
      const updatedItems = [...prevItems, currentItem];
      const updatedTotalPrice = prevTotalPrice + action.item.price;

      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
        totalQuantity: prevTotalQuantity + 1,
      };
    }

    const handleFindExistingItem = (item) =>
      item.cartItemType === action.item.cartItemType;

    const existingItemIndex = prevItems.findIndex(handleFindExistingItem);

    if (existingItemIndex === -1) {
      const currentItem = { ...action.item, quantity: 1, timeStamp };
      const updatedItems = [...prevItems, currentItem];
      const updatedTotalPrice = prevTotalPrice + action.item.price;

      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
        totalQuantity: prevTotalQuantity + 1,
      };
    }

    const existingItem = prevItems[existingItemIndex];

    // QUANTITY LIMIT FOR EACH ITEM TYPE
    if (existingItem.quantity >= 10) {
      return {
        items: prevItems,
        totalPrice: prevTotalPrice,
        totalQuantity: prevTotalQuantity,
      };
    }

    const updatedItems = prevItems.map((item, index) => {
      if (index === existingItemIndex) {
        return {
          ...item,
          quantity: item.quantity + 1,
          price: item.price + item.price / item.quantity,
        };
      }
      return item;
    });

    const updatedTotalPrice =
      prevTotalPrice + existingItem.price / existingItem.quantity;

    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
      totalQuantity: prevTotalQuantity + 1,
    };
  }
  if (action.type === "UPDATE") {
    // TO DO: ADD LOGIC FOR OPTION CHANGES IN CART
  }
  if (action.type === "REMOVE") {
    const {
      items: prevItems,
      totalPrice: prevTotalPrice,
      totalQuantity: prevTotalQuantity,
    } = state;

    const messageAdded = action.item.cartItemType.endsWith("message");

    if (messageAdded) {
      const handleFindExistingItemWithMessage = (item) => {
        const existingMessage = item.selectedAddons?.find(
          (addon) => addon.type === "addMessage"
        );
        const currentMessage = action.item.selectedAddons?.find(
          (addon) => addon.type === "addMessage"
        );

        return (
          item.cartItemType === action.item.cartItemType &&
          item.timeStamp === action.item.timeStamp &&
          existingMessage.content === currentMessage.content
        );
      };

      const existingItemIndex = prevItems.findIndex(
        handleFindExistingItemWithMessage
      );

      const restPrevItems = prevItems.filter(
        (item, index) => index !== existingItemIndex
      );

      const updatedItems = [...restPrevItems];
      const updatedTotalPrice = prevTotalPrice - action.item.price;

      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
        totalQuantity: prevTotalQuantity - 1,
      };
    }

    const handleFindExistingItem = (item) =>
      item.cartItemType === action.item.cartItemType;

    const existingItemIndex = prevItems.findIndex(handleFindExistingItem);
    const existingItem = prevItems[existingItemIndex];

    if (existingItem.quantity > 1) {
      const updatedItems = prevItems.map((item, index) => {
        if (index === existingItemIndex) {
          return {
            ...item,
            quantity: item.quantity - 1,
            price: item.price - item.price / item.quantity,
          };
        }
        return item;
      });

      const updatedTotalPrice =
        prevTotalPrice - existingItem.price / existingItem.quantity;

      return {
        items: updatedItems,
        totalPrice: updatedTotalPrice,
        totalQuantity: prevTotalQuantity - 1,
      };
    }

    const restPrevItems = prevItems.filter(
      (item, index) => index !== existingItemIndex
    );

    const updatedItems = [...restPrevItems];
    const updatedTotalPrice = prevTotalPrice - action.item.price;

    return {
      items: updatedItems,
      totalPrice: updatedTotalPrice,
      totalQuantity: prevTotalQuantity - 1,
    };
  }

  if (action.type === "EMPTY") {
    return defaultCart;
  }

  return defaultCart;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCart);

  const addItem = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };
  const updateItem = (item) => {
    dispatchCartAction({ type: "UPDATE", item });
  };
  const removeItem = (item) => {
    dispatchCartAction({ type: "REMOVE", item });
  };
  const emptyCart = () => {
    dispatchCartAction({ type: "EMPTY" });
  };

  const cart = {
    items: cartState.items,
    totalPrice: cartState.totalPrice,
    totalQuantity: cartState.totalQuantity,
    addItem,
    updateItem,
    removeItem,
    emptyCart,
  };

  return (
    <CartContext.Provider value={cart}>{props.children}</CartContext.Provider>
  );
};

export default CartProvider;
