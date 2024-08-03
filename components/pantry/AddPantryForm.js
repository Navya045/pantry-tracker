import React, { useState } from 'react';
import { firebaseDB } from 'lib/data/firebase';
import styled from 'styled-components';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f8ff;
  padding: 20px;
  border-radius: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #218838;
  }
`;

const Popup = styled.div`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  margin-top: 10px;
`;

const AddPantryForm = () => {
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      await firebaseDB.collection('pantry').add({
        name: itemName,
        quantity: itemQuantity,
        dateCreated: new Date(),
      });

      setShowPopup(true);
      setItemName('');
      setItemQuantity('');

      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding item: ', error);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleAddItem}>
        <Input
          type="text"
          placeholder="Item Name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Quantity"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        <Button type="submit">Add Item</Button>
      </Form>
      {showPopup && <Popup>Item added successfully!</Popup>}
    </FormContainer>
  );
};

export default AddPantryForm;
