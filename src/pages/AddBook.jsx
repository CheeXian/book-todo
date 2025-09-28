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
    const [totalPages, setTotalPages] = useState("");

    function addBook(event) {
        event.preventDefault();
        const newBook = {
            id: Date.now(),
            title,
            description,
            completed,
            timeSpent: 0,
            totalPages: parseInt(totalPages, 10),
        };
        dispatch(addToList(newBook));
        navigate("/");
    }

    return (
        <Container>
            <h1 className="my-3">Add Book</h1>
            <Form onSubmit={addBook}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Enter book title"
                        required
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
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="totalPages">
                    <Form.Label>Total Pages</Form.Label>
                    <Form.Control
                        value={totalPages}
                        onChange={(e) => setTotalPages(e.target.value)}
                        type="number"
                        placeholder="Enter total number of pages"
                        min={1}
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