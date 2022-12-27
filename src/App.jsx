import { useState } from 'react';
import './App.css';

// # React Interview Challenge.

// Desenvolva uma aplicação em que:

// - o usuário pode clicar em qualquer lugar da página. [DONE]
// - deve-se renderizar um pequeno círculo na posição clicada . [DONE]
// - a cada clique, mantém-se os círculos já criados e renderiza-se um novo. [DONE]
// - crie duas funcionalidades para a aplicação: [DONE]
//     - desfazer 
//     - refazer 



function App() {
  const [listPosition, setListPosition] = useState([])
  const [removedCoordinates, setRemovedCoordinates] = useState([])

  const click = (event) => {
    const position = { clientX: event.clientX, clientY: event.clientY }
    setListPosition((data) => [...data, position])
  }
  const back = (event) => {
    event.stopPropagation()

    if (listPosition.length == 0) {
      return
    }

    setRemovedCoordinates((data) => {
      const index = listPosition.length - 1
      const array = [...data, listPosition[index]]
      return array
    })
    setListPosition((data) => {
      const array = [...data]
      array.pop()
      return array
    })
  }
  const proceed = (event) => {
    event.stopPropagation()

    if (removedCoordinates.length == 0) {
      return
    }

    setListPosition((data) => {
      const index = removedCoordinates.length - 1
      const lastPosition = removedCoordinates[index]
      const array = [...data, lastPosition]
      return array
    })

    setRemovedCoordinates((data) => {
      const array = [...data]
      array.pop()
      return array
    })

  }
  console.log('listPosition', listPosition)
  console.log('removedCoordinates', removedCoordinates)
  return (
    <div onClick={click} className='back'>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={back}>Desfazer</button>
        <button onClick={proceed}>Refazer</button>
      </div>
      {listPosition.map((data) => (
        <span className='circle' style={{ top: data.clientY, left: data.clientX }} />
      ))}
    </div>
  );
}

export default App;
