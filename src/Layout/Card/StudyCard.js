import React, { useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';

export default function StudyCard({ cards }) {
  const { deckId } = useParams();
  const history = useHistory();

  const initialState = {
    onBack: false,
    currentCard: 0,
  };

  const [studySession, setStudySession] = useState({ ...initialState });

  // Handle to flip card
  const flipHandler = () => {
    if (studySession.onBack) {
      setStudySession({
        ...studySession,
        onBack: false,
      });
    } else {
      setStudySession({
        ...studySession,
        onBack: true,
      });
    }
  };

  // Handle to go next card and end studying
  const nextHandler = () => {
    if (studySession.currentCard < cards?.length - 1) {
      setStudySession({
        ...studySession,
        currentCard: studySession.currentCard + 1,
        onBack: false,
      });
    } else {
      const confirm = window.confirm(
        'Restart cards? Click cancel to return to the home page.'
      );
      if (confirm) {
        setStudySession(initialState);
      } else {
        history.push('/');
      }
    }
  };

  if (cards?.length > 2) {
    return (
      <>
        <div className='card'>
          <div className='card-body'>
            <h4>
              Card {studySession.currentCard + 1} of {cards.length}
            </h4>
            <p>
              {studySession.onBack
                ? cards[studySession.currentCard].back
                : cards[studySession.currentCard].front}
            </p>
            {/* Button to flip */}
            <button variant='secondary' onClick={flipHandler}>
              Flip
            </button>
            {/* Button to go next */}
            {studySession.onBack && (
              <button
                variant='primary'
                onClick={nextHandler}
                style={{ marginLeft: '0.5rem' }}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>Not enough cards.</h2>
        <p>
          You need at least 3 cards to study. There are {cards?.length} cards in
          this deck.
        </p>
        <div>
          <Link to={`/decks/${deckId}/cards/new`}>
            <button variant='primary' style={{ marginBottom: '0.5rem' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                <span className="oi oi-plus" />
                Add Card
              </span>
            </button>
          </Link>
        </div>
      </>
    );
  }
}
