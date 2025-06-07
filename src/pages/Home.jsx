
import { useSelector } from 'react-redux'
import BookCard from '../components/BookCard';
import { Col, Container, Row } from 'react-bootstrap';

export default function Home() {

    const { bookList } = useSelector((state) => state.book);

    return (
        <Container>
            <h1 className="my-3">Your Books</h1>
            <Row>
                <CardGroup books={bookList} />
            </Row>
        </Container>
    );
}

function CardGroup({ books }) {
    return books.map((book) => {
        return (
            <Col key={book.id} md={4}>
                <BookCard book={book} />
            </Col>
        )
    })
}