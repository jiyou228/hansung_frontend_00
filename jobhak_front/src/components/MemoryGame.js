import React, { useState, useEffect, useRef } from "react";

import sad from "../assets/취뽀언짢.png";
import laugh from "../assets/취뽀웃음.png";
import wink from "../assets/취뽀윙크.png";
import smile from "../assets/취뽀활짝.png";
import heart from "../assets/취뽀하트.png";
import star from "../assets/취뽀별.png";
import "./MemoryGame.css";
const cards = [
  sad,
  laugh,
  wink,
  smile,
  heart,
  star,
  sad,
  laugh,
  wink,
  smile,
  heart,
  star,
];

function MemoryGame({ onComplete }) {
  const [cardStatus, setCardStatus] = useState(Array(12).fill(false));
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [start, setStart] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);

  const timerRef = useRef(null);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstCard, secondCard] = selectedCards;
      if (cards[firstCard] !== cards[secondCard]) {
        setTimeout(() => {
          setCardStatus((prevState) => {
            const nextState = [...prevState];
            nextState[firstCard] = false;
            nextState[secondCard] = false;
            return nextState;
          });
          setSelectedCards([]);
        }, 1000);
      } else {
        setScore((prevScore) => prevScore + 100);
        setSelectedCards([]);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    // 게임이 성공적으로 완료되었을 때 실행되는 함수
    const handleGameCompletion = () => {
      if (score > 600) {
        alert(`성공! 점수: ${score} 남은 시간: ${remainingTime}`);
      } else {
        alert(`실패! 점수: ${score}`);
      }
      onComplete(score > 600); // 완료됨을 부모 컴포넌트로 전달
    };

    if (start) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 1) {
            clearInterval(timerRef.current);
            handleGameCompletion();
            window.location.reload(); // 게임 재시작을 위해 페이지 다시 로드
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [start, score, onComplete]);

  const cardClick = (index) => {
    if (!start) setStart(true);
    if (selectedCards.length === 2 || cardStatus[index]) return;

    setCardStatus((prevState) => {
      const nextState = [...prevState];
      nextState[index] = true;
      return nextState;
    });
    setSelectedCards((prevState) => [...prevState, index]);
  };

  return (
    <div className="game_app">
      <h1>점수: +{score}</h1>
      <h2>남은 시간: {remainingTime}초</h2>
      <div className="game_container">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`game_card ${cardStatus[index] ? "flipped" : ""}`}
            onClick={() => cardClick(index)}
          >
            {cardStatus[index] && (
              <img
                src={card}
                alt="Card"
                style={{ width: "100%", height: "100%", borderRadius: "5px" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MemoryGame;
