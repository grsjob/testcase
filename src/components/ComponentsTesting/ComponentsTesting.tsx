import React, { FC, useEffect, useState } from "react";
import { DataService } from "../../services/DataService";
import BaseModal from "../BaseModal/BaseModal";
import { ComponentUnderTest, Question, TestinComponentsResponse } from "../../types/testing";
import TestingForm from "../TestingForm/TestingForm";
import { StepType, TourProvider, useTour } from "@reactour/tour";

const highlightComponent = (componentNode: HTMLElement) => {
  componentNode.style.boxShadow = "0px 0px 20px 0px rgba(246,82,72,.8)";
  componentNode.style.backgroundColor = "rgba(246,82,72,.8)";
};


interface ComponentsTestingProps {
  children: React.ReactNode
}

interface TestTourProps {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}
const TestTour: FC<TestTourProps> = (setIsOpenModal) => {
  const { setIsOpen } = useTour();

  const onClickHandler = () => {
    setIsOpenModal(false);
    setIsOpen(true);
  };

  return (
    <button onClick={() => {
      // setIsOpenStartModal(false);
      setIsOpen(true);
    }
    }>вот</button>
  );
};

const ComponentsTesting: FC<ComponentsTestingProps> = ({ children }) => {
  const [ testingData, setTestingData ] = useState<TestinComponentsResponse>();
  const [ questions, setQuestions ] = useState<Question[] | null>(null);
  const [ steps, setSteps ] = useState<StepType[]>();
  const [ isOpenStartModal, setIsOpenStartModal ] = useState(true);
  const [ isModalComponentTestingOpen, setIsModalComponentTestingOpen ] = useState(false);
  //
  // const listener = (e:MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setIsModalComponentTestingOpen(true);
  // };
  //
  // const addComponentsInTest = async(components: ComponentUnderTest[]) => {
  //   for await (const component of components){
  //     const componentNode = document.querySelector(`[data-id=${component.id}]`) as HTMLElement;
  //
  //     if(componentNode){
  //       highlightComponent(componentNode);
  //       setQuestions(component.questions);
  //
  //       if(questions){
  //         componentNode.addEventListener("click", listener);
  //       }
  //     }
  //   }
  // };

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
          content: "text 1",
        });
      }
      setSteps(steps);
    }
  }, [ testingData ]);

  return (
    <>
      {steps ? <TourProvider steps={steps}>
        {children}
        {testingData &&
            <BaseModal ariaDescription='Тестовое модальное окно' isOpen={isOpenStartModal} >
              Да начнется тест!!!
              <TestTour setIsOpenModal={setIsOpenStartModal}/>
            </BaseModal>
        }
        {isModalComponentTestingOpen && questions &&
            <BaseModal isOpen={isModalComponentTestingOpen}
              ariaDescription='Тест компонента'
              onClose={setIsModalComponentTestingOpen}>
              <TestingForm questions={questions} />
            </BaseModal>
        }
      </TourProvider> : children }

    </>
  );
};


export default ComponentsTesting;

