import React, { useState } from 'react';
import './App.css';

const App = () => {
    // State to manage which page is displayed ('home' or 'generated' table)
    const [page, setPage] = useState('home');
    // State to store the number of variables entered by the user
    const [numVariables, setNumVariables] = useState('');
    // State to store the column headers for the truth table
    const [columnHeaders, setColumnHeaders] = useState([]);
    // State to store the truth table data (an array of rows)
    const [truthTable, setTruthTable] = useState([]);
    // State to store the output headers (e.g., 'Output')
    const [outputHeaders, setOutputHeaders] = useState([]);
    // State to store the user-entered output values for each row of the truth table
    const [outputValues, setOutputValues] = useState([]);

    // Function to generate the truth table and set the headers
    const generateTruthTable = () => {
        // Create default column headers based on the number of variables
        const headers = Array.from({ length: numVariables }, (_, i) => `Var${i + 1}`);
        setColumnHeaders(headers);
        // Set a single output header for the last column
        setOutputHeaders(['Output']);
        // Create and set the truth table based on the number of variables
        setTruthTable(createTruthTable(numVariables));
        // Change the page to display the generated table
        setPage('generated');
    };

    // Function to create the truth table based on the number of variables
    const createTruthTable = (numVars) => {
        // Calculate the number of rows (2^numVars)
        const numRows = 2 ** numVars;
        // Generate the truth table by mapping each row and column to binary values
        return Array.from({ length: numRows }, (_, row) => {
            return Array.from({ length: numVars }, (_, col) => (row >> (numVars - col - 1)) & 1);
        });
    };

    // Function to handle changes in column header names
    const handleHeaderChange = (index, value) => {
        // Update the column header with the new value entered by the user
        setColumnHeaders(prev => {
            const newHeaders = [...prev];
            newHeaders[index] = value;
            return newHeaders;
        });
    };

    // Function to handle changes in the output values
    const handleOutputValueChange = (index, value) => {
        // Update the output value for the corresponding row
        setOutputValues(prev => {
            const newValues = [...prev];
            newValues[index] = value;
            return newValues;
        });
    };

    // Function to export the table to the clipboard in a CSV-like format for pasting into Google Docs
    const exportToClipboard = () => {
        // Select the truth table from the DOM
        const table = document.querySelector('.truth-table');
        let csv = [];
        // Get all table rows (tr elements)
        const rows = table.querySelectorAll('tr');
        // Loop through each row and convert its cells into CSV format
        rows.forEach(row => {
            const cols = row.querySelectorAll('td, th');
            const csvRow = Array.from(cols).map(col => `"${col.innerText}"`).join(',');
            csv.push(csvRow);
        });
        // Join all rows with newlines to form a CSV string
        const csvString = csv.join('\n');
        // Copy the CSV string to the clipboard
        navigator.clipboard.writeText(csvString).then(() => alert('Table copied to clipboard!'));
    };

    return (
        <div className={`App ${page === 'generated' ? 'generated-page' : ''}`}>
            {page === 'home' ? (
                // Home page where the user enters the number of variables
                <div className="home-page">
                    <h1>Create Truth Table</h1>
                    <input
                        type="number"
                        min="1"
                        value={numVariables}
                        onChange={(e) => setNumVariables(e.target.value)}
                        placeholder="Number of Variables"
                    />
                    <button onClick={() => generateTruthTable()}>Generate Table</button>
                </div>
            ) : (
                // Generated truth table page
                <div className="generated-page">
                    <h1>Generated Truth Table</h1>
                    <div className="table-container">
                        <table className="truth-table">
                            <thead>
                            <tr>
                                {/* Render the input fields for column headers */}
                                {columnHeaders.map((header, index) => (
                                    <th key={index}>
                                        <input
                                            type="text"
                                            value={header}
                                            onChange={(e) => handleHeaderChange(index, e.target.value)}
                                            placeholder={`Header ${index + 1}`}
                                        />
                                    </th>
                                ))}
                                <th>
                                    <input
                                        type="text"
                                        value={outputHeaders[0]}
                                        readOnly
                                    />
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Render the truth table rows */}
                            {truthTable.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                    {/* Render the input field for the output value of each row */}
                                    <td>
                                        <input
                                            type="text"
                                            value={outputValues[rowIndex] || ''}
                                            onChange={(e) => handleOutputValueChange(rowIndex, e.target.value)}
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Button to return to the home page to create another table */}
                    <button onClick={() => setPage('home')}>Create Another Table</button>
                    {/* Button to export the table to the clipboard */}
                    <button onClick={exportToClipboard}>Export</button>
                </div>
            )}
        </div>
    );
};

export default App;