import { Duration } from "src/duration";


export interface Task {
    id : number; 
    name : string;
    description : string;
    duration : Duration;
    prerequisite : Task[];
}

