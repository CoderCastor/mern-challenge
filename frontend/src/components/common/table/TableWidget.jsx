import { useState, useMemo } from "react";
import { IconFilter, IconSearch, IconChevronDown } from "@tabler/icons-react";
import { DynamicTable } from "./DynamicTable";
import { cn } from "../../../lib/cn";
import { Form } from "../forms/form";
import { storeSchema, userSchemaforAdmin } from "../../../lib/zod";
import api from "../../../lib/api";
import {toast} from "react-hot-toast"

export const TableWidget = ({ usersData = [], storesData = [] }) => {
    const [activeTab, setActiveTab] = useState("users");
    const [filterBy, setFilterBy] = useState("name");
    const [searchQuery, setSearchQuery] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);

    const rawData = activeTab === "users" ? usersData : storesData;

    const filteredData = useMemo(() => {
        if (!searchQuery) return rawData;

        return rawData.filter((item) => {
            const itemValue = item[filterBy];

            if (itemValue === null || itemValue === undefined) return false;

            const itemString = itemValue.toString().toLowerCase();
            const queryString = searchQuery.toLowerCase();

            return itemString.includes(queryString);
        });
    }, [rawData, searchQuery, filterBy]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setFilterBy("name");
        setSearchQuery("");
    };

    const getFilterOptions = () => {
        if (activeTab === "users") {
            return ["name", "email", "address", "role"];
        } else {
            return [
                "name",
                "email",
                "address",
                "avg_rating",
                "total_rating_count",
            ];
        }
    };

    const handleAddStore = async (formData) => {
        try{
            const res = await api.post("/admin/add/store",formData)
            if(res.data.success){
                toast.success("Store added successfully")
                setShowPopUp(false)
            }else{
                toast.error("Failed to add Store")
            }
            
        }catch(e){
            if(!e.response.data.success){

                toast.error(e.response.data.message)
            }
            
        }
    }

    return (
        <div className="relative p-4 rounded-2xl w-full max-w-6xl mx-auto mt-6 shadow-sm ring-1 ring-zinc-300/50">
            {showPopUp && activeTab == "users" && (
                <div className="absolute z-20 inset-x-0 mx-auto">
                    <Form
                        zodSchema={userSchemaforAdmin}
                        formTitle={"Add new user"}
                        showCloseButton={true}
                        closeForm={() => setShowPopUp(false)}
                    />
                </div>
            )}

            {showPopUp && activeTab == "stores" && (
                <div className="absolute z-20 inset-x-0 mx-auto">
                    <Form
                        zodSchema={storeSchema}
                        formTitle={"Add new store"}
                        showCloseButton={true}
                        closeForm={() => setShowPopUp(false)}
                        handleSubmit={handleAddStore}
                    />
                </div>
            )}

            <div className="flex flex-col lg:flex-row justify-between items-center mb-4 bg-zinc-50 rounded-xl p-3 gap-4 shadow-sm border border-zinc-200">
                <div className="flex gap-4 items-center">
                    <div className="flex gap-2 bg-zinc-200/50 p-1 rounded-lg w-full lg:w-auto">
                        <TabButton
                            isActive={activeTab === "users"}
                            onClick={() => handleTabChange("users")}
                            label="Users"
                        />
                        <TabButton
                            isActive={activeTab === "stores"}
                            onClick={() => handleTabChange("stores")}
                            label="Stores"
                        />
                    </div>
                    {activeTab === "users" ? (
                        <TabButton
                            label={"Add User"}
                            className="bg-purple-700/90 text-zinc-100 hover:bg-purple-700 hover:text-zinc-50 px-4 h-10"
                            onClick={() => setShowPopUp(true)}
                        />
                    ) : (
                        <TabButton
                            label={"Add Store"}
                            className="bg-orange-700/90 text-zinc-100 hover:bg-orange-700 hover:text-zinc-50 px-4 h-10"
                            onClick={() => setShowPopUp(true)}
                        />
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                    <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 rounded-lg border border-zinc-200 min-w-[160px]">
                        <IconFilter size={18} className="text-zinc-500" />
                        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                            Filter:
                        </span>
                        <select
                            value={filterBy}
                            onChange={(e) => {
                                setFilterBy(e.target.value);
                                setSearchQuery("");
                            }}
                            className="bg-transparent text-zinc-700 text-sm font-medium w-full outline-none cursor-pointer capitalize appearance-none"
                        >
                            {getFilterOptions().map((opt) => (
                                <option key={opt} value={opt}>
                                    {opt.replace(/_/g, " ")}
                                </option>
                            ))}
                        </select>
                        <IconChevronDown size={14} className="text-zinc-400" />
                    </div>

                    <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-zinc-200 flex-1 min-w-[250px] focus-within:ring-2 focus-within:ring-zinc-200 transition-all">
                        {filterBy === "role" && activeTab === "users" ? (
                            <select
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent text-zinc-700 font-medium w-full outline-none cursor-pointer"
                            >
                                <option value="">All Roles</option>
                                <option value="ADMIN">Admin</option>
                                <option value="STORE_OWNER">Store Owner</option>
                                <option value="NORMAL">Normal</option>
                            </select>
                        ) : (
                            <>
                                <IconSearch
                                    size={18}
                                    className="text-zinc-400"
                                />
                                <input
                                    type="text"
                                    placeholder={`Search ${filterBy.replace(/_/g, " ")}...`}
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="bg-transparent text-zinc-700 text-sm w-full outline-none placeholder:text-zinc-400"
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>

            <DynamicTable data={filteredData} />
        </div>
    );
};

const TabButton = ({ isActive, onClick, label, className }) => (
    <button
        onClick={onClick}
        className={cn(
            `flex-1 sm:flex-none px-6 py-2 rounded-md font-semibold text-sm transition-all duration-200 ${
                isActive
                    ? "bg-white text-zinc-800 shadow-sm ring-1 ring-zinc-200"
                    : "text-zinc-500 hover:text-zinc-700 hover:bg-zinc-300/50"
            }`,
            className,
        )}
    >
        {label}
    </button>
);
