import React, { useState, useEffect } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../../utils/api';

export default function EditCard() {
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const { deckId, cardId } = useParams();
  const history = useHistory();

  // Read corresponding deck and card
  useEffect(() => {
    const loadDeck = async () => setDeck(await readDeck(deckId));
    loadDeck();
    const loadCard = async () => setCard(await readCard(cardId));
    loadCard();
  }, [deckId, cardId]);

  // Handle entered card data
  const changeHandler = ({ target }) => {
    setCard({ ...card, [target.name]: target.value });
  };

  // Handle submitted card data and update with it
  const submitHandler = (e) => {
    e.preventDefault();
    async function updateCardData() {
      await updateCard(card);
      history.push(`/decks/${deckId}`);
    }
    updateCardData();
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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      {/* Form to edit card */}
      <form onSubmit={submitHandler} className='card-form'>
        <fieldset>
          <legend>{deck.name}: Add Card</legend>

          <div className='form-group'>
            <label htmlFor='front'>Front</label>
            <textarea
              id='front'
              name='front'
              tabIndex='1'
              className='form-control'
              required={true}
              placeholder='Front side of card'
              value={card.front}
              onChange={changeHandler}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='back'>Back</label>
            <textarea
              id='back'
              name='back'
              tabIndex='2'
              className='form-control'
              required={true}
              placeholder='Back side of card'
              value={card.back}
              onChange={changeHandler}
            />
          </div>

          <button
            className='btn btn-secondary mr-2'
            onClick={() => history.push(`/decks/${deckId}`)}
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
