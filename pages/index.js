import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { config } from 'config/config';
import { showErrorNotification } from 'lib/showNotification';
import { pantryCollection, PantryContextProvider } from 'hooks/usePantry';
import useUser from 'hooks/useUser';

import PantryList from 'components/pantry/PantryList';
import AddPantryForm from 'components/pantry/AddPantryForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  color: #343a40;
`;

const Header = styled.h1`
  text-align: center;
  color: #4CAF50;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
`;

const SignInText = styled.p`
  margin-top: 20px;
  color: #343a40;
`;

const SignInLink = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function PantryTrackerPage({ items = [] }) {
  const { query } = useRouter();
  const { user, signOut } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  useEffect(() => {
    setFilteredItems(
      items.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, items]);

  return (
    <Container>
      <Header>Pantry Tracker</Header>

      <SearchInput
        type="text"
        placeholder="Search pantry items"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <PantryContextProvider items={filteredItems} onError={showErrorNotification}>
        <PantryList items={filteredItems} />
        <AddPantryForm />
      </PantryContextProvider>

      {user ? (
        <>
          <SignInText>You are signed in as <strong>{user.email ?? user.displayName}</strong></SignInText>
          <SignInText><SignInLink onClick={signOut}>Sign out</SignInLink></SignInText>
        </>
      ) : (
        <SignInText>
          <Link legacyBehavior href='/signin'>
            <SignInLink>Click here to sign in</SignInLink>
          </Link>
        </SignInText>
      )}
    </Container>
  );
}

export default PantryTrackerPage;

// SSG
export async function getStaticProps({ params, locale = 'en' }) {
  let items = [];
  try {
    const itemsRaw = await pantryCollection();
    items = itemsRaw.map(item => ({
      ...item,
      dateCreated: item.dateCreated ? item.dateCreated.toString() : null,
      dateUpdated: item.dateUpdated ? item.dateUpdated.toString() : null,
    }));
  } catch (error) {
    console.error("Error fetching pantry items:", error);
  }

  return {
    props: {
      items,
    },
    revalidate: 10 * 60, // Refresh page every 10 minutes
  };
}
