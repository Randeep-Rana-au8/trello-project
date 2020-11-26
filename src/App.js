import React from "react";
import "./App.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 } from "uuid";
import { connect } from "react-redux";
import { add_todo, set_text, todo_position } from "./actions/actions";

const item1 = {
  id: v4(),
  name: "Clean the house",
};
const item2 = {
  id: v4(),
  name: "Clean the house",
};
const item3 = {
  id: v4(),
  name: "Clean work",
};

function App(props) {
  const handleDragEnd = ({ destination, source }) => {
    console.log("from", source);
    console.log("to", destination);

    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }
    console.log(props.main);
    const prev = props.main;
    const itemCopy = { ...props.main[source.droppableId].items[source.index] };

    const prevFunc = () => {
      const prev = { ...props.main };
      prev[source.droppableId].items.splice(source.index, 1);

      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );
      return prev;
    };

    props.todo_position(prevFunc());
  };

  const addItem = (e) => {
    e.preventDefault();
    props.add_todo(props.text);
    props.set_text("");
    console.log(props);
  };

  return (
    <div className="App">
      <form>
        <input
          type="text"
          placeholder="Enter new todo"
          value={props.text}
          onChange={(e) => props.set_text(e.target.value)}
        />
        <button type="submit" onClick={addItem}>
          Add
        </button>
      </form>
      <div className="boards-container">
        <DragDropContext onDragEnd={handleDragEnd}>
          {_.map(props.main, (data, key) => {
            return (
              <div key={key} className={`column`}>
                <h3>{data.title}</h3>
                <Droppable droppableId={key}>
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`droppable-col ${data.title}`}
                      >
                        {data.items.map((el, index) => {
                          console.log(data);
                          return (
                            <Draggable
                              key={el.id}
                              index={index}
                              draggableId={el.id}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    className={`item ${
                                      snapshot.isDragging && "dragging"
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {el.name}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { add_todo, set_text, todo_position })(
  App
);
