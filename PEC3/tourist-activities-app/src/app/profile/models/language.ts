import { languageLevels, activityLenguages } from 'src/app/shared/enums/publicEnums';

export class Language {
    uid: number;
    level: languageLevels;
    language: activityLenguages;
    finish: string;
}
