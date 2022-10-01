import React, { FC, useEffect, useState } from "react";
import { DataService } from "../../services/DataService";
import BaseModal from "../BaseModal/BaseModal";
import { TestinComponentsResponse } from "../../types/testing";
import TestingForm from "../TestingForm/TestingForm";
import { StepType, TourProvider, useTour } from "@reactour/tour";
import { Button } from "@mui/material";


interface ComponentsTestingProps {
  children: React.ReactNode
}

interface TestTourProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}
const StartButton: FC<TestTourProps> = ({ setIsOpenModal }) => {
  const { setIsOpen } = useTour();

  const onClickHandler = () => {
    setIsOpenModal(false);
    setIsOpen(true);
  };

  return (
    // <button onClick={onClickHandler}>Старт</button>
    <Button variant="outlined" onClick={onClickHandler}>Старт</Button>
  );
};

const ComponentsTesting: FC<ComponentsTestingProps> = ({ children }) => {
  const [ testingData, setTestingData ] = useState<TestinComponentsResponse>();
  const [ steps, setSteps ] = useState<StepType[]>();
  const [ isOpenStartModal, setIsOpenStartModal ] = useState(true);

  const getTestingData = async() => {
    const dataService = new DataService();
    const data = await dataService.getTestingComponentsList() as TestinComponentsResponse | undefined;

    if(data && data.status === "success") {
      setTestingData(data);
    }
  };

  useEffect(() => {
    getTestingData();
  },[]);

  useEffect(() => {
    if(testingData) {
      const steps = [];

      for (const component of testingData.components) {
        steps.push({
          selector: `.${component.id}`,
          content: (<TestingForm questions={component.questions} />),
          disableActions: true
        });
      }
      setSteps(steps);
    }
  }, [ testingData ]);

  return (
    <>
      {steps ?
        <TourProvider steps={steps} disableInteraction={true} showNavigation={false} showCloseButton={false} 
          scrollSmooth={true}>
          {children}
          {testingData &&
            <BaseModal ariaDescription='Тестовое модальное окно' isOpen={isOpenStartModal} >
              <p>Да начнется тест!!!</p>
              <StartButton setIsOpenModal={setIsOpenStartModal}/>
            </BaseModal>
          }
        </TourProvider> : children }

    </>
  );
};


export default ComponentsTesting;
