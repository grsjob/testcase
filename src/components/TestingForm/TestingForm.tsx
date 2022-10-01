import React, { FC, useState } from "react";
import { Question } from "../../types/testing";
import { useForm, Controller } from "react-hook-form";
import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import { getUniqID } from "../../helpers";
import { ErrorMessage } from "@hookform/error-message";
import { useTour } from "@reactour/tour";
import "./style.css";

interface TestingFormProps {
    questions: Question[]
}

const TestingForm: FC<TestingFormProps> = ({ questions }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const { currentStep, setCurrentStep } = useTour();
  const [ visibleCommentsField, setVisibleCommentsField ] = useState<string[]>([]);


  const onSubmit = (data: unknown) => {
    console.log(JSON.stringify(data));
    setCurrentStep(currentStep+1);
    reset();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetQuestion = questions.find(question => question.id === e.target.name);
    const targetAnswer = targetQuestion!.answers.find(answer => answer.id === e.target.value);

    if(targetAnswer && targetQuestion && targetAnswer.weight <= targetQuestion.wants_comment){
      setVisibleCommentsField(prevState => [ ...prevState, `${targetQuestion.id}_comment` ]);
    } else {
      setVisibleCommentsField(visibleCommentsField.filter(el => el !== `${targetQuestion!.id}_comment`));
    }
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='testing-form'>
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
                      control={<Radio name={question.id} onChange={handleChange}/>}
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
            {(question.wants_comment >= 0 && visibleCommentsField.includes(`${question.id}_comment`)) ?
              <Controller
                name={`${question.id}_comment`}
                control={control}
                render={({ field }) => <TextField
                  {...field}
                  id="outlined-multiline-flexible"
                  label="Комментарий"
                  multiline
                  maxRows={3}
                  margin="normal"
                />}
              /> : null
            }
          </section>
        ))
      }
      <button className="button">отправить</button>
    </form>
  );
};

export default TestingForm;