import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeBook, updateBook } from "../features/task/bookSlice";


export default function BookCard({ book }) {
  const { title, description, completed, timeSpent, totalPages, currentPage } = book;
  const border = completed ? "success" : "danger";
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startTimer = () => {
    if (timerInterval === null) {
      const intervalID = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setTimerInterval(intervalID);
    }
  };

  const pauseTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);

  }

  const stopTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);

    let current = null;
    while (
      current === undefined ||
      current === null ||
      isNaN(current) ||
      current <= 0 ||
      current > totalPages
    ) {
      const input = prompt(`What page did you read until ? (1 -${totalPages})`);
      if (input === null) return; //user cancelled
      current = parseInt(input, 10);
      if (
        current === undefined ||
        current === null ||
        isNaN(current) ||
        current <= 0 ||
        current > totalPages
      ) {
        alert(`Invalid input! Please enter a number between 1 and ${totalPages}.`);
      }
    }


    //dispatch updateBook with new timespent and currentPage
    dispatch(updateBook({
      ...book,
      timeSpent: (timeSpent || 0) + timer,
      currentPage: current,
    }))
    setTimer(0);
  };

  const deleteBook = () => {
    dispatch(removeBook(book.id));
  }

  useEffect(() => {
    return () => {
      clearInterval(timerInterval);
    }
  }, [timerInterval])

  function formatTime(totalSeconds) {
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  return (
    <>
      <Card border={border} className="my-3">
        <Card.Header>{!completed && "Not"} Completed </Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <p>Timer: {formatTime(timer)}</p>

          <p>Total Time: {formatTime(book.timeSpent || 0)}</p>

          <p> Pages: {currentPage}/{totalPages}</p>

          <Button size="sm" onClick={startTimer} >
            <i className="bi bi-play"></i>
          </Button>
          <Button size="sm" onClick={pauseTimer} className="ms-2">
            <i className="bi bi-pause-fill"></i>
          </Button>
          <Button size="sm" onClick={stopTimer} className="ms-2" variant="warning">
            <i className="bi bi-stop"></i>
          </Button>
          <Button size="sm" variant="secondary"
            onClick={() => navigate(`/edit/${book.id}`)}
            className="ms-2">
            <i className="bi bi-pencil"></i>
          </Button>
          <Button size='sm' variant="danger"
            onClick={deleteBook}
            className="ms-2">
            <i className="bi bi-trash"></i>
          </Button>

        </Card.Body>
      </Card>
    </>


  )
}
