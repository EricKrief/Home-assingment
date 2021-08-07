import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Patient } from '../models/patient';
import { UserImageResponseDto } from '../dtos/user-image-response-dto';
import { SortTypes } from '../models/sort-types';
import { Filter } from '../models/filter';
import { FilterTypes } from '../models/filter-types';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  private patientsApiPath = "./assets/patients.json";
  private randomUsersApiPath = "https://randomuser.me/api";
  private pageSize = 20;

  constructor(private readonly http: HttpClient) { }

  getAllPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientsApiPath);
  }

  // Simulating paging from backend
  getPatientsInPaging(pageNumber: number, addPictures: boolean): Observable<Patient[]> {
    if (pageNumber < 1) {
      throw new Error('Cannot request a page smaller than 1');
    }

    const startIndex = this.pageSize * (pageNumber - 1);

    const patients$ = this.getAllPatients()
      .pipe(
        map(patients => {
          return patients.slice(startIndex, startIndex + this.pageSize)
        })
      );

    if (addPictures) {
      return this.combinePatientsWithRandomPictures(patients$);
    }

    return patients$;
  }

  sortPatientsBySortType(patients: Patient[], sortType: SortTypes): Patient[] {
    const ascending = (sortType === SortTypes.AscendingAge || sortType === SortTypes.AscendingName);
    const propertyName = (sortType === SortTypes.AscendingAge || sortType === SortTypes.DescendingAge) ? 'age' : 'name';
    return patients.sort((patientA, patientB) => {
      if (patientA[propertyName] < patientB[propertyName]) { return ascending ? -1 : 1; }
      if (patientA[propertyName] > patientB[propertyName]) { return ascending ? 1 : -1; }
      return 0;
    });
  }

  filterPatientsWithActiveFiltersIfExist(patients: Patient[], filters: Filter[]): Patient[] {
    let filteredPatients = [...patients];

    filters.forEach(filter => {
      if (filter.type === FilterTypes.Age) {
        filteredPatients = filteredPatients.filter(patient => patient.age >= filter.from && patient.age <= filter.to);
      }
      else {
        // Converting seconds to minutes because the averageReplyTime filter works in minutes
        filteredPatients = filteredPatients.filter(patient => (patient.averageReplyTime / 60) >= filter.from && (patient.averageReplyTime / 60) <= filter.to);
      }
    });
    return filteredPatients;
  }


  // Adding a random image to each patient from random users api
  private combinePatientsWithRandomPictures(patientDtos$: Observable<Patient[]>): Observable<Patient[]> {
    const randomUsersPictures$ = this.http.get<UserImageResponseDto>(`${this.randomUsersApiPath}/?results=${this.pageSize}&inc=picture`)
      .pipe(
        map((response: UserImageResponseDto) => response.results),
      );

    return combineLatest(([patientDtos$, randomUsersPictures$]))
      .pipe(
        map(([patientDtos, randomUsersPictures]) =>
          patientDtos.map((patientDto, index) => ({ ...patientDto, image: randomUsersPictures[index].picture.large }))
        ));
  }
}
