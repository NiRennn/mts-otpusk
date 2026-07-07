import "./Variants.scss";

import an1 from "../../assets/icons/an1.png";
import an2 from "../../assets/icons/an2.png";
import an3 from "../../assets/icons/an3.png";

type VariantsProps = {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
};

function Variants({
  // currentQuestionIndex,
  // setCurrentQuestionIndex,
}: VariantsProps) {
  // const handleAnswerClick = () => {
  //   setCurrentQuestionIndex((prev) => prev + 1);
  // };
  return (
    <div className="variants__container">
      <div className="variants">
        <h1 className="variants__question">
          Ты приехал в европейский город и хочешь провести свидание на мопеде.
          Как поступишь?
        </h1>
        <div className="variants__answers">
          <div className="variants__answer">
            <img src={an1} alt="" className="variants__answer_img" />
            <span className="variants__answer_text">
              Прокачусь на полной скорости по серпантину
            </span>
          </div>
          <div className="variants__answer">
            <img src={an2} alt="" className="variants__answer_img" />
            <span className="variants__answer_text">
              По картам, найду тихий берег без туристов
            </span>
          </div>
          <div className="variants__answer">
            <img src={an3} alt="" className="variants__answer_img" />
            <span className="variants__answer_text">
              Выясню где спрятан лучший маршрут для двоих
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Variants;
