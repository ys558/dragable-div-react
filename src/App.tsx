import React, { useRef } from 'react';

const useDraggable = () => {
  const draggableElement = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (draggableElement.current) {
      draggableElement.current.style.position = 'absolute';
      let posX = event.clientX - draggableElement.current.offsetLeft;
      let posY = event.clientY - draggableElement.current.offsetTop;

      const handleMouseMove = (event: MouseEvent) => {
        event.preventDefault();
        if (draggableElement.current) {
          draggableElement.current.style.left = event.clientX - posX + 'px';
          draggableElement.current.style.top = event.clientY - posY + 'px';
        }
      };

      const handleMouseUp = (event: MouseEvent) => {
        event.preventDefault();
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  return {
    ref: draggableElement,
    onMouseDown: handleMouseDown,
  };
};

const DraggableBox: React.FC = () => {
  const { ref, onMouseDown } = useDraggable();

  return (
    <div ref={ref} onMouseDown={onMouseDown} 
          style={{ width: '100px', height: '100px', backgroundColor: 'blue', color: 'white', textAlign: 'center', lineHeight: '100px', cursor: 'move' }}
    >
      Drag me!
    </div>
  );
};

export default DraggableBox;