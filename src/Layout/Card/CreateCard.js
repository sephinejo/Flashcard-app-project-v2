import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../../utils/api';
import Breadcrumbs from '../Common/Breadcrumbs';

export default function CreateCard() {
  const history = useHistory();
  const { deckId } = useParams();

  const initialCardForm = {
    id: 0,
    front: '',
    back: '',
    deckId: deckId,
  };

  // Store new card data with useState
  const [formData, setFormData] = useState({ ...initialCardForm });
  const [deck, setDeck] = useState({});

  // Handle entered card data
  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  // Handle submitted card data
  const submitHandler = (e) => {
    e.preventDefault();

    async function cardCreate() {
      try {
        await createCard(deckId, formData);
        setFormData({ ...initialCardForm });
      } catch (error) {
        if (error.name !== 'AbortError') {
          throw error;
        }
      }
    }
    cardCreate();
    history.push(`/decks/${deckId}`);
  };

  // Read deck corresponding new card
  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(() => loadedDeck);
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
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Card</h1>
      {/* Form to create new card */}
      <form onSubmit={submitHandler} className="card-form">
      <fieldset>
        <legend>{deckName}: Add Card</legend>

        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            name="front"
            tabIndex="1"
            className="form-control"
            required={true}
            placeholder="Front side of card"
            value={formData.front}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            name="back"
            tabIndex="2"
            className="form-control"
            required={true}
            placeholder="Back side of card"
            value={formData.back}
            onChange={changeHandler}
          />
        </div>

        <button
          className="btn btn-secondary mr-2"
          onClick={() => history.push(`/decks/${deckId}`)}
          tabIndex="4"
        >
          Done
        </button>
        <button type="submit" className="btn btn-primary" tabIndex="3">
          Save
        </button>
      </fieldset>
    </form>
<!--       <Form>
        <Form.Group className='mb-3'>
          <Form.Label>Front</Form.Label>
          <Form.Control
            id='front'
            name='front'
            as='textarea'
            value={formData.front}
            onChange={changeHandler}
            placeholder='Front side of card'
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Back</Form.Label>
          <Form.Control
            id='back'
            name='back'
            as='textarea'
            value={formData.back}
            onChange={changeHandler}
            placeholder='Back side of card'
            required
          />
        </Form.Group>
      </Form>
      <div style={{ marginTop: '0.8rem' }}>
        {/* Button to submit */}
        <Button
          variant='secondary'
          style={{ marginRight: '0.5rem' }}
          onClick={() => history.push(`/decks/${deckId}`)}
        >
          Done
        </Button>
        {/* Button to save */}
        <Button variant='primary' type='submit' onClick={submitHandler}>
          Save
        </Button>
      </div> -->
    </div>
  );
}
