import { ALL } from './../../consts/filter.const'
import { VehicleStateService } from './../../services/state/vehicle-state.service'
import { IFilterOptions } from './../../models/filter-options.interface'
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  @Input() filterValues: IFilterOptions | undefined
  filterOptions: FormGroup | undefined
  all = ALL

  constructor(private _fb: FormBuilder, private _state: VehicleStateService) {}

  ngOnInit(): void {
    console.log('filter', this.filterValues)
    if (this.filterValues) {
      this.filterOptions = this.initializeForm(this.filterValues)
      this.filterOptions.valueChanges.subscribe((values) => {
        this._state.filterOptions.next(values)
      })
    }
  }

  private initializeForm(values: IFilterOptions): FormGroup {
    return this._fb.group({
      type: [ALL],
      brand: [ALL],
      color: [ALL],
    })
  }
}
