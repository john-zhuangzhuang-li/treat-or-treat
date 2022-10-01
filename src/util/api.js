// FOR LOADER

export const getData = async (location) => {
  if (!location) return;
  // console.log(`LOADING DATA FROM ${location}`);
  const response = await fetch(
    `https://treat-or-treat-default-rtdb.firebaseio.com/${location}.json`
  );
  if (!response.ok) {
    console.log(response);
    throw new Error("Something went wrong...");
  }
  return response.json();
};

// FOR USE EFFECT

export const SEARCH_FETCH_LOCATION =
  "https://treat-or-treat-default-rtdb.firebaseio.com/search.json";

// FOR DUMMY DATA SETUP

// export const setupRemoteData = async (location, data) => {
//   try {
//     const response = await fetch(location, {
//       method: "PUT",
//       body: JSON.stringify(data),
//       headers: {
//         "content-type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       console.log(response);
//       throw new Error("Something went wrong...");
//     }
//     const remoteData = await response.json();
//     console.log(remoteData);
//   } catch (error) {
//     console.log(error);
//   }
// };
