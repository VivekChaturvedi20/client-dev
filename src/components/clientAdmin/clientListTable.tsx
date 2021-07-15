import React from 'react';
import { useTable } from 'react-table';
import { Table } from 'react-bootstrap';
import styles from './clientListTable.module.scss';

interface Props {
    columns:{ Header: string; accessor: string; }[],
    data:{
        name: string,
        contractStartDate: string,
        contractEndDate: string,
        active: string }[]
}

function ClientListTable(props:Props) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns: props.columns,
        data: props.data
    });

    // Render the UI for your table
    return (
        <div className={styles['data-table']}>
            <Table {...getTableProps()} striped bordered responsive>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => <td {...cell.getCellProps()}>{cell.render('Cell')}</td>)}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default ClientListTable;
