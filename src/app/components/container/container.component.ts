import { IFiltersAndVehicles } from './../../models/filters-and-vehicles.interface'
import { ALL } from './../../consts/filter.const'
import { IVehicle } from './../../models/vehicle.interface'
import { VehicleStateService } from '../../services/state/vehicle-state.service'
import { TraficService } from './../../services/trafic/trafic.service'
import { Component, OnInit } from '@angular/core'
import {
  Observable,
  combineLatest,
  map,
  retry,
  share,
  catchError,
  BehaviorSubject,
} from 'rxjs'
import { animate, query, stagger, style, transition, trigger } from '@angular/animations'
import { ISelectedOptions } from 'src/app/models/selected-options.interface'

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  animations: [
    trigger('fade', [
      transition('* => *', [
        query(':enter', [style({ opacity: 0 }), stagger(100, [animate('0.3s', style({ opacity: 1 }))])], {
          optional: true,
        }),
      ]),
    ]),
  ],
})
export class ContainerComponent implements OnInit {
  data$: Observable<IFiltersAndVehicles> | undefined

  constructor(private _traficService: TraficService, private _state: VehicleStateService) {}

  ngOnInit(): void {
    //TODO get vehicle list
    const vehicleList$ = this._traficService.fetchData().pipe(
      share(),
      retry({ count: 5, delay: 2000 }),
      catchError((err) => [])
    )

    //TODO prepare filter options
    const filterOptions$ = this.buildFilters(this._state.filterOptions, vehicleList$)

    //TODO display vehicles based on filters
    const filteredVehicles$ = this.buildDisplayList(this._state.filterOptions, vehicleList$)

    //TODO combine into unique data source
    this.data$ = combineLatest([filterOptions$, filteredVehicles$]).pipe(
      map((data) => {
        return { filters: data[0], vehicles: data[1] }
      })
    )
  }

  trackByVehicle(index: number, vehicle: IVehicle): number {
    return vehicle.id
  }

  private buildFilters(filters: BehaviorSubject<ISelectedOptions>, vehicleList: Observable<IVehicle[]>) {
    return combineLatest([filters, vehicleList]).pipe(
      //TODO prepare unique values
      map((data) => {
        let vehicleFiltered: IVehicle[] = data[1].filter((x) =>
          data[0].color === ALL ? true : x.colors.find((color) => color === data[0].color)
        )
        vehicleFiltered = vehicleFiltered.filter((x) => (data[0].type === ALL ? true : x.type === data[0].type))
        vehicleFiltered = vehicleFiltered.filter((x) => (data[0].brand === ALL ? true : x.brand === data[0].brand))
        return vehicleFiltered.reduce(
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
          colors: [ALL, ...Array.from(options.colors)],
          brand: [ALL, ...Array.from(options.brand)],
          type: [ALL, ...Array.from(options.type)],
        }
      })
    )
  }

  private buildDisplayList(
    filters: BehaviorSubject<ISelectedOptions>,
    vehicleList: Observable<IVehicle[]>
  ): Observable<IVehicle[]> {
    return combineLatest([filters, vehicleList]).pipe(
      map(([filterOptions, list]) => {
        let response: IVehicle[] = list
        //TODO Color filter
        response = response.filter((x) =>
          filterOptions.color === ALL ? true : x.colors.find((color) => color === filterOptions.color)
        )
        //TODO Type filter
        response = response.filter((x) => (filterOptions.type === ALL ? true : x.type === filterOptions.type))
        //TODO Brand filter
        response = response.filter((x) => (filterOptions.brand === ALL ? true : x.brand === filterOptions.brand))
        return response
      })
    )
  }
}
