
export class Task{
    id : number; 
    name : string;
    description : string;
    duration : number;
    starting : number;
    prerequisite : Task[];

    get_starting(): void{
        for (var pre_task of this.prerequisite){
            this.starting = Math.max(this.starting, pre_task.starting+pre_task.duration);
        }
    }

    constructor (id: number, name: string, description: string, duration: number, starting: number, prerequisite: Task[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.starting = starting;
        this.prerequisite = prerequisite;
    }
}

