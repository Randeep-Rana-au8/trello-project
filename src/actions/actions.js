export const ADD_TODO = "ADD_TODO";
export const SET_TEXT = "SET_TEXT";
export const TODO_POSITION = "TODO_POSITION";

export const add_todo = (data) => {
  console.log("yes data coming in action");
  console.log(data);
  return {
    type: ADD_TODO,
    data,
  };
};

export const todo_position = (data) => {
  return {
    type: TODO_POSITION,
    data,
  };
};

export const set_text = (data) => {
  return {
    type: SET_TEXT,
    data,
  };
};
