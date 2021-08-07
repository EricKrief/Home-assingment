import { Component, HostListener, OnInit } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { Filter } from 'src/app/models/filter';
import { Patient } from 'src/app/models/patient';
import { SortTypes } from 'src/app/models/sort-types';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patients-container',
  templateUrl: './patients-container.component.html',
  styleUrls: ['./patients-container.component.scss']
})
export class PatientsContainerComponent implements OnInit {

  private currentPageNumber = 1;
  private displayPatientsWithPictures = true;
  private activeSortType: SortTypes;
  private activeFilters: Filter[] = [];
  private patients: Patient[] = [];
  loadedAllPatients = false;
  showSpinnerCounter = 0;
  currentlyDisplayedPatients: Patient[] = [];

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (Math.ceil(window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      if (this.loadedAllPatients) {
        return;
      }
      this.getPatientsInPaging(this.currentPageNumber, this.displayPatientsWithPictures);
    }
  }

  constructor(private readonly patientsService: PatientsService) { }

  ngOnInit(): void {
    this.getPatientsInPaging(this.currentPageNumber, this.displayPatientsWithPictures);
  }

  getPatientsInPaging(pageNumber: number, addPictures: boolean): void {
    this.showSpinnerCounter++;
    this.patientsService.getPatientsInPaging(pageNumber, addPictures)
      .pipe(
        take(1)
      )
      .subscribe(patients => {
        this.handlePatientsPageResponse(patients);
        this.showSpinnerCounter--;
      },
        (error) => {
          console.log('Something went wrong when fetching new patients', error);
          this.showSpinnerCounter--;
        });
  }

  onSortTypeSelected(sortType: SortTypes): void {
    this.activeSortType = sortType;
    if (!sortType) {
      this.currentlyDisplayedPatients = this.patientsService.filterPatientsWithActiveFiltersIfExist(this.patients, this.activeFilters);
    }
    else {
      this.sortCurrentlyDisplayedPatients();
    }
  }

  onUpdateFilterStatus(filter: Filter): void {
    const index = this.activeFilters.findIndex(activeFilter => filter.type === activeFilter.type);
    if (filter.isActive) {
      if (index === -1) {
        this.activeFilters.push(filter);
      }
      else {
        this.activeFilters[index] = filter;
      }
    }
    else {
      if (index > -1) {
        this.activeFilters.splice(index, 1);
      }
    }

    this.currentlyDisplayedPatients = this.patientsService.filterPatientsWithActiveFiltersIfExist(this.patients, this.activeFilters);
    if (this.activeSortType)
      this.sortCurrentlyDisplayedPatients();
  }

  handlePatientsPageResponse(patients: Patient[]): void {
    if (!patients.length) {
      this.loadedAllPatients = true;
      return;
    }
    this.patients = [...this.patients, ...patients];
    this.currentlyDisplayedPatients = this.patientsService.filterPatientsWithActiveFiltersIfExist(this.patients, this.activeFilters);
    if (this.activeSortType) {
      this.sortCurrentlyDisplayedPatients();
    }
    this.currentPageNumber++;
  }

  sortCurrentlyDisplayedPatients(): void {
    this.currentlyDisplayedPatients = this.patientsService.sortPatientsBySortType(this.currentlyDisplayedPatients, this.activeSortType);
  }
}