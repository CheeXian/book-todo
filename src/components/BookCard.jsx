import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeBook } from "../features/task/bookSlice";


export default function BookCard({ book }) {
  const { title, description, completed } = book;
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

  const resetTimer = () => {
    clearInterval(timerInterval);
    setTimerInterval(null);
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
        <Card.Header>{!completed && "Not Completed"} </Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <p>Timer: {formatTime(timer)}</p>
          <Button size="sm" onClick={startTimer} >
            <i className="bi bi-play"></i>
          </Button>
          <Button size="sm" onClick={pauseTimer} className="ms-2">
            <i className="bi bi-pause-fill"></i>
          </Button>
          <Button size="sm" onClick={resetTimer} className="ms-2">
            <i className="bi bi-arrow-clockwise"></i>
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
