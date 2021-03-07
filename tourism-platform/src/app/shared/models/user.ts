import {Education} from './education';
import {Activity} from './activity';

export class User {
  id: number;
  name: string;
  surname: string;
  birthDate: string;
  phone: string;
  nationality: 'ES' | 'FR' | 'IT' | 'PT';
  nif: string;
  aboutMe: string;
  type: 'tourist' | 'company';
  email: string;
  password: string;
  activities: Activity[];
  education: Education[];
}
