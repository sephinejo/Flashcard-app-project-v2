import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck, updateDeck } from '../../utils/api';

export default function EditDeck() {
  const [deck, setDeck] = useState({ name: '', description: '' });
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId]);

  const changeHandler = ({ target }) => {
    setDeck({ ...deck, [target.name]: target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    async function updateDeckData() {
      await updateDeck(deck);
      history.push(`/decks/${deckId}`);
    }
    updateDeckData();
  };

  return (
    <>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <span className='oi oi-home' /> Home
            </Link>
          </li>
          <li className='breadcrumb-item'>
            <Link to={`/decks/${deckId}`}>Deck {deck.name}</Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1 style={{ marginBottom: '1rem' }}>Edit Deck</h1>
      <form onSubmit={submitHandler} className='card-form'>
        <fieldset>
          <div className='form-group'>
            <label>Name</label>
            <input
              id='name'
              name='name'
              type='text'
              value={deck.name}
              onChange={changeHandler}
              placeholder={deck.name}
              required={true}
            />
          </div>
          <div className='form-group'>
            <label>Description</label>
            <textarea
              id='description'
              name='description'
              style={{ height: '7rem' }}
              value={deck.description}
              onChange={changeHandler}
              placeholder={deck.description}
              required
            />
          </div>

          <button
            className='btn btn-secondary mr-2'
            onClick={() => history.push('/')}
            tabIndex='4'
          >
            Cancel
          </button>
          <button type='submit' className='btn btn-primary' tabIndex='3'>
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
}
