import { ISelectedOptions } from './../../models/selected-options.interface'
import { FILTER_OPTIONS_INSTANCE } from '../../models/selected-options.interface'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class VehicleStateService {
  private filterOptions$: BehaviorSubject<ISelectedOptions> = new BehaviorSubject<ISelectedOptions>(
    FILTER_OPTIONS_INSTANCE()
  )

  get filterOptions(): BehaviorSubject<ISelectedOptions> {
    return this.filterOptions$
  }

  constructor() {}
}
