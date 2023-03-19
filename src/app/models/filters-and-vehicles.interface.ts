import { Observable } from 'rxjs'
import { IFilterOptions } from './filter-options.interface'
import { IVehicle } from './vehicle.interface'

export interface IFiltersAndVehicles {
  filters: IFilterOptions
  vehicles: IVehicle[]
}
