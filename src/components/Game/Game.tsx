import "./Game.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";


import Variants from "../Variants/Variants";
import Pagination from "../Pagination/Pagination";

import { useAppStore } from "../../store/appStore";
import appRoutes from "../../routes/routes";
import { saveQuiz } from "../../api/quiz";

const API_ORIGIN = "https://movie.brandservicebot24.ru";

const getBackgroundImageUrl = (image?: string | null) => {
  if (!image) return "";

  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
};

function Game() {
  const navigate = useNavigate(); 

  const user = useAppStore((state) => state.user); 
  const questions = useAppStore((state) => state.questions);
  const selectedAnswersByQuestion = useAppStore(
    (state) => state.selectedAnswersByQuestion,
  );
  const setAnswer = useAppStore((state) => state.setAnswer);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSavingQuiz, setIsSavingQuiz] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  useEffect(() => {
    if (!questions.length) {
      navigate(appRoutes.MENU, { replace: true });
    }
  }, [questions.length, navigate]);

  if (!currentQuestion) {
    return null;
  }

  const backgroundImageUrl = getBackgroundImageUrl(currentQuestion.image);

    const gameStyle = {
    "--game-bg": backgroundImageUrl
      ? `url("${backgroundImageUrl}")`
      : "none",
  } as CSSProperties;

  const handleAnswerClick = async (answerId: number) => {
    if (isSavingQuiz) return;

    setAnswer(currentQuestion.id, answerId);

    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    if (!isLastQuestion) {
      setCurrentQuestionIndex((prev) => prev + 1);
      return;
    }

    if (!user?.user_id) {
      console.error("user_id not found");
      return;
    }

    const nextAnswersByQuestion = {
      ...selectedAnswersByQuestion,
      [currentQuestion.id]: answerId,
    };

    const answers = questions
      .map((question) => nextAnswersByQuestion[question.id])
      .filter((id): id is number => typeof id === "number");

    if (answers.length !== questions.length) {
      console.error("Not all questions answered", {
        answers,
        questionsCount: questions.length,
      });
      return;
    }

    setIsSavingQuiz(true);

    try {
      await saveQuiz({
        user_id: user.user_id,
        answers,
      });

      navigate(appRoutes.FINAL);
    } catch (error) {
      console.error("Error saving quiz:", error);
    } finally {
      setIsSavingQuiz(false);
    }
  };

  return (
    <div className="game" style={gameStyle}>
      <Pagination current={currentQuestionIndex} total={totalQuestions} />

      <Variants
        question={currentQuestion}
        selectedAnswerId={selectedAnswersByQuestion[currentQuestion.id]}
        onAnswerClick={handleAnswerClick}
        disabled={isSavingQuiz}
      />
    </div>
  );
}

export default Game;