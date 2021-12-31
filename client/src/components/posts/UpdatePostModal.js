import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useContext, useState, useEffect, useRef } from "react";
import { PostContext } from "../../contexts/PostContext";
import ListTodo from "../../components/todo/ListTodo";
import { TodoContext } from "../../contexts/TodoContext";

const UpdatePostModal = () => {
  // Contexts
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  const {
    addTodo,
    todoState: { todo },
  } = useContext(TodoContext);

  // State
  const [updatedPost, setUpdatedPost] = useState(post);
  const [newTodo, setNewTodo] = useState({
    todo,
  });

  useEffect(() => setUpdatedPost(post), [post]); //khi người dùng chọn post khác => setupdated post

  const { title, description, url, status } = updatedPost;

  const onChangeUpdatedPostForm = (event) =>
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });
  const onChangeNewTodoForm = (event) =>
    setNewTodo({ ...newTodo, title: event.target.value }); //computed property

  const closeDialog = () => {
    setUpdatedPost(post);
    setNewTodo({ ...newTodo, title: "" });
    setShowUpdatePostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const inputRef = useRef();
  const handleAddNewTodo = async (event) => {
    event.preventDefault();
    const { success, message } = await addTodo(newTodo, post._id);
    //làm thêm gì ở đây nè
    setNewTodo({ ...newTodo, title: "" });
    inputRef.current.focus();
  };

  // const resetAddPostData = () => {
  // 	setNewPost({ title: '', description: '', url: '', status: 'TO LEARN' })
  // 	setShowAddPostModal(false)
  // }

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube Tutorial URL"
              name="url"
              value={url}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatedPostForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <InputGroup className="mb-3">
              <Form.Control
                ref={inputRef}
                type="text"
                placeholder="Add new todo"
                name="todo-title"
                aria-describedby="todo-title-help"
                value={newTodo.title}
                onChange={onChangeNewTodoForm}
              />
              <Button variant="primary" onClick={handleAddNewTodo}>
                Add
              </Button>
            </InputGroup>
          </Form.Group>
          <ListTodo postId={post._id} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            LearnIt!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
