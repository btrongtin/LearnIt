import { TodoContext } from "../../contexts/TodoContext";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import ListGroup from "react-bootstrap/ListGroup";

const ListTodo = ({ postId }) => {
  //Contexts
  const {
    todoState: { todo, todos, todosLoading },
    getTodos,
    deleteTodo,
    updateTodo,
    findTodo,
  } = useContext(TodoContext);

  //Start get all todo
  useEffect(() => getTodos(postId), []);

  let body = null;

  if (todosLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else {
    body = (
      <>
        <ListGroup as="ul">
          {todos.map((todo) => (
            <ListGroup.Item
              action
              variant={todo.isCompleted ? "success" : "warning"}
              as="li"
              key={todo._id}
              onClick={updateTodo.bind(this, todo._id, postId)}
            >
              <span className={todo.isCompleted ? "completed-item" : ""}>
                {todo.title}
              </span>
              <Button
                variant="danger"
                onClick={deleteTodo.bind(this, todo._id, postId)}
              >
                Delete
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );
  }

  return <>{body}</>;
};

export default ListTodo;
