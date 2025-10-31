import { createBrowserRouter, Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";
import { Loader } from "../components/loader/Loader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <div className="main">
          <Header />
          <Outlet />
          <Footer />
          <Loader /> 
        </div>
    ),
    children: [
      {
        path: "/",
        lazy: () =>
          import("../pages/main/main-page").then((comp) => ({
            Component: comp.MainPage,
          })),
      },
      {
        path: "about",
        lazy: () =>
          import("../pages/about/about-page").then((comp) => ({
            Component: comp.AboutPage,
          })),
      },
      {
        path: "*",
        lazy: () =>
          import("../pages/not-found/not-found-page").then((comp) => ({
            Component: comp.NotFoundPage,
          })),
      },
    ],
  },
]);
