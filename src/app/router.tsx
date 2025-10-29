import { createBrowserRouter, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Loader } from "../components/Loader";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <div className="container p-5 flex flex-col gap-5">
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
          import("../pages/main-page").then((comp) => ({
            Component: comp.MainPage,
          })),
      },
      {
        path: "about",
        lazy: () =>
          import("../pages/about-page").then((comp) => ({
            Component: comp.AboutPage,
          })),
      },
      {
        path: "*",
        lazy: () =>
          import("../pages/not-found-page").then((comp) => ({
            Component: comp.NotFoundPage,
          })),
      },
    ],
  },
]);
