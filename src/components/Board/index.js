import React, { useState, useCallback } from 'react';
import { Container } from './styles';
import produce from 'immer';
import List from '../List';
import { loadLists } from '../../services/api';
import BoardContext from './context';

const data = loadLists();

const Board = () => {
  const [lists, setLists] = useState(data);

  const move = useCallback((fromListIndex, toListIndex, from, to) => {
    setLists(produce(lists, draft => {
      const dragged = draft[fromListIndex].cards[from];

      draft[fromListIndex].cards.splice(from, 1);
      draft[toListIndex].cards.splice(to, 0, dragged);
    }))
  }, [lists]);

  return (
    <BoardContext.Provider value={{ move }}>
      <Container>
        {lists.map((list, index) => 
          <List 
            key={list.title} 
            data={list} 
            index={index} 
          />
        )}
      </Container>
    </BoardContext.Provider>
  );
}

export default Board;