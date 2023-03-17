import { ALL } from './../../consts/filter.const'
import { IVehicle } from './../../models/vehicle.interface'
import { IFilterOptions } from './../../models/filter-options.interface'
import { VehicleStateService } from '../../services/state/vehicle-state.service'
import { TraficService } from './../../services/trafic/trafic.service'
import { Component, OnInit } from '@angular/core'
import { share, Observable, combineLatest, map, tap } from 'rxjs'

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  filteredVehicles$: Observable<IVehicle[]> | undefined
  vehicleList$: Observable<IVehicle[]> | undefined
  filterOptions$: Observable<IFilterOptions> | undefined

  constructor(private _traficService: TraficService, private _state: VehicleStateService) {}

  ngOnInit(): void {
    //TODO get vehicle list
    this.vehicleList$ = this._traficService.fetchData()

    //TODO prepare filter options
    this.filterOptions$ = this.vehicleList$.pipe(
      //TODO prepare unique values
      map((vehicleList) => {
        return vehicleList.reduce(
          (previous, current) => {
            previous.brand.add(current.brand)
            previous.type.add(current.type)
            current.colors.forEach((color) => previous.colors.add(color)) // previous.colors.
            return previous
          },
          {
            colors: new Set<string>(),
            brand: new Set<string>(),
            type: new Set<string>(),
          }
        )
      }),
      //TODO transform to simple array for easy management
      map((options) => {
        return {
          colors: Array.from(options.colors),
          brand: Array.from(options.brand),
          type: Array.from(options.type),
        }
      })
    )

    //TODO display vehicles based on filters
    this.filteredVehicles$ = combineLatest([this._state.$filterOptions, this.vehicleList$]).pipe(
      map(([filterOptions, list]) => {
        console.log('filterOptions', filterOptions)
        let response: IVehicle[] = list
        //TODO Color filter
        response = response.filter((x) =>
          filterOptions.color === ALL.key ? true : x.colors.find((color) => color === filterOptions.color)
        )
        //TODO Type filter
        response = response.filter((x) => (filterOptions.type === ALL.key ? true : x.type === filterOptions.type))
        //TODO Brand filter
        response = response.filter((x) => (filterOptions.brand === ALL.key ? true : x.brand === filterOptions.brand))
        return response
      })
    )
  }
}
