import { CategoryOutlined, ColorLens, Dashboard, ShoppingBag, Straight } from "@mui/icons-material";

const sideBarItems = [
    {
        title: "Dashboard",
        route: "/",
        icon: <Dashboard />,
        children: []
    },
    {
        title: "Products",
        route: "/",
        icon: <ShoppingBag />,
        children: [
            {
                title: "Products List",
                route: "/products",
            },
            {
                title: "Add Product",
                route: "/products/add",
            },
            {
                title: "Reviews",
                route: "/products/reviews",
            },

        ],
    },
    {
        title: "Categories",
        route: "/",
        icon: <CategoryOutlined />,
        children: [
            {
                title: "Categories List",
                route: "/category",
            },
            {
                title: "Add Category",
                route: "/category/add",
            },
        ],
    },
    {
        title: "Colors",
        route: "/",
        icon: <ColorLens />,
        children: [
            {
                title: "Colors List",
                route: "/colors",
            },
            {
                title: "Add Color",
                route: "/colors/add",
            },
        ],
    },
    {
        title: "Sizes",
        route: "/",
        icon: <Straight />,
        children: [
            {
                title: "Sizes List",
                route: "/sizes",
            },
            {
                title: "Add Size",
                route: "/sizes/add",
            },
        ],
    }

]

export default sideBarItems;