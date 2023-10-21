import axios from 'axios';
import { useState } from 'react';
import './Dashboard.css';


function Dashboard() {
  const backgroundStyle = {
    backgroundImage: 'url("../../../public/images/thesecretgarden.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemAuthor, setItemAuthor] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddItem = () => {
    if (itemName && itemAuthor && itemDescription) {
      const newItem = { name: itemName, author: itemAuthor, description: itemDescription, user_id:  localStorage.getItem("userId")};
      setItems([...items, newItem]);
      setItemName('');
      setItemAuthor('');
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
      updatedItems[editIndex] = { name: itemName, author: itemAuthor, description: itemDescription };
      setItems(updatedItems);
      setItemName('');
      setItemAuthor('');
      setItemDescription('');
      setEditIndex(null);
    }
  };

  const handleDeleteItem = () => {
    if (editIndex !== null) {
      const updatedItems = items.filter((_, i) => i !== editIndex);
      setItems(updatedItems);
      setItemName('');
      setItemAuthor('');
      setItemDescription('');
      setEditIndex(null);
    }
  };

  const selectItem = (index) => {
    setEditIndex(index);
    setItemName(items[index].name);
    setItemAuthor(items[index].author);
    setItemDescription(items[index].description);
  };

  return (
    <div className="dashboardBackground" style={backgroundStyle}>
      <div className="dashboard-container">
        <div className="dashboard-container">
          <h1>Your Books</h1>
          <h4>Insert the Book name</h4>
          <input
            type="text"
            placeholder="Add a book name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <h4>Insert the Author name</h4>
          <input
          type="text"
          placeholder="Add a book name"
          value={itemAuthor}
          onChange={(e) => setItemAuthor(e.target.value)}
        />
        <h4>Write a description of the book</h4>
          <textarea
             placeholder="Add Description about the book"
             value={itemDescription}
             onChange={(e) => {
              if (e.target.value.length <= 255) {
      setItemDescription(e.target.value);
    }
  }}
/>

          {editIndex === null ? (
            <button onClick={handleAddItem}>Add</button>
          ) : (
            <>
              <button onClick={handleEditItem}>Edit</button>
              <button onClick={handleDeleteItem}>Delete</button>
              <button onClick={handleAddItem}>Add</button>
            </>
          )}

          <ul>
            {items.map((item, index) => (
              <li key={index} onClick={() => selectItem(index)}>  
                <span>{item.name}</span>
                <span>{item.author}</span>
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
