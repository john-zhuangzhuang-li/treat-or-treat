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
