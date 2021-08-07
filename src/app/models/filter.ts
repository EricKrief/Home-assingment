import { FilterTypes } from "./filter-types";

export interface Filter {
  type: FilterTypes;
  min: number;
  max: number
  from: number;
  to: number;
  isActive: boolean;
}