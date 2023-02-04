import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../../utils/api';

export default function Deck({ deleteDeckHandler }) {
  // Store new deck data with useState
  const [formData, setFormData] = useState({ name: '', description: '' });
  const history = useHistory();

  // Handle entered deck data
  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  // Handle submitted deck data and create new deck with it
  const submitHandler = (e) => {
    e.preventDefault();

    async function deckCreate() {
      try {
        await createDeck(formData);
        setFormData({ name: '', description: '' });
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    }
    deckCreate();
    history.push('/');
    window.location.reload();
  };

  return (
    <div>
      <nav aria-label='breadcrumb'>
        <ol className='breadcrumb'>
          <li className='breadcrumb-item'>
            <Link to='/'>
              <span className='oi oi-home' /> Home
            </Link>
          </li>
          <li className='breadcrumb-item active' aria-current='page'>
            Create Deck
          </li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={submitHandler} className='card-form'>
        <fieldset>
          <div className='form-group'>
            <label>Name</label>
            <input
              id='name'
              name='name'
              type='text'
              value={formData.name}
              onChange={changeHandler}
              placeholder='Deck Name'
              required={true}
            />
          </div>
          <div className='form-group'>
            <label>Description</label>
            <textarea
              id='description'
              name='description'
              style={{ height: '7rem' }}
              value={formData.description}
              onChange={changeHandler}
              placeholder='Brief description of the deck'
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
    </div>
  );
}
