import { EventEmitter, Input } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { SortTypes } from 'src/app/models/sort-types';

@Component({
  selector: 'app-item-sorter',
  templateUrl: './item-sorter.component.html',
  styleUrls: ['./item-sorter.component.scss']
})
export class ItemSorterComponent implements OnInit {

  @Input() sortTypes: SortTypes[];
  @Output() onSortTypeSelected = new EventEmitter<SortTypes>();
  activeSortType: SortTypes;
  
  constructor() { }

  ngOnInit(): void { }

  sortTypeSelected(sortType: SortTypes){
    this.activeSortType = sortType
    this.onSortTypeSelected.emit(sortType);
  }
}
