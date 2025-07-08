import React from 'react';

interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
  headerBg?: string;
}

const Table: React.FC<TableProps> = ({ headers, rows, headerBg = '#e5e7eb' }) => {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 2px 8px rgba(0,0,0,0.10)', borderRadius: 8, overflow: 'hidden' }}>
      <thead>
        <tr style={{ background: '#e5e7eb', color: '#232946' }}>
          {headers.map((header, idx) => (
            <th key={idx} style={{ background: '#e5e7eb', color: '#232946', padding: 8 }}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ background: '#fff' }}>
            {row.map((cell, j) => (
              <td key={j} style={{ background: '#fff', padding: 8 }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table; 