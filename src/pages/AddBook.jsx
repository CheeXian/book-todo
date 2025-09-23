import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToList } from "../features/task/bookSlice";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function AddBook() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);

    function addBook(event) {
        event.preventDefault();
        const newBook = {
            id: Date.now(),
            title,
            description,
            completed,
            timeSpent: 0
        };
        dispatch(addToList(newBook));
        navigate("/");
    }

    return (
        <Container>
            <h1 className="my-3">Add Book</h1>
            <Form onSubmit={addBook}>
                <Form.Group className="mb-3" controlId="itle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Enter book title"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        as="textarea"
                        rows={3}
                        placeholder="Enter book description"
                        required
                    />
                </Form.Group>
                <Form.Check
                    type="checkbox"
                    id="completed"
                    label="Mark as completed"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                    className="mb-3"
                />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}