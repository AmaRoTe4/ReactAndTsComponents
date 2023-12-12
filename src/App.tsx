// App.tsx

import React from 'react';
import EnhancedAutoTable from './components/tables';

const data = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Doe', age: 22 },
];

const columns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name', isButton: true, buttonAction: (row: any) => alert(`Clicked ${row.name}`) },
  { key: 'age', label: 'Age' },
];

const App: React.FC = () => {
  return (
    <div className='w-screen flex flex-col justify-center items-center pt-20 gap-5'>
      <h1>EnhancedAutoTable Example</h1>
      <EnhancedAutoTable data={data} columns={columns} className="my-custom-table" />
    </div>
  );
};

export default App;
