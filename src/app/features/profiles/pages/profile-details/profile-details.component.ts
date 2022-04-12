import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTab, MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilitiesService } from 'src/app/core/services/utilities.service';
import { Profile } from '../../models/profiles.model';
import { ProfilesService } from '../../services/profiles.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {
  profileKey = null;
  profileData: Profile;
  selectedTab: MatTabChangeEvent;
  private _subscription: Subscription = new Subscription();

  constructor(
    private _profilesService: ProfilesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.profileKey = this._activatedRoute.snapshot.queryParams['id'];
    if (!this.profileKey) {
      this._router.navigateByUrl('/');
    }
    this.getProfileData();
  }

  getProfileData() {
    this._subscription.add(
      this._profilesService
        .getProfleById(this.profileKey)
        .subscribe((response) => {
          if (response) {
            this.profileData = response;
          } else {
            this._utilitiesService.showNotification(
              'error',
              'Error ! please try again later'
            );
          }
        })
    );
  }

  onSelectedTabChange(tabData) {
    this.selectedTab = tabData;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
