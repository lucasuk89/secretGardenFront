import axios from 'axios';
import { useEffect, useState } from 'react';
import './Dashboard.css';
import Cookies from 'js-cookie';

function Dashboard() {
  const backgroundStyle = {
    backgroundImage: 'url("../../../public/leafs.png")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemAuthor, setItemAuthor] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    recoverUserItems();
  }, []);

  const handleAddItem = async () => {
    if (itemName && itemAuthor && itemDescription) {
      const user = JSON.parse(localStorage.getItem('user'));
     // const username = Cookies.get('username');
      const newItem = {
        name: itemName,
        author: itemAuthor,
        description: itemDescription,
        user_id: user.id,
      };
      setItemName('');
      setItemAuthor('');
      setItemDescription('');
      // Enviar os dados do novo item para o servidor
      let id = await saveItem(newItem);
      newItem.id = id;
      setItems([...items, newItem]);
    }
  };


  /*const handleLogin = async () => {
    const usernameInput = document.getElementById('username-input'); // Suponha que você tenha um campo de entrada com o ID 'username-input'
    const username = usernameInput.value; // Obtenha o valor do campo de entrada
    Cookies.set('username', username, { expires: 7 });
  };*/

  const handleEditItem = async () => {
    if (editIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editIndex] = {
        name: itemName,
        author: itemAuthor,
        description: itemDescription,
        user_id: items[editIndex].user_id,
        id: items[editIndex].id,
      };
      setItemName('');
      setItemAuthor('');
      setItemDescription('');
      setEditIndex(null);
      await updateUserItems(updatedItems[editIndex]);
      setItems(updatedItems);
    }
  };

  async function saveItem(newItem) {
    return await axios
      .post('http://localhost:3000/api/dashboard/items', newItem) //
      .then((response) => {
        console.log(
          'Dados do formulário enviados com sucesso para o servidor:',
          response.data
        );
        return response.data.id;
      })
      .catch((error) => {
        console.error(
          'Erro ao enviar dados do formulário para o servidor:',
          error
        );
      });
  }

  async function handleDeleteItem () {
    if (editIndex !== null) {
      const response = await deleteUserItems(items[editIndex].id);
      if (response) {
        const updatedItems = items.filter((_, i) => i !== editIndex);
        setItems(updatedItems);
        setItemName('');
        setItemAuthor('');
        setItemDescription('');
        setEditIndex(null);
      }
    }
  }

  const selectItem = (index) => {
    setEditIndex(index);
    // Adicionar mudança de fundo para item selecionado para marcar que o item está selecionado
    setItemName(items[index].name);
    setItemAuthor(items[index].author);
    setItemDescription(items[index].description);
  };

  async function recoverUserItems() {
    const user = JSON.parse(localStorage.getItem('user'));
    await axios
      .get(`http://localhost:3000/api/dashboard/items/${user.id}`)
      .then((response) => {
        console.log('User items recovered successfully:', response.data);
        if (response.data.items.length > 0) {
          setItems(response.data.items);
        } else {
          setItems([]);
        }
      })
      .catch((error) => {
        console.error('Error recovering user items:', error);
      });
  }

  async function deleteUserItems(itemId) {
    return await axios
      .delete(`http://localhost:3000/api/dashboard/items/${itemId}`)
      .then((response) => {
        console.log('User items deleted successfully:', response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error deleting user items:', error);
      });
  }

  async function updateUserItems(updatedItem) {
    return await axios
      .patch(
        `http://localhost:3000/api/dashboard/items/${updatedItem.id}`,
        updatedItem
      )
      .then((response) => {
        console.log('User items updated successfully:', response.data);
        return response.data;
      })
      .catch((error) => {
        console.error('Error updating user items:', error);
      });
  }

  return (
    <div className='dashboardBackground' style={backgroundStyle}>
      <div className='dashboard-container'>
        <div className='dashboard-container'>
          <h1>Your Books</h1>
          <h4>Insert the Book name</h4>
          <input
            type='text'
            placeholder='Add a book name'
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <h4>Insert the Author name</h4>
          <input
            type='text'
            placeholder='Add a book name'
            value={itemAuthor}
            onChange={(e) => setItemAuthor(e.target.value)}
          />
          <h4>Write a description of the book</h4>
          <textarea
            placeholder='Add Description about the book'
            value={itemDescription}
            onChange={(e) => {
              if (e.target.value.length <= 255) {
                setItemDescription(e.target.value);
              }
            }}
          />

          <table style={{ width: '100%', tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: '33.33%' }}>Title</th>
                <th style={{ width: '33.33%' }}>Author</th>
                <th style={{ width: '33.33%' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} onClick={() => selectItem(index)}>
                  <td style={{ width: '33.33%', textAlign: 'center' }}>
                    {item.name}
                  </td>
                  <td style={{ width: '33.33%', textAlign: 'center' }}>
                    {item.author}
                  </td>
                  <td style={{ width: '33.33%', textAlign: 'center' }}>
                    {item.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {editIndex === null ? (
            <button onClick={handleAddItem}>Add</button>
          ) : (
            <>
              <button onClick={handleEditItem}>Edit</button>
              <button onClick={handleDeleteItem}>Delete</button>
              <button onClick={handleAddItem}>Add</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
