import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import randomColor from 'randomcolor';
import './App.css';
import DraggableItem from './components/DraggableItem/DraggableItem';

function App() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  );

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  const newItem = () => {
    if (item.trim() === '') {
      alert('Enter someting...');
      setItem('');
      return;
    }

    const newItem = {
      id: uuidv4(),
      item,
      color: randomColor({
        luminosity: 'light',
      }),
      defaultPos: {
        x: 500,
        y: -350,
      },
    };
    setItems((items) => [...items, newItem]);
    setItem('');
  };

  const deleteItemHandler = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updatePos = (data, id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, defaultPos: { x: data.x, y: data.y } }
          : item
      )
    );
  };

  const keyPress = (e) => {
    if (e.key === 'Enter') {
      newItem();
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <input
          type="text"
          value={item}
          onChange={(e) => {
            setItem(e.target.value);
          }}
          onKeyDown={(e) => keyPress(e)}
          placeholder="Enter something..."
        />
        <button onClick={newItem} className="enter">
          Enter
        </button>
      </div>
      {items.map((item) => {
        return (
          <DraggableItem
            onDelete={deleteItemHandler}
            key={item.id}
            item={item}
            updatePos={updatePos}
          />
        );
      })}
    </div>
  );
}

export default App;
