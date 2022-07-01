import React from "react";

const UserContext = React.createContext({
  name: "",
  signedIn: false,
  orders: [],
  favorites: [],
  savedContacts: [],
  savedAddresses: [],
  updateInfo: (info) => {},
  signOut: () => {},
  addOrder: (order) => {},
  addFavorite: (product) => {},
  removeFavorite: (id) => {},
});

export default UserContext;
