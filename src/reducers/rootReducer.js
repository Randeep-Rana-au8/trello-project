const { v4 } = require("uuid");
const { ADD_TODO, SET_TEXT, TODO_POSITION } = require("../actions/actions");

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

const initialState = {
  text: "yup I am working",
  main: {
    todo: {
      title: "Todo",
      items: [item1, item2],
    },
    "in-progress": {
      title: "In-Progress",
      items: [item3],
    },
    done: {
      title: "Completed",
      items: [],
    },
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      console.log(action.data);
      return {
        ...state,
        main: {
          ...state.main,
          todo: {
            ...state.main.todo,
            items: [{ id: v4(), name: action.data }, ...state.main.todo.items],
          },
        },
      };
    case SET_TEXT:
      console.log(action.data);
      return {
        ...state,
        text: action.data,
      };

    case TODO_POSITION:
      console.log(action.data);
      return {
        ...state,
        main: action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
