import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import CartProvider from "./store/CartProvider";
import UserProvider from "./store/UserProvider";

import StyledThemeProvider from "./store/StyledThemeProvider";
import Layout from "./components/layout/Layout";
import Loading from "./components/UI/Loading";

const MainPage = React.lazy(() => import("./pages/MainPage"));
const DetailPage = React.lazy(() => import("./pages/DetailPage"));
const CheckoutPage = React.lazy(() => import("./pages/CheckoutPage"));
const ResultsPage = React.lazy(() => import("./pages/ResultsPage"));
const UserPage = React.lazy(() => import("./pages/UserPage"));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  return (
    <StyledThemeProvider>
      <UserProvider>
        <CartProvider>
          <Layout>
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
          </Layout>
        </CartProvider>
      </UserProvider>
    </StyledThemeProvider>
  );
};

export default App;
