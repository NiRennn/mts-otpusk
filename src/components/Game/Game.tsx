import './Game.scss'
import Variants from "../Variants/Variants";
import {
  type AnimationEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAppStore } from "../../store/appStore";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../routes/routes";
import Pagination from '../Pagination/Pagination';

const QUESTIONS_COUNT = 10;


function Game() {
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  return (
    <div className='game'>
      <Pagination current={currentQuestionIndex} total={QUESTIONS_COUNT} />

      <Variants
        currentQuestionIndex={currentQuestionIndex}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
      />
    </div>
  )
}

export default Game