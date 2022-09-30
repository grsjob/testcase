import React, { FC, useEffect, useState } from "react";
import { DataService } from "../../services/DataService";
import BaseModal from "../BaseModal/BaseModal";
import { ComponentUnderTest, Question, TestinComponentsResponse } from "../../types/testing";
import TestingForm from "../TestingForm/TestingForm";

const highlightComponent = (componentNode: HTMLElement) => {
  componentNode.style.boxShadow = "0px 0px 20px 0px rgba(246,82,72,.8)";
  componentNode.style.backgroundColor = "rgba(246,82,72,.8)";
};

const removeHighlightComponent = (componentNode: HTMLElement) => {
  componentNode.style.boxShadow = "0px 0px 20px 0px rgba(246,82,72,.8)";
  componentNode.style.backgroundColor = "yellow";
};


interface ComponentsTestingProps {
  children: React.ReactNode
}


const ComponentsTesting: FC<ComponentsTestingProps> = ({ children }) => {
  const [ testingData, setTestingData ] = useState<TestinComponentsResponse>();
  const [ questions, setQuestions ] = useState<Question[] | null>(null);
  const [ isSend, setIsSend ] = useState<"send" | "dont-send">("dont-send");
  const [ component, setComponent ] = useState< ComponentUnderTest | null>(null);
  const [ isModalComponentTestingOpen, setIsModalComponentTestingOpen ] = useState(false);

  const listener = (e:MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalComponentTestingOpen(true);
  };


  const testing = async(componentNode: HTMLElement, component: ComponentUnderTest) => {
    highlightComponent(componentNode);
    setQuestions(component.questions);
    componentNode.addEventListener("click", listener);

    return new Promise<void>(resolve => {
      if(isSend === "send") {
        resolve();
      }
    });
  };


  const addComponentsInTest = async(components: ComponentUnderTest[]) => {
    for await (const component of components){
      const componentNode = document.querySelector(`[data-id=${component.id}]`) as HTMLElement;

      if(componentNode){
        setComponent(component);
        await testing(componentNode, component);
      }
    }
  };

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
      addComponentsInTest(testingData.components);
    }
  }, [ testingData ]);

  return (
    <div>
      {children}
      {testingData &&
            <BaseModal ariaDescription='Тестовое модальное окно' isOpen={true}>
            Да начнется тест!!!
            </BaseModal>
      }
      {isModalComponentTestingOpen && questions &&
          <BaseModal isOpen={isModalComponentTestingOpen}
            ariaDescription='Тест компонента'
            onClose={setIsModalComponentTestingOpen}>
            <TestingForm questions={questions}
              setIsModalComponentTestingOpen={setIsModalComponentTestingOpen}
            />
          </BaseModal>
      }
    </div>
  );
};


export default ComponentsTesting;