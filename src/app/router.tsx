import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />
  ,
    children: [
      {
        path: "/",
        lazy: () =>
          import("../pages/main/main-page").then((comp) => ({
            Component: comp.MainPage,
          })),
      },
      {
        path: "hotel/:id",
        lazy: () =>
          import("../pages/hotel/hotel-page").then((comp) => ({
            Component: comp.HotelPage,
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
