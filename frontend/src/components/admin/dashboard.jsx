import { useEffect, useState } from "react";
import { StateBox } from "./state-box";
import { IconBuildingStore, icons, IconSparkles, IconUsersGroup } from "@tabler/icons-react";
import api from "../../lib/api";
import { TableWidget } from "../common/table/TableWidget";
import { DynamicTable } from "../common/table/DynamicTable";

export const AdminDashboard = () => {
    const [stats, setStats] = useState([
        {
            title: "Users",
            icon: <IconUsersGroup color="white" size={40} />,
            count: 0,
            color: "purple"
        },
        {
            title: "Stores",
            icon: <IconBuildingStore color="white" size={40} />,
            count: 0,
            color : "orange"
        },
        {
            title: "Ratings",
            icon: <IconSparkles color="white" size={40} />,
            count: 0,
            color : "blue"
        },
    ]);

    const [storeData,setStoreData] = useState([])
    const [userData,setUserData] = useState([])

    useEffect(() => {
        const fetchStats = async () => {

            const [stats,storeData,userData] = await Promise.all([
                api.get("/admin/stats"),
                api.get("/admin/get/stores"),
                api.get("/admin/get/users"),
            ])
            
            if (stats.data.success) {
                setStats([
                    {
                        title: "Users",
                        icon: <IconUsersGroup color="white" size={40} />,
                        count: stats.data.data.users,
                        color: "purple"
                    },
                    {
                        title: "Stores",
                        icon: <IconBuildingStore color="white" size={40} />,
                        count: stats.data.data.stores,
                        color: "orange"
                    },
                    {
                        title: "Ratings",
                        icon: <IconSparkles color="white" size={40} />,
                        count: stats.data.data.ratings,
                        color: "blue"
                    },
                ]);
            }
            if(storeData.data.success){
                setStoreData(storeData.data.data)
            }
            if(userData.data.success){
                setUserData(userData.data.data)
            }
        };

        fetchStats();
    }, []);

    console.log(storeData)

    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <div className="flex justify-center gap-4">
                {stats.map((item) => (
                    <StateBox
                        key={item.title}
                        title={item.title}
                        count={item.count}
                        color={item.color}
                    >
                        {item.icon}
                    </StateBox>
                ))}
            </div>
            <TableWidget usersData={userData} storesData={storeData} />
          
        </div>
    );
};
