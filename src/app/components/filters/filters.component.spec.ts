import { ISelectedOptions, FILTER_OPTIONS_INSTANCE } from './../../models/selected-options.interface'
import { BehaviorSubject } from 'rxjs'
import { VehicleStateService } from './../../services/state/vehicle-state.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MaterialModule } from './../../material.module'
import { ReactiveFormsModule } from '@angular/forms'
import { FiltersComponent } from './filters.component'
import { MockProvider, ngMocks } from 'ng-mocks'
import { subscribeSpyTo } from '@hirez_io/observer-spy/dist/subscribe-spy-to'

describe('FiltersComponent', () => {
  let component: FiltersComponent
  let fixture: ComponentFixture<FiltersComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      imports: [ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        MockProvider(VehicleStateService, {
          filterOptions: new BehaviorSubject<ISelectedOptions>(FILTER_OPTIONS_INSTANCE()),
        }),
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent)
  })

  it('should be created without filters options', () => {
    fixture = TestBed.createComponent(FiltersComponent)
    component = fixture.componentInstance
    expect(component).toBeDefined()
  })

  it('should be created with filters options', () => {
    fixture = TestBed.createComponent(FiltersComponent)
    component = fixture.componentInstance
    component.filterValues = {
      brand: ['brand1', 'brand2'],
      colors: ['colors'],
      type: ['type'],
    }
    fixture.detectChanges()
    expect(component).toBeDefined()
  })

  it('on select option change', () => {
    fixture = TestBed.createComponent(FiltersComponent)
    component = fixture.componentInstance
    component.filterValues = {
      brand: ['brand', 'brand2'],
      colors: ['colors'],
      type: ['type'],
    }
    fixture.detectChanges()
    const vehicleStateService = ngMocks.findInstance(VehicleStateService)
    const vehicleStateServiceSpy = subscribeSpyTo(vehicleStateService.filterOptions)
    component.filterOptionsForm?.get('brand')?.setValue('brand2')
    fixture.detectChanges()
    const stateFilterValues = vehicleStateServiceSpy.getLastValue()
    if (stateFilterValues) {
      expect(stateFilterValues.brand).toBe('brand2')
    }
  })
})
