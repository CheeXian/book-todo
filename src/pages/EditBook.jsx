import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateBook } from '../features/task/bookSlice';
import { Form, Container, Button } from 'react-bootstrap';

export default function EditBook() {
    // useParams() returns an object with key-value pairs for each route parameter.
    // const params = useParams(); // params = { id: "123" }
    // const { id } = params;      // id = "123"

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const book = useSelector((state) => state.book.bookList.find((book) => book.id === parseInt(id)));

    const [title, setTitle] = useState(book ? book.title : '');
    const [description, setDescription] = useState(book ? book.description : '');
    const [completed, setCompleted] = useState(book ? book.completed : false);
    const [totalPages, setTotalPages] = useState(book ? book.totalPages : '');
    const [currentPage, setCurrentPage] = useState(book ? book.currentPage : '');

    function editBook(event) {
        event.preventDefault();

        const updatedBook = {
            ...book,
            id: parseInt(id),
            title,
            description,
            completed,
            totalPages: parseInt(totalPages, 10),
            currentPage: parseInt(currentPage, 10),
        }
        dispatch(updateBook(updatedBook));
        navigate("/");
    }

    return (
        <Container>
            <h1 className="my-3">Edit Book</h1>
            <Form onSubmit={editBook}>
                <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
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
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="totalPages">
                    <Form.Label>Total Pages</Form.Label>
                    <Form.Control
                        value={totalPages}
                        onChange={(e) => setTotalPages(e.target.value)}
                        type="number"
                        min={1}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="currentPages">
                    <Form.Label>Current Page</Form.Label>
                    <Form.Control
                        value={currentPage}
                        onChange={(e) => setCurrentPage(e.target.value)}
                        type="number"
                        min={0}
                        max={totalPages || undefined}
                        required
                    />
                </Form.Group>
                <Form.Check
                    type="checkbox"
                    id="completed"
                    label="Mark as completed"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                />
                <Button variant="primary" type="submit">Save Changes</Button>
            </Form>
        </Container>
    )
}
