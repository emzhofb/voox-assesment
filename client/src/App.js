import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      let url = `http://localhost:3001/?`;
      if (filter) {
        url += filter;
      }
      
      try {
        const result = await axios({
          method: 'GET',
          url: url
        });
  
        setData(result.data.data);
      } catch (error) {
        
      }
    };

    fetchData();
  });

  function onClickPriority(filter) {
    setFilter(`priority=${filter}`);
  }
  function onClickLabel(filter) {
    setFilter(`label=${filter}`);
  }
  function onClickReset() {
    setFilter('');
  }
  
  const listItems = data.map((v) =>
    <tr key={v.ID}>
      <td>{v.Title}</td>
      <td>{v.priority}</td>
      <td>{v.label}</td>
    </tr>
  );
  return (
    <div>
      <h1>Voox Assesment</h1>
      <button onClick={() => onClickPriority('high')}>High Priority</button>
      <button onClick={() => onClickPriority('mid')}>Mid Priority</button>
      <button onClick={() => onClickPriority('low')}>Low Priority</button>
      <br />
      <button onClick={() => onClickLabel('electrical')}>Electrical Label</button>
      <button onClick={() => onClickLabel('mechanical')}>Mechanical Label</button>
      <button onClick={() => onClickLabel('landscape')}>Landscape Label</button>
      <button onClick={() => onClickLabel('plumbing')}>Plumbing Label</button>
      <br />
      <button onClick={onClickReset}>reset</button>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>priority</th>
            <th>label</th>
          </tr>
          {listItems}
        </tbody>
      </table>
    </div>
  );
}

export default App;
