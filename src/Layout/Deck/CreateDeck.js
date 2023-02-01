import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import Breadcrumbs from '../Common/Breadcrumbs';

export default function Deck({ deleteDeckHandler }) {
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <h3>{deck.name}</h3>
      <p>{deck.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ display: 'inline-flex' }}>
          <div>
            <Link to={`/decks/${deckId}/edit`}>
              <button variant='secondary' style={{ marginRight: '0.5rem' }}>
                  <span className="oi oi-pencil" />
                  Edit
              </button>
            </Link>
          </div>
          <div>
            <Link to={`/decks/${deck.id}/study`}>
              <button variant='primary' style={{ marginRight: '0.5rem' }}>
                  <span className="oi oi-book" />
                  Study
              </button>
            </Link>
          </div>
          <div>
            <Link to={`/decks/${deckId}/cards/new`}>
              <button variant='primary' style={{ marginBottom: '0.5rem' }}>
                  <span className="oi oi-plus" />
                  Add Card
              </button>
            </Link>
          </div>
        </span>
        <div>
          <button onClick={() => deleteDeckHandler(deckId)} variant='danger'>
            <span className="oi oi-trash" />
          </button>
        </div>
      </div>
      <Cards deck={deck} />
    </div>
  );
}
