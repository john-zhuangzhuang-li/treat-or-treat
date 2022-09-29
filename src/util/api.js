export const getCredits = async () => {
  try {
    console.log("CREDITS LOADER RUN");
    const response = await fetch(
      "https://treat-or-treat-default-rtdb.firebaseio.com/credits.json"
    );
    if (!response.ok) {
      console.log(response);
      throw new Error("Something went wrong...");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCollections = async (collectionName) => {
  try {
    console.log("COLLECTIONS LOADER RUN");
    const response = await fetch(
      `https://treat-or-treat-default-rtdb.firebaseio.com/collections/${collectionName}.json`
    );
    if (!response.ok) {
      console.log(response);
      throw new Error("Something went wrong...");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    console.log("PRODUCTS LOADER RUN");
    const response = await fetch(
      "https://treat-or-treat-default-rtdb.firebaseio.com/products.json"
    );
    if (!response.ok) {
      console.log(response);
      throw new Error("Something went wrong...");
    }
    return response.json();
  } catch (error) {
    console.log(error);
  }
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
