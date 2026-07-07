import "./Variants.scss";

import an1 from "../../assets/icons/an1.png";
import an2 from "../../assets/icons/an2.png";
import an3 from "../../assets/icons/an3.png";

import type { QuestionDto } from "../../store/appStore";

type VariantsProps = {
  question: QuestionDto;
  selectedAnswerId?: number;
  onAnswerClick: (answerId: number) => void;
  disabled?: boolean;
};

const fallbackAnswerImages = [an1, an2, an3];

function Variants({
  question,
  selectedAnswerId,
  onAnswerClick,
  disabled = false,
}: VariantsProps) {
  return (
    <div className="variants__container">
      <div className="variants">
        <h1 className="variants__question">{question.text}</h1>

        <div className="variants__answers">
          {question.answers.map((answer, index) => {
            const imageSrc =
              answer.logo ??
              fallbackAnswerImages[index % fallbackAnswerImages.length];

            const isSelected = selectedAnswerId === answer.id;

            return (
              <button
                key={answer.id}
                type="button"
                className={`variants__answer ${
                  isSelected ? "variants__answer--selected" : ""
                }`}
                onClick={() => onAnswerClick(answer.id)}
                disabled={disabled}
              >
                <img src={imageSrc} alt="" className="variants__answer_img" />

                <span className="variants__answer_text">{answer.text}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Variants;