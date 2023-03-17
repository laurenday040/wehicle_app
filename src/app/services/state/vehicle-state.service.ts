import { ISelectedOptions } from './../../models/selected-options.interface'
import { IFilterOptions } from './../../models/filter-options.interface'
import { FILTER_OPTIONS_INSTANCE } from '../../models/selected-options.interface'
import { IVehicle } from '../../models/vehicle.interface'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class VehicleStateService {
  $filterOptions: BehaviorSubject<ISelectedOptions> = new BehaviorSubject<ISelectedOptions>(FILTER_OPTIONS_INSTANCE())

  constructor() {}
}
