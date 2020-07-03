import {Exercise} from './exercise.model';
import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable()
export class TrainingService {
  exterciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  private avaliableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private completedExercises: Exercise[] = [];

  constructor(
    private db: AngularFirestore
  ) {
  }

  fetchAvaliableExercises() {
    this.db.collection('avaliableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              ...doc.payload.doc.data() as Exercise
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.avaliableExercises = exercises;
        this.exercisesChanged.next([...this.avaliableExercises]);
      });
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.avaliableExercises.find(ex => ex.id === selectedId);
    this.exterciseChanged.next({...this.runningExercise});
  }

  completeExercise() {
    this.completedExercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exterciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.completedExercises.push({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exterciseChanged.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  getCompletedExercises() {
    return this.completedExercises.slice();
  }
}
