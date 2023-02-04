import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { readDeck } from '../../utils/api';
import StudyCard from '../Card/StudyCard';

export default function StudyDeck() {
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
    <main className='container study-page'>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <span className='oi oi-home' /> Home
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Study
          </li>
        </ol>
      </nav>
      <div>
        <h1>Study: {deck.name}</h1>
        <StudyCard cards={deck.cards} />
      </div>
    </main>
  );
}
