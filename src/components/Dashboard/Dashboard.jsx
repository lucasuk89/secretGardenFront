import React, { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import backgroundGif from '../../../public/images/dashboardgif.gif';

function Dashboard() {
  const backgroundStyle = {
    backgroundImage: 'url("../../../public/images/thesecretgarden.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [itemDescription, setItemDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddItem = () => {
    if (itemName && itemImage) {
      const newItem = { name: itemName, image: itemImage, description: itemDescription };
      setItems([...items, newItem]);
      setItemName('');
      setItemImage(null);
      setItemDescription('');
  
      // Enviar os dados do novo item para o servidor
      axios
        .post('http://localhost:3000/api/dashboard', newItem) //
        .then((response) => {
          console.log('Dados do formulário enviados com sucesso para o servidor:', response.data);
        })
        .catch((error) => {
          console.error('Erro ao enviar dados do formulário para o servidor:', error);
        });
    }
  }
  
  const handleEditItem = () => {
    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = { name: itemName, image: itemImage, description: itemDescription };
      setItems(updatedItems);
      setItemName('');
      setItemImage(null);
      setItemDescription('');
      setEditIndex(null);
    }
  };

  const handleDeleteItem = () => {
    if (editIndex !== null) {
      const updatedItems = items.filter((_, i) => i !== editIndex);
      setItems(updatedItems);
      setItemName('');
      setItemImage(null);
      setItemDescription('');
      setEditIndex(null);
    }
  };

  const selectItem = (index) => {
    setEditIndex(index);
    setItemName(items[index].name);
    setItemImage(items[index].image);
    setItemDescription(items[index].description);
  };

  return (
    <div className="dashboardBackground" style={backgroundStyle}>
      <div className="dashboard-container" style={{ backgroundImage: `url(${backgroundGif})` }}>
        <div className="dashboard-container">
          <h1>Dashboard</h1>
          <input
            type="text"
            placeholder="Add Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setItemImage(e.target.files[0])}
          />
          <textarea
            placeholder="Add Description"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          />
          {editIndex === null ? (
            <button onClick={handleAddItem}>Add</button>
          ) : (
            <>
              <button onClick={handleEditItem}>Edit</button>
              <button onClick={handleDeleteItem}>Delete</button>
            </>
          )}

          <ul>
            {items.map((item, index) => (
              <li key={index} onClick={() => selectItem(index)}>
                <span>{item.name}</span>
                <img src={URL.createObjectURL(item.image)} alt={item.name} />
                <p>{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
