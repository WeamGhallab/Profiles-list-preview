import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProfilesListComponent } from './profiles/pages/profiles-list/profiles-list.component';
import { ProfileDetailsComponent } from './profiles/pages/profile-details/profile-details.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [ProfilesListComponent, ProfileDetailsComponent],
  imports: [SharedModule, MaterialModule],
  exports: [],
})
export class FeaturesModule {}
