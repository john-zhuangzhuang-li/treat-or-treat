export const getCredits = async () => {
  console.log("CREDITS LOADER RUN");
  const response = await fetch(
    "https://treat-or-treat-default-rtdb.firebaseio.com/credits.json"
  );
  if (!response.ok) {
    console.log(response);
    throw new Error("Something went wrong...");
  }
  return response.json();
};

export const getCollections = async (collectionName) => {
  console.log("COLLECTIONS LOADER RUN");
  const response = await fetch(
    `https://treat-or-treat-default-rtdb.firebaseio.com/collections/${collectionName}.json`
  );
  if (!response.ok) {
    console.log(response);
    throw new Error("Something went wrong...");
  }
  return response.json();
};

export const getProducts = async () => {
  console.log("PRODUCTS LOADER RUN");
  const response = await fetch(
    "https://treat-or-treat-default-rtdb.firebaseio.com/products.json"
  );
  if (!response.ok) {
    console.log(response);
    throw new Error("Something went wrong...");
  }
  return response.json();
};

export const getProductDetails = async (productId) => {
  const id = productId.slice(0, -3);
  console.log("DETAILS LOADER RUN");
  const response = await fetch(
    `https://treat-or-treat-default-rtdb.firebaseio.com/collections/${id}.json`
  );
  if (!response.ok) {
    console.log(response);
    throw new Error("Something went wrong...");
  }
  return response.json();
};

export const getPromo = async () => {
  console.log("PROMO LOADER RUN");
  const response = await fetch(
    `https://treat-or-treat-default-rtdb.firebaseio.com/promo-lists.json`
  );
  if (!response.ok) {
    console.log(response);
    throw new Error("Something went wrong...");
  }
  return response.json();
};

export const SEARCH_FETCH_LOCATION =
  "https://treat-or-treat-default-rtdb.firebaseio.com/search.json";

// export const getSearch = async () => {
//   console.log("SEARCH LOADER RUN");
//   const response = await fetch(
//     `https://treat-or-treat-default-rtdb.firebaseio.com/search.json`
//   );
//   if (!response.ok) {
//     console.log(response);
//     throw new Error("Something went wrong...");
//   }
//   return response.json();
// };
