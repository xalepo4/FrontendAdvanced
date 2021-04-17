import { educationTypes } from 'src/app/shared/enums/publicEnums';

export class Education {
    uid: number;
    type: educationTypes;
    level: any;
    name: string;
    university: string;
    finish: string;
}
