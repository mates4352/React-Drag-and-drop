import React, { useState } from 'react';
import './App.css';

function App() {
  const [cardList, setCardList] = useState([
    {id: 0, order: 1, text: 'карточка1'},
    {id: 1, order: 2, text: 'карточка2'},
    {id: 2, order: 3, text: 'карточка3'},
    {id: 3, order: 4, text: 'карточка4'},
  ])

  const [currentCard, setCurrentCard] = useState<any>(null);

  const dragStartHandler = (e: any, card: any) => {
    console.log('drag',card)
    setCurrentCard(card)
  }

  const dragEndHandler = (e: any) => {
    e.target.style.background = "transparent"
  }

  const dragOverHandler = (e: any) => {
    e.preventDefault()
    e.target.style.background = "lightgray"
  }

  const dragDropHandler = (e: any, card: any) => {
    e.preventDefault()
    setCardList(cardList.map(c => {
      if(c.id === card.id) {
        return {...c, order: currentCard.order}
      }
      if(c.id === currentCard.id) {
        return {...c, order: card.order}
      }
      return c
    }))
    e.target.style.background = "transparent"
  }

  const sortCards = (a:any, b:any) => a.order - b.order

  return (
    <div className="App">
      {cardList.sort(sortCards).map(card => 
          <div 
            className={'card'}
            draggable={true}
            onDragStart={e => dragStartHandler(e, card)}
            onDragLeave={e => dragEndHandler(e)}
            onDragEnd={e => dragEndHandler(e)}
            onDragOver={e => dragOverHandler(e)}
            onDrop={e => dragDropHandler(e, card)}>
            {card.text}
          </div>
      )}
      </div>
  );
}

export default App;