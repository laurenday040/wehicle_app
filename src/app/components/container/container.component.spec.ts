import { VehicleStateService } from './../../services/state/vehicle-state.service'
import { TraficService } from './../../services/trafic/trafic.service'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ContainerComponent } from './container.component'

describe('ContainerComponent', () => {
  let component: ContainerComponent
  let fixture: ComponentFixture<ContainerComponent>

  let valueTraficServiceSpy: jasmine.SpyObj<TraficService>
  let valueVehicleStateServiceSpy: jasmine.SpyObj<VehicleStateService>

  beforeEach(async () => {
    const traficServiceSpy = jasmine.createSpyObj('TraficService', ['fetchData'])
    const vehicleStateServiceSpy = jasmine.createSpyObj('VehicleStateService', ['filterOptions'])

    await TestBed.configureTestingModule({
      declarations: [ContainerComponent],
      providers: [
        { provide: TraficService, useValue: traficServiceSpy },
        { provide: VehicleStateService, useValue: vehicleStateServiceSpy },
      ],
    }).compileComponents()

    valueTraficServiceSpy = TestBed.inject(TraficService) as jasmine.SpyObj<TraficService>
    valueVehicleStateServiceSpy = TestBed.inject(VehicleStateService) as jasmine.SpyObj<VehicleStateService>

    fixture = TestBed.createComponent(ContainerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
