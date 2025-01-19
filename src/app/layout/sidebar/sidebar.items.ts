export const ROUTES = [
    {
        path: "/dashboard",
        title: "Dashboard",
        icon: "home",
        class: "",
        role: ["ROLE_USER", "ROLE_ADMIN"], // Accessible to USER and ADMIN
        submenu: [],
    },
    {
        path: "/admin",
        title: "Admin Panel",
        icon: "settings",
        class: "",
        role: ["ROLE_ADMIN"], // Only accessible to ADMIN
        submenu: [],
    },
    // Add more menu items with their required roles here...
];
