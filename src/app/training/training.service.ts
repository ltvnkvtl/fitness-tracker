import {Exercise} from './exercise.model';
import {Subject} from 'rxjs';

export class TrainingService {
  exterciseChanged = new Subject<Exercise>();
  private avaliableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
    { id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
    { id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
    { id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
  ];
  private runningExercise: Exercise;

  getAvaliableExercises() {
    return this.avaliableExercises.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.avaliableExercises.find(ex => ex.id === selectedId);
    this.exterciseChanged.next({...this.runningExercise});
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }
}
