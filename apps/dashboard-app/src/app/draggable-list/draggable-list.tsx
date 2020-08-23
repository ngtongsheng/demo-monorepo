import React, { useState, useCallback, useEffect } from 'react';
import { move } from 'ramda';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { PeopleService } from '@demo-monorepo/service-people';
import { User } from '@demo-monorepo/api-interfaces';
import { Card, Columns, Column, Thumb } from '@demo-monorepo/ui';
import './draggable-list.scss';

export const DraggableList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getPeoples = useCallback(async () => {
    const res = await PeopleService.getPeoples();
    setUsers(res);
  }, []);

  useEffect(() => {
    getPeoples();
  }, [getPeoples]);

  const handleDragEnd = useCallback(
    ({ destination, source }) => {
      if (!destination) {
        return;
      }

      setUsers(move(source.index, destination.index, users));
    },
    [users]
  );

  return (
    <div className="draggable-list">
      <div className="title is-4">Draggable list</div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {({ droppableProps, innerRef, placeholder }) => (
            <div {...droppableProps} ref={innerRef}>
              {users.map(({ name, location, thumb }, index) => (
                <Draggable key={name} draggableId={name} index={index}>
                  {({ draggableProps, dragHandleProps, innerRef }) => (
                    <div
                      ref={innerRef}
                      {...draggableProps}
                      {...dragHandleProps}
                    >
                      <Card>
                        <Columns isVcentered>
                          <Column isNarrow>
                            <Thumb src={thumb} alt={name} />
                          </Column>
                          <Column>
                            <div className="title is-6">{name}</div>
                            <div className="subtitle is-6">{location}</div>
                          </Column>
                        </Columns>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default DraggableList;
