import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './core/layout/pages/landing-page/landing-page.component';
import { ProfileDetailsComponent } from './features/profiles/pages/profile-details/profile-details.component';
import { ProfilesListComponent } from './features/profiles/pages/profiles-list/profiles-list.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/profiles-list' },
      { path: 'profiles-list', component: ProfilesListComponent },
      { path: 'profile-details', component: ProfileDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
