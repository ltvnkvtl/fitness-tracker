import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {FlexLayoutModule} from '@angular/flex-layout';

import {TrainingComponent} from './training.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {NewTrainingComponent} from './new-training/new-training.component';
import {PastTrainingsComponent} from './past-training/past-trainings.component';
import {StopTrainingComponent} from './current-training/stop-training.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    AngularFirestoreModule,
    SharedModule
  ],
  entryComponents: [StopTrainingComponent]
})

export class TrainingModule {

}
