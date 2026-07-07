import "./Pagination.scss";

type PaginationProps = {
  current: number;
  total: number;
};

function Pagination({ current, total }: PaginationProps) {
  return (
    <div className="pagination" aria-label={`Вопрос ${current + 1} из ${total}`}>
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`pagination__dot ${
            index === current ? "pagination__dot--active" : ""
          }`}
        />
      ))}
    </div>
  );
}

export default Pagination;