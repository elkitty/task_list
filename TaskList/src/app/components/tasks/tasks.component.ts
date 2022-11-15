import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from '../../service/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  faTimes = faTimes;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService
      .getTasks()
      .subscribe((tasks: Task[]) => (this.tasks = tasks));
  }

  deleteTask(task: Task) {
    console.log('deleted task');
    this.taskService.deleteTask(task).subscribe(
      () =>
        (this.tasks = this.tasks.filter((t) => {
          console.log('task deleted');
          return t.id !== task.id;
        }))
    );
  }

  toggleReminder(task:Task){
    task.reminder = !task.reminder
    this.taskService.updateTaskReminder(task).subscribe();
    //console.log(task)
  }

  addTask(task: Task){
    console.log(task);
    this.taskService.addTask(task).subscribe((task) => (
      this.tasks.push(task)
    ))

  }
}
