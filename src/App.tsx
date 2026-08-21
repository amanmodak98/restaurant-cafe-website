import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import ReservationsPage from "./pages/ReservationsPage";
import ContactPage from "./pages/ContactPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "menu", element: <MenuPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "gallery", element: <GalleryPage /> },
      { path: "reservations", element: <ReservationsPage /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
