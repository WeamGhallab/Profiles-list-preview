import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

import { Profile } from '../../models/profiles.model';
import { ProfilesService } from '../../services/profiles.service';
import { UtilitiesService } from 'src/app/core/services/utilities.service';

@Component({
  selector: 'app-profiles-list',
  templateUrl: './profiles-list.component.html',
  styleUrls: ['./profiles-list.component.scss'],
})
export class ProfilesListComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource = new MatTableDataSource<Profile>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'photo',
    'localid',
    'email',
    'fullName',
    'phone',
    'address',
    'modified',
    'view',
  ];
  profilesList: Profile[] = [];
  searchValue: string = '';
  private _subscription: Subscription = new Subscription();

  constructor(
    private _profilesService: ProfilesService,
    private _router: Router,
    private _utilitiesService: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.getProfilesList();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getProfilesList() {
    this._subscription.add(
      this._profilesService.getProfilesList().subscribe((response) => {
        if (response) {
          for (let key in response) {
            const profile: Profile = response[key];
            const fullProfileData: Profile = {
              ...profile,
              key,
              modified: new Date(profile.modified),
              fullName: `${profile.first_name} ${profile.last_name}`,
            };
            this.profilesList.push(fullProfileData);
            this.dataSource.data = this.profilesList;
            this.dataSource.filterPredicate = function(data, filter: string): boolean {
              return data.first_name.toLowerCase().includes(filter) || data.last_name.toLowerCase().includes(filter) || data.email.toString().includes(filter);
            }
          }
        } else {
          this._utilitiesService.showNotification(
            'error',
            'Error ! please try again later'
          );
        }
      })
    );
  }

  onFilter() {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
  }

  onOpenDetailsPage(selectedProfileData: Profile) {
    this._router.navigateByUrl(
      `/profile-details?id=${selectedProfileData.key}`
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
