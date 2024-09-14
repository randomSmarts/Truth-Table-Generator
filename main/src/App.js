import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [page, setPage] = useState('home');
    const [numVariables, setNumVariables] = useState('');
    const [columnHeaders, setColumnHeaders] = useState([]);
    const [truthTable, setTruthTable] = useState([]);
    const [outputHeaders, setOutputHeaders] = useState([]);
    const [outputValues, setOutputValues] = useState([]);

    const generateTruthTable = () => {
        const headers = Array.from({ length: numVariables }, (_, i) => `Var${i + 1}`);
        setColumnHeaders(headers);
        setOutputHeaders(['Output']);
        setTruthTable(createTruthTable(numVariables));
        setPage('generated');
    };

    const createTruthTable = (numVars) => {
        const numRows = 2 ** numVars;
        return Array.from({ length: numRows }, (_, row) => {
            return Array.from({ length: numVars }, (_, col) => (row >> (numVars - col - 1)) & 1);
        });
    };

    const handleHeaderChange = (index, value) => {
        setColumnHeaders(prev => {
            const newHeaders = [...prev];
            newHeaders[index] = value;
            return newHeaders;
        });
    };

    const handleOutputValueChange = (index, value) => {
        setOutputValues(prev => {
            const newValues = [...prev];
            newValues[index] = value;
            return newValues;
        });
    };

    const exportToClipboard = () => {
        const table = document.querySelector('.truth-table');
        let csv = [];
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            const cols = row.querySelectorAll('td, th');
            const csvRow = Array.from(cols).map(col => `"${col.innerText}"`).join(',');
            csv.push(csvRow);
        });
        const csvString = csv.join('\n');
        navigator.clipboard.writeText(csvString).then(() => alert('Table copied to clipboard!'));
    };

    return (
        <div className={`App ${page === 'generated' ? 'generated-page' : ''}`}>
            {page === 'home' ? (
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
                <div className="generated-page">
                    <h1>Generated Truth Table</h1>
                    <div className="table-container">
                        <table className="truth-table">
                            <thead>
                            <tr>
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
                            {truthTable.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
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
                    <button onClick={() => setPage('home')}>Create Another Table</button>
                    <button onClick={exportToClipboard}>Export</button>
                </div>
            )}
        </div>
    );
};

export default App;