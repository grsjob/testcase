import React, { FC, useEffect, useState } from "react";
import { DataService } from "../../services/DataService";
import BaseModal from "../BaseModal/BaseModal";
import { ComponentUnderTest, TestinComponentsResponse } from "../../types/testing";
import { getUniqID } from "../../helpers";

const highlightComponent = ( componentNode: HTMLElement ) => {
  componentNode.style.boxShadow = "0px 0px 20px 0px rgba(246,82,72,.8)";
  componentNode.style.backgroundColor = "rgba(246,82,72,.8)";
};

const addComponentsInTest = async( components: ComponentUnderTest[] ) => {
  for await ( const component of components ){
    const componentNode = document.querySelector( `[data-id=${component.id}]` ) as HTMLElement;

    if( componentNode ){
      highlightComponent( componentNode );
    }
  }
};

interface ComponentsTestingProps {
  children: React.ReactNode
}


const ComponentsTesting: FC<ComponentsTestingProps> = ( { children } ) => {
  const [ testingData, setTestingData ] = useState<TestinComponentsResponse>();

  const getTestingData = async() => {
    const dataService = new DataService();
    const data = await dataService.getTestingComponentsList() as TestinComponentsResponse | undefined;

    if( data && data.status === "success" ) {
      setTestingData( data );
    }
  };

  useEffect( () => {
    getTestingData();
  }, [ ] );

  useEffect( () => {
    if( testingData ){
      addComponentsInTest( testingData.components );
    }
  }, [ testingData ] );

  return (
    <div>
      {children}
      {testingData &&
          <BaseModal ariaDescription='Тестовое модальное окно' isOpen={true}>
            {
              testingData.components.map( ( component, id ) => {
                if( id === 0 ){
                  return <div key={getUniqID()}>{component.name}</div>;
                }
              } )
            }
          </BaseModal>}
    </div>
  );
};


export default ComponentsTesting;