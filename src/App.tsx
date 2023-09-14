import React, { lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./sections/Header";
import "./styles/index.scss";
import Footer from "./sections/Footer";
import Loading from "./components/Loading";
import { FloatButton } from "antd";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { clearToasts } from "./app/slices/AppSlice";
const App = () => {
  const { toasts } = useAppSelector(({ app }) => app);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (toasts.length) {
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 2000,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      };
      toasts.forEach((text: string) => {
        toast(text, toastOptions);
      });
      dispatch(clearToasts());
    }
  }, [toasts, dispatch]);
  const LazyInspiration = lazy(() => import("./pages/Inspiration"));
  const LazyBibleLicious = lazy(() => import("./pages/BibleLicious"));
  const LazyHome = lazy(() => import("./pages/Home"));
  const LazyRecipe = lazy(() => import("./pages/Recipe"));
  const LazyDetailProduct = lazy(() => import("./components/DetailProduct"));
  const LazyTravel = lazy(() => import("./pages/Travel"));
  const LazyReviews = lazy(() => import("./pages/Reviews"));
  const LazySearchResult = lazy(() => import("./components/SearchResult"));
  const LazyFavorites = lazy(() => import("./pages/Favorites"));
  const LazyAboutEsheepKitchen = lazy(
    () => import("./pages/AboutEsheepKitchen")
  );
  return (
    <BrowserRouter>
      <Header />
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/home" Component={LazyHome} />
          <Route path="/recipe" Component={LazyRecipe} />
          <Route path="/inspiration" Component={LazyInspiration} />
          <Route path="/biblelicious" Component={LazyBibleLicious} />
          <Route path="/travel" Component={LazyTravel} />
          <Route path="/review" Component={LazyReviews} />
          <Route path="/favorite" Component={LazyFavorites} />
          <Route path="/about" Component={LazyAboutEsheepKitchen} />
          <Route path="/detail/:id" Component={LazyDetailProduct} />
          <Route path="/search" Component={LazySearchResult} />
          <Route element={<Navigate to="/about" />} path="*">
            {" "}
          </Route>
        </Routes>
      </React.Suspense>
      <ToastContainer />
      <Footer />
      <FloatButton.BackTop type="primary" />
    </BrowserRouter>
  );
};

export default App;
