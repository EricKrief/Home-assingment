import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Filter } from 'src/app/models/filter';
import { FilterTypes } from 'src/app/models/filter-types';
import { SortTypes } from 'src/app/models/sort-types';

@Component({
  selector: 'app-patients-view-controller',
  templateUrl: './patients-view-controller.component.html',
  styleUrls: ['./patients-view-controller.component.scss']
})
export class PatientsViewControllerComponent implements OnInit {

  @Output() onSortTypeSelected = new EventEmitter<SortTypes>();
  @Output() onUpdateFilterStatus = new EventEmitter<Filter>();

  sortTypes: SortTypes[] = [...Object.values(SortTypes)];
  filters: Filter[] = [
    { type: FilterTypes.Age, min: 0, max: 100, from: 0, to: 0, isActive: false },
    { type: FilterTypes.AverageReplyTime, min: 0, max: 120, from: 0, to: 0, isActive: false }
  ];

  constructor() { }

  ngOnInit(): void { }

  sortTypeSelected(value: SortTypes) {
    this.onSortTypeSelected.emit(value);
  }

  updateFilterStatus(filter: Filter) {
    this.onUpdateFilterStatus.emit(filter);
  }

}
