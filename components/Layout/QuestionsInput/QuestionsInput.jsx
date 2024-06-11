import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./QuestionsInput.module.scss";

const QuestionsInput = ({ questions, product, setProduct }) => {
  const handleQuestion = (e, index) => {
    const values = [...questions];
    values[index][e.target.name] = e.target.value;
    setProduct({ ...product, questions: values });
  };

  const handleRemove = (index) => {
    if (questions.length > 0) {
      const values = [...questions];
      values.splice(index, 1);
      setProduct({ ...product, questions: values });
    }
  };

  return (
    <div className={styles.questions_input}>
      {questions && questions.length === 0 && (
        <div className={styles.add_details}>
          <p>
            Add Questions
            <AiOutlinePlus
              onClick={() => {
                setProduct({
                  ...product,
                  questions: [...questions, { question: "", answer: "" }],
                });
              }}
            />
          </p>
        </div>
      )}
      {questions &&
        questions.map((question, index) => (
          <div
            className={styles.questions}
            key={index}>
            <div className={styles.input_group}>
              <label htmlFor="name">Question</label>
              <input
                id="name"
                type="text"
                name="question"
                placeholder="Question"
                value={question.name}
                onChange={(e) => handleQuestion(e, index)}
              />
            </div>

            <div className={styles.input_group}>
              <label htmlFor="value">Answer</label>
              <input
                id="value"
                type="text"
                name="answer"
                placeholder="Answer"
                value={question.value}
                onChange={(e) => handleQuestion(e, index)}
              />
            </div>

            <div className={styles.action_btns}>
              <AiOutlineMinus onClick={() => handleRemove(index)} />
              <AiOutlinePlus
                onClick={() => {
                  setProduct({
                    ...product,
                    questions: [...questions, { question: "", answer: "" }],
                  });
                }}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default QuestionsInput;
