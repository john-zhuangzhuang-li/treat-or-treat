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
// import Loading from "./components/UI/Loading";

import MainPage from "./pages/MainPage";
import DetailPage from "./pages/DetailPage";
import CheckoutPage from "./pages/CheckoutPage";
import ResultsPage from "./pages/ResultsPage";
import UserPage from "./pages/UserPage";
import NotFoundPage from "./pages/NotFoundPage";

// const MainPage = React.lazy(() => import("./pages/MainPage"));
// const DetailPage = React.lazy(() => import("./pages/DetailPage"));
// const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
// const ResultsPage = React.lazy(() => import("./pages/ResultsPage"));
// const UserPage = React.lazy(() => import("./pages/UserPage"));
// const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} loader={creditsLoader}>
      <Route index element={<MainPage />} />
      <Route path="/detail" element={<DetailPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/account" element={<UserPage />} />
      <Route path="/product/:product" element={<DetailPage />} />
      <Route path="/collection/:collection" element={<ResultsPage />} />
      <Route path="/group/:group" element={<ResultsPage />} />
      <Route path="/results/:keyword" element={<ResultsPage />} />
      <Route path="*" element={<NotFoundPage />} />
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
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </Layout> */}
        </CartProvider>
      </UserProvider>
    </StyledThemeProvider>
  );
};

export default App;
