import React from 'react';
import { useState, useEffect } from "react";
import './RecordTable.css';

const RecordTable = () => {

    const [list, setList] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [sortBy, setSortBy] = useState("Name");
    const [originalList, setOriginalList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/")
        .then((response) => response.json())
        .then((payload) => {
            setList(payload);
            setOriginalList(payload);
        });
    }, []);

    const handleSort = (column) => {
        if (column === sortBy) {
          setList([...list.reverse()]);
        } else {
          setList([...list.sort((a, b) => a[column].localeCompare(b[column]))]);
          setSortBy(column);
        }
    };

    const handleFilter = (value) => {
        setFilterBy(value);
        if (value.length === 0) {
            setList(originalList);
        } else {
            const filteredList = list.filter((record) =>
              record.Name.toLowerCase().includes(value.toLowerCase())
            );
            setList(filteredList);
        }
    };

    return (
        <>
            <h1>Sales CRM</h1>
            <div className="filtering">
                <label htmlFor="filter">Filter by Name:</label>
                <input
                type="text"
                id="filter"
                value={filterBy}
                onChange={(e) => handleFilter(e.target.value)}
                />
            </div>
            <table className="record-table">
                <thead>
                    <tr>
                    <th onClick={() => handleSort("Name")}>Name</th>
                    <th onClick={() => handleSort("Company")}>Company</th>
                    <th onClick={() => handleSort("Status")}>Status</th>
                    <th onClick={() => handleSort("Priority")}>Priority</th>
                    <th onClick={() => handleSort("EstimatedValue")}>Estimated Value</th>
                    <th onClick={() => handleSort("AccountOwner")}>Account Owner</th>
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
