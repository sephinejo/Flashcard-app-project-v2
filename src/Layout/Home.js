import React from 'react';
import Decks from './Deck/Decks';
import { Link } from 'react-router-dom';

export default function Home({ decks, deleteDeckHandler }) {
  return (
    <div>
      {/* Button to create new deck */}
      <Link to='/decks/new'>
        <button variant='secondary' style={{ marginBottom: '0.5rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            <span className="oi oi-plus" />
            Create Deck
          </span>
        </button>
      </Link>
      {/* Mapping through decks */}
      <Decks decks={decks} deleteDeckHandler={deleteDeckHandler} />
    </div>
  );
}
