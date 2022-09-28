import { worker } from "../mocks/browser";

const checkMode = async( isApiAvailable: boolean ) => {
  if ( !isApiAvailable ) {
    await worker.start();
  }
};


export class DataService {
  private isApiAvailable = false;

  constructor() {
    checkMode( this.isApiAvailable );
  }

  async getTestingComponentsList() {
    const response = await fetch( "http://api.pf-invest.com/tests/get_questions.php", {
      method: "POST", // or 'PUT'
      body: JSON.stringify( {
        "page_id": "page__search-1",
        "user_id": 76,
        "token": "b2675896fe6936cdcfb108f17875d376"
      } ),
    } );

    return await response.json();
  }
}

