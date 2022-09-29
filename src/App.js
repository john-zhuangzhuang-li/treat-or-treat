// import React, { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import CartProvider from "./store/CartProvider";
import UserProvider from "./store/UserProvider";

import StyledThemeProvider from "./store/StyledThemeProvider";
import Layout, { loader as creditsLoader } from "./components/layout/Layout";
import ResultsPage, {
  collectionsLoader,
  productsLoader,
} from "./pages/ResultsPage";
import DetailPage, { loader as detailsLoader } from "./pages/DetailPage";
import MainPage, { loader as promoLoader } from "./pages/MainPage";

import CheckoutPage from "./pages/CheckoutPage";
import UserPage from "./pages/UserPage";
import ErrorPage from "./pages/ErrorPage";

// import Loading from "./components/UI/Loading";

// const MainPage = React.lazy(() => import("./pages/MainPage"));
// const DetailPage = React.lazy(() => import("./pages/DetailPage"));
// const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
// const ResultsPage = React.lazy(() => import("./pages/ResultsPage"));
// const UserPage = React.lazy(() => import("./pages/UserPage"));
// const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      loader={creditsLoader}
      errorElement={<ErrorPage />}
    >
      <Route
        index
        element={<MainPage />}
        loader={promoLoader}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/collection/:collection"
        element={<ResultsPage />}
        loader={collectionsLoader}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/group/:group"
        element={<ResultsPage />}
        loader={productsLoader}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/results/:keyword"
        element={<ResultsPage />}
        loader={productsLoader}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/product/:product"
        element={<DetailPage />}
        loader={detailsLoader}
        errorElement={<ErrorPage />}
      />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/account" element={<UserPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

const App = () => {
  return (
    <StyledThemeProvider>
      <UserProvider>
        <CartProvider>
          <RouterProvider router={router} />
          {/* <Layout>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/detail" element={<DetailPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/account" element={<UserPage />} />
                <Route path="/product/:product" element={<DetailPage />} />
                <Route
                  path="/collection/:collection"
                  element={<ResultsPage />}
                />
                <Route path="/group/:group" element={<ResultsPage />} />
                <Route path="/results/:keyword" element={<ResultsPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Suspense>
          </Layout> */}
        </CartProvider>
      </UserProvider>
    </StyledThemeProvider>
  );
};

export default App;
