import { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';


export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null)


    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "cheexianyau@gmail.com" && password === "12345") {
            dispatch(login({ username, password }));
            navigate("/");
        } else {
            setError("Invalid username or password");
        }
    }

    return (
        <Container>
            <h1 className="my-3">Login</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder='Enter username'
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="passowrd"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                    />
                </Form.Group>
                {error && <p className="text-danger mb-3" >{error}</p>}
                <Button varaint="primary" type="submit">
                    Login
                </Button>

            </Form>
        </Container>
    )
}
