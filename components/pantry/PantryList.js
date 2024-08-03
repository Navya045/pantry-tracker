import React, { useState } from 'react';
import styled from 'styled-components';
import { firebaseDB } from 'lib/data/firebase';

const List = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const EditInput = styled.input`
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const PantryList = ({ items = [] }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedQuantity, setEditedQuantity] = useState('');

  const handleEdit = (item) => {
    setEditingItem(item.id);
    setEditedName(item.name);
    setEditedQuantity(item.quantity);
  };

  const handleSave = (item) => {
    const updatedItem = {
      ...item,
      name: editedName,
      quantity: editedQuantity
    };
    firebaseDB.collection('pantry').doc(item.id).set(updatedItem);
    setEditingItem(null);
  };

  const handleDelete = (id) => {
    firebaseDB.collection('pantry').doc(id).delete();
  };

  return (
    <div>
      <List>
        {items.map(item => (
          <ListItem key={item.id}>
            {editingItem === item.id ? (
              <ItemDetails>
                <EditInput
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <EditInput
                  type="number"
                  value={editedQuantity}
                  onChange={(e) => setEditedQuantity(e.target.value)}
                />
                <Button onClick={() => handleSave(item)}>Save</Button>
                <Button onClick={() => setEditingItem(null)}>Cancel</Button>
              </ItemDetails>
            ) : (
              <ItemDetails>
                <span>{item.name} - {item.quantity}</span>
                <div>
                  <Button onClick={() => handleEdit(item)}>Edit</Button>
                  <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                </div>
              </ItemDetails>
            )}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default PantryList;
