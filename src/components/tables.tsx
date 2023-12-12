// EnhancedAutoTable.tsx

import React, { FC } from 'react';

interface Column {
    key: string;
    label: string;
    isButton?: boolean;
    buttonAction?: (rowData: Record<string, any>) => void;
}

interface AutoTableProps {
    data: Record<string, any>[];
    columns: Column[];
    className?: string;
}

const EnhancedAutoTable: FC<AutoTableProps> = ({ data, columns, className }) => {
    const renderCellContent = (row: Record<string, any>, column: Column) => {
        if (column.isButton && column.buttonAction) {
            return (
                <button onClick={() => column.buttonAction?.(row)} className="border border-white px-3 py-2 rounded-lg bg-slate-200 text-black">
                    {row.name}
                </button>
            );
        } else {
            return row[column.key];
        }
    };

    return (
        <table className={`w-full max-w-[1200px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table ${className}`}>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                    {columns.map((column) => (
                        <th scope="col" className="px-6 py-3" key={column.key}>{column.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className='class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"'>
                        {columns.map((column) => (
                            <td scope="row" className="px-6 py-4" key={column.key}>{renderCellContent(row, column)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default EnhancedAutoTable;
