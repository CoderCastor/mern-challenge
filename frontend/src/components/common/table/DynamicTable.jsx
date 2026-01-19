import React from "react";

export const DynamicTable = ({ data }) => {
    console.log(data);
    if (!data || data.length === 0) {
        return (
            <div className="w-full h-40 flex items-center justify-center bg-zinc-50 rounded-xl border border-zinc-200 text-zinc-400 font-medium">
                No data available to display.
            </div>
        );
    }
    const allKeys = Object.keys(data[0]);
    const ignoredKeys = ["id", "store_owner_id"];
    const columns = allKeys.filter((key) => !ignoredKeys.includes(key));

    const formatHeader = (str) => {
        return str
            .replace(/_/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    console.log(formatHeader);

    const formatCellValue = (value) => {
        if (value === null || value === undefined) return "-";
        if (typeof value === "number") return value.toString();
        return value;
    };

    console.log(columns);

    return (
        <div className="w-full bg-zinc-50 rounded-xl overflow-hidden shadow-sm border border-zinc-200">
            {/* Fixed Header */}
            <div className="bg-zinc-100 border-b border-zinc-200">
                <table className="w-full">
                    <thead>
                        <tr className="flex">
                            <th className="p-4 text-center text-zinc-600 font-bold w-16 ">
                                #
                            </th>
                            {columns.map((col) => (
                                <th
                                    key={col}
                                    style={
                                        col == "avg_rating" ||
                                        col == "total_rating_count"
                                            ? {
                                                  width: "85px",
                                                  textWrap: "wrap",
                                              }
                                            : { flexGrow: 1 }
                                    }
                                    className=" p-4 text-left text-zinc-600 font-bold whitespace-nowrap"
                                >
                                    {formatHeader(col)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                </table>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto max-h-100 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent">
                <table className="w-full">
                    <tbody>
                        {data.map((row, index) => (
                            <tr
                                key={index}
                                className="border-b flex border-zinc-100 last:border-0 hover:bg-zinc-200/40 transition-colors"
                            >
                                {/* Numeric Index */}
                                <td className="p-4 text-zinc-400 font-medium text-center text-sm w-16">
                                    {index + 1}
                                </td>

                                {/* Data Cells */}
                                {columns.map((col) => (
                                    <td
                                        key={`${index}-${col}`}
                                        className="p-4 text-zinc-700 text-sm"
                                        title={formatCellValue(row[col])}
                                        style={
                                            col == "avg_rating" ||
                                            col == "total_rating_count"
                                                ? {
                                                      width: "85px",
                                                  }
                                                : { flexGrow: 1 }
                                        }
                                    >
                                        <div className="truncate overflow-hidden">
                                            {formatCellValue(row[col])}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
