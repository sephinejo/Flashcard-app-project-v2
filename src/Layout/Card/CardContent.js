import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function CardContent({ card, deleteCardHandler }) {
  const { deckId } = useParams();

  return (
    // Card content format
    <div className='card'>
      <div className='card-body'>
        <div className='container' style={{ margin: '0 0 2rem' }}>
          <div className='row'>
            <div className='col'>{card.front}</div>
            <div className='col'>{card.back}</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <span style={{ display: 'flex' }}>
            {/* Button to edit a card */}
            <Link to={`/decks/${deckId}/cards/${card.id}/edit`}>
              <button variant='secondary' style={{ marginRight: '0.5rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  <span className="oi oi-pencil" />
                  Edit
                </span>
              </button>
            </Link>
            {/* Button to delete a card */}
            <button onClick={() => deleteCardHandler(card.id)} variant='danger'>
              <span className="oi oi-trash" />
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
