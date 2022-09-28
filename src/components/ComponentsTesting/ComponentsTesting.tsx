import React, { FC, useEffect, useState } from "react";
import { DataService } from "../../services/DataService";
import BaseModal from "../BaseModal/BaseModal";


interface ComponentsTestingProps {
  children: React.ReactNode
}

const ComponentsTesting: FC<ComponentsTestingProps> = ( { children } ) => {
  const [ testingData, setTestingData ] = useState();

  const getTestingData = async() => {
    const dataService = new DataService();
    const data = await dataService.getTestingComponentsList();

    if( data.status === "success" ) {
      setTestingData( data );
    }
  };

  useEffect( () => {
    getTestingData();
  }, [ ] );

  return (
    <div>
      {children}
      <BaseModal isOpen={true}>Try</BaseModal>
    </div>
  );
};

export default ComponentsTesting;