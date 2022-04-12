import { NgModule } from '@angular/core';

import { LandingPageComponent } from './layout/pages/landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';
import { LoaderComponent } from './layout/components/loader/loader.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    LoaderComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: [    
  ],
})
export class CoreModule { }
