import React, { FC, useEffect } from "react";
import { Question } from "../../types/testing";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { getUniqID } from "../../helpers";
import { ErrorMessage } from "@hookform/error-message";

interface TestingFormProps {
    questions: Question[]
    setIsModalComponentTestingOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TestingForm: FC<TestingFormProps> = ({
  questions ,
  setIsModalComponentTestingOpen
}) => {
  const { control, handleSubmit, reset, formState: { errors, isSubmitted } } = useForm();


  const onSubmit = (data: unknown) => {
    console.log(JSON.stringify(data));
    console.log(isSubmitted);
    setIsModalComponentTestingOpen(false);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {
        questions.map((question) => (
          <section key={getUniqID()}>
            <label>{question.title}</label>
            <Controller
              rules={{ required: "поле обязательно для заполнения",
              }}
              render={({ field }) => (
                <RadioGroup aria-label={question.title}{...field}
                >
                  {question.answers.map((answer) => (
                    <FormControlLabel
                      key={getUniqID()}
                      value={answer.id}
                      control={<Radio />}
                      label={answer.label}
                    />
                  ))}
                  <ErrorMessage
                    errors={errors}
                    name={question.id}
                    render={({ message }) => <span style={{ color: "red" }}>{message}</span>}
                  />
                </RadioGroup>
              )}
              name={question.id}
              control={control}
              defaultValue=""
            />
          </section>
        ))
      }
      <button className="button">отправить</button>
    </form>
  );
};

export default TestingForm;