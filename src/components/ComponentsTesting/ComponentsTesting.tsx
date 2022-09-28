import React, { FC, useEffect, useState } from "react";
import { DataService } from "../../services/DataService";
import BaseModal from "../BaseModal/BaseModal";
import { TestinComponentsResponse } from "../../types/testing";
import { getUniqID } from "../../helpers";


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

  return (
    <div>
      {children}
      {testingData && <BaseModal isOpen={true}>
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