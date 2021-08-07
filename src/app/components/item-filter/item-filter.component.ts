import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from 'src/app/models/filter';

@Component({
  selector: 'app-item-filter',
  templateUrl: './item-filter.component.html',
  styleUrls: ['./item-filter.component.scss']
})
export class ItemFilterComponent implements OnInit {

  @Input() filters: Filter[];
  @Output() updateFilterStatus = new EventEmitter<Filter>();
  filtersAreActive = false;
  showFilters = false;

  constructor() { }

  ngOnInit(): void { }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onSliderChange(filter: Filter, value: number | null) {
    if (filter.to < filter.from) {
      filter.from = value as number;
      filter.to = value as number;
    }
    filter.isActive = true;
    this.updateFilterStatus.emit(filter);
    this.updateFiltersAreActive();
  }

  updateFiltersAreActive() {
    if (this.filters.some(filter => filter.isActive)) {
      this.filtersAreActive = true;
    }
    else {
      this.filtersAreActive = false;
    }
  }

  resetFilter(filter: Filter) {
    filter.isActive = false;
    filter.from = 0;
    filter.to = 0;
    this.updateFiltersAreActive();
    this.updateFilterStatus.emit(filter);
  }
}
