import { useReducer } from "react";
import UserContext from "./UserContext";

import { DUMMY_USER_CONTACTS, DUMMY_USER_ADDRESSES } from "./DummyData";

const defaultUser = {
  name: "guest",
  signedIn: false,
  orders: [],
  favorites: [],
  savedContacts: DUMMY_USER_CONTACTS,
  savedAddresses: DUMMY_USER_ADDRESSES,
};

const userReducer = (state, action) => {
  if (action.type === "UPDATE_INFO") {
    if (!action.info || action.info === "") return;
    return {
      ...state,
      name: `${action.info}`,
      signedIn: true,
    };
  }
  if (action.type === "SIGN_OUT") {
    return {
      ...state,
      name: defaultUser.name,
      signedIn: false,
    };
  }
  if (action.type === "ADD_ORDER") {
    if (!action.order) return;
    const orderDate = new Date();
    const timeStamp = Math.floor(orderDate.getTime() * Math.random());
    const updatedOrder = { ...action.order, orderDate, timeStamp };
    const updatedOrders = [updatedOrder, ...state.orders];
    return { ...state, orders: updatedOrders };
  }
  if (action.type === "ADD_FAV") {
    if (!action.product) return;
    if (state.favorites.length > 0) {
      const productExisted = state.favorites.some(
        (product) => product.id === action.product.id
      );
      if (productExisted) return;
    }
    const updatedFavorites = [...state.favorites, action.product];
    return { ...state, favorites: updatedFavorites };
  }
  if (action.type === "REMOVE_FAV") {
    if (!action.id || state.favorites.length === 0) return;
    const updatedFavorites = state.favorites.filter(
      (product) => product.id !== action.id
    );
    return { ...state, favorites: updatedFavorites };
  }
  return defaultUser;
};

const UserProvider = (props) => {
  const [userState, dispatchUserAction] = useReducer(userReducer, defaultUser);

  const updateInfo = (info) => {
    dispatchUserAction({ type: "UPDATE_INFO", info });
  };
  const signOut = () => {
    dispatchUserAction({ type: "SIGN_OUT" });
  };
  const addOrder = (order) => {
    dispatchUserAction({ type: "ADD_ORDER", order });
  };
  const addFavorite = (product) => {
    dispatchUserAction({ type: "ADD_FAV", product });
  };
  const removeFavorite = (id) => {
    dispatchUserAction({ type: "REMOVE_FAV", id });
  };

  const user = {
    name: userState.name,
    signedIn: userState.signedIn,
    orders: userState.orders,
    favorites: userState.favorites,
    savedContacts: userState.savedContacts,
    savedAddresses: userState.savedAddresses,
    updateInfo,
    signOut,
    addOrder,
    addFavorite,
    removeFavorite,
  };

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;
