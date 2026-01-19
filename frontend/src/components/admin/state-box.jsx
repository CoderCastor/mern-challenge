import { IconUsersGroup } from "@tabler/icons-react";

export const StateBox = ({ count, title, children,color }) => {
    return (
        <div className="bg-zinc-200 text-zinc-800 flex justify-center rounded-2xl p-3">
            <div className={`flex flex-col gap-2 justify-center items-center rounded-xl p-2`} style={{backgroundColor : color}} >
                <div className=" flex justify-center items-center rounded-full">
                    {/* <IconUsersGroup color="white" size={40} /> */}
                    {children}
                </div>
                <p className="text-zinc-200">{title}</p>
            </div>
            {count ? (
                <p className="text-4xl w-40 pl-3 flex items-center font-semibold">
                    {count}
                </p>
            ) : (
                <p className="text-2xl w-40 pl-3 flex items-center font-semibold animate-pulse">
                    Loading...
                </p>
            )}
        </div>
    );
};
