import React from 'react';
import { useState, useEffect } from "react";
import './RecordTable.css';

const RecordTable = () => {

    const [list, setList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/")
        .then((response) => response.json())
        .then((payload) => {
            setList(payload);
        });
    }, []);

    return (
        <>
            <h1>Sales CRM</h1>
            <table className="record-table">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Estimated Value</th>
                    <th>Account Owner</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((record, index) => (
                    <tr key={index}>
                        <td>{record.Name}</td>
                        <td>{record.Company}</td>
                        <td className={`status ${record.Status === 'Closed' ? 'status-closed' : record.Status === 'Negotiation' ? 'status-negotiation' : 'status-proposal'}`}>{record.Status}</td>
                        <td className={record.Priority === 'High' ? 'priority-high' : record.Priority === 'Medium' ? 'priority-medium' : 'priority-low'}>{record.Priority}</td>
                        <td>{record.EstimatedValue}</td>
                        <td>{record.AccountOwner}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default RecordTable;
