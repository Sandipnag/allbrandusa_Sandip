import { Network } from './Network';
import { ApiUrl } from './Url';
export default class Apis {
  // <========================= Employer All api call section =========================>
  static registration = data => {
    return Network('POST', `${ApiUrl}register`, data);
  };

  static login = data => {
    return Network('POST', `${ApiUrl}login`, data);
  };

  
  static getCmsData = (type) => {
    return Network(
      'GET',
      `${ApiUrl}getCmsData?content_type=${type}`,
    );
  };
  
}
