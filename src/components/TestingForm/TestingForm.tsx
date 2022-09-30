import React, { FC } from "react";
import { Question } from "../../types/testing";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { getUniqID } from "../../helpers";

interface TestingFormProps {
    questions: Question[]
}

const TestingForm: FC<TestingFormProps> = ({ questions }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data: unknown) => {
    console.log(JSON.stringify(data));
  };
  // Questions.forEach((question, index) => {
  //     question.
  // })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {questions.map((question) => (
        <div key={getUniqID()}>
          <label>{question.title}</label>
          <Controller
            render={({ field }) => (
              <RadioGroup aria-label={question.title}{...field}>
                {question.answers.map((answer) => (
                  <FormControlLabel
                    key={getUniqID()}
                    value={answer.id}
                    control={<Radio />}
                    label={answer.label}
                  />
                ))}
              </RadioGroup>
            )}
            name="RadioGroup"
            control={control}
          />
        </div>
      ))}
    </form>
  );
};

export default TestingForm;