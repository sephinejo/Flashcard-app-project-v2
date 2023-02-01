import React from 'react';
import { Link } from 'react-router-dom';

export default function DeckPreview({ deck, deleteDeckHandler }) {
  return (
    <div className='card'>
      <div className='card-body'>
        <div className='container'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h3>{deck.name}</h3>
            <h6>{deck.cards?.length} cards</h6>
          </div>
          <p>{deck.description}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ display: 'inline-flex' }}>
              <div>
                {/* Button to view deck */}
                <Link to={`/decks/${deck.id}`}>
                  <button variant='secondary' style={{ marginRight: '0.5rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      <span className="oi oi-eye" />
                      View
                    </span>
                  </button>
                </Link>
              </div>
              <div>
                {/* Button to study deck */}
                <Link to={`/decks/${deck.id}/study`}>
                  <button variant='primary' style={{ marginRight: '0.5rem' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                      }}
                    >
                      <span className="oi oi-book" />
                      Study
                    </span>
                  </button>
                </Link>
              </div>
            </span>
            <div>
              {/* Button to delete deck */}
              <button
                onClick={() => deleteDeckHandler(deck.id)}
                variant='danger'
              >
                <span className="oi oi-trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
