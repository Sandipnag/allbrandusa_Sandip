import { Network } from './Network';
import { ApiUrl } from './Url';
export default class Apis {
  // <========================= Employer All api call section =========================>

  static productlisting = data => {
    return Network('POST', `${ApiUrl}getAllProducts`, data);
  };

  static getCmsData = (type) => {
    return Network(
      'GET',
      `${ApiUrl}getCmsData?content_type=${type}`,
    );
  };

  static getAllCategory = () => {
    return Network(
      'GET',
      `${ApiUrl}getAllCategory`,
    );
  };
  static getAllBrands = () => {
    return Network(
      'GET',
      `${ApiUrl}getAllBrands`,
    );
  };
  
}
