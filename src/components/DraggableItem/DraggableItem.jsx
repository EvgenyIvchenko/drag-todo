import { useRef } from 'react';
import Draggable from 'react-draggable';
import './DraggableItem.css';

const DraggableItem = ({ onDelete, item }) => {
  const nodeRef = useRef(null);

  return (
    <Draggable nodeRef={nodeRef} defaultPosition={item.defaultPos}>
      <div
        ref={nodeRef}
        className="todo__item"
        style={{ background: item.color }}
      >
        {item.item}
        <button onClick={() => onDelete(item.id)} className="delete">
          ✖️
        </button>
      </div>
    </Draggable>
  );
};

export default DraggableItem;
