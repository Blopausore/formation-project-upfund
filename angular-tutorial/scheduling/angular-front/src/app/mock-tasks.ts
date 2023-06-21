import { Task } from "./task"

const task_balaie: Task = new Task( 0, "Balayer", "Sami passe le balaie", 10, 0, [])
const task_vitre : Task = new Task(1, "Nettoyer", "Sami nettoie les vitres", 20, 0, [task_balaie]);
const task_verre : Task = new Task(2, "Servir", "Sami me sert un verre", 2, 0, [task_vitre, task_balaie]);

export const TASKS : Task[] = [
    task_balaie,
    task_vitre,
    task_verre
]