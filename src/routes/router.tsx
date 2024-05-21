import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import SignIn from "../pages/sign-in/SignIn";
import Home from "../pages/home/home";
import ProtectedRoute from "./ProtectedRoute";
import ProductList from "../pages/products/product-list";
import AddProducts from "../pages/products/add-product";
import CategoryList from "../pages/categories/category-list";
import AddCategory from "../pages/categories/add-category";
import EditCategory from "../pages/categories/edit-category";
import ColorsList from "../pages/colors/colors-list";
import AddColors from "../pages/colors/add-colors";
import EditColors from "../pages/colors/edit-colors";
import SizeList from "../pages/sizes/size-list";
import AddSize from "../pages/sizes/add-sizes";
import EditSize from "../pages/sizes/edit-size";
import EditProducts from "../pages/products/edit-product";
const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><DefaultLayout /></ProtectedRoute>,
        //   loader: rootLoader,
        children: [
            {
                path: "",
                element: <Home />,
                //   loader: teamLoader,
            },
            {
                path: "products",
                element: <ProductList />,

            },
            {
                path: "products/add",
                element: <AddProducts />,
            },
            {
                path: "products/edit/:id",
                element: <EditProducts />,
            },
            {
                path: "category",
                element: <CategoryList />
            },
            {
                path: "category/add",
                element: <AddCategory />
            },
            {
                path: "category/edit/:id",
                element: <EditCategory />
            },

            {
                path: "colors",
                element: <ColorsList />
            },
            {
                path: "colors/add",
                element: <AddColors />
            },
            {
                path: "colors/edit/:id",
                element: <EditColors />
            },
            {
                path: "sizes",
                element: <SizeList />
            },
            {
                path: "sizes/add",
                element: <AddSize />
            },
            {
                path: "sizes/edit/:id",
                element: <EditSize />
            }


        ],
    },
    {
        path: "/login",
        element: <SignIn />
    }
]);


export default router;