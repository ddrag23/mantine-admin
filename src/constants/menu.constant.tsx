import { IconDashboard, IconMap, IconUser } from "@tabler/icons-react";
const menus = [
    {
        name: "Dashboard",
        link: "/",
        icon: <IconDashboard size="1rem" stroke={1.5} />
    },
    {
        name: "User",
        link: "/users",
        icon: <IconUser size="1rem" stroke={1.5} />
    },
    // {
    //     name: "Area",
    //     link: "",
    //     icon: <IconMap size="1rem" stroke={1.5} />,
    //     child: [
    //         {
    //             name: "Province",
    //             link: "/area/province",
    //         },
    //     ]
    // },

]
export default menus 