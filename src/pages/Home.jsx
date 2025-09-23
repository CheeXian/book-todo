
import { useSelector } from 'react-redux'
import BookCard from '../components/BookCard';
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

export default function Home() {

    const { bookList } = useSelector((state) => state.book);

    return (
        <Container>
            <h1 className="my-3">All Books</h1>
            <Tabs defaultActiveKey="all" className="mb-3" >
                <Tab eventKey="all" title="All">
                    <Row>
                        <CardGroup books={bookList} />
                    </Row>
                </Tab>
                <Tab eventKey="completed" title="Completed">
                    <Row>
                        <CardGroup books={bookList.filter((book) => book.completed)} />
                    </Row>
                </Tab>
                <Tab eventKey="notCompleted" title="Not Completed">
                    <Row>
                        <CardGroup books={bookList.filter((book) => !book.completed)} />
                    </Row>
                </Tab>
            </Tabs>

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