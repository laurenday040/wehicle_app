import { AppModule } from './../../app.module'
import { FILTER_OPTIONS_INSTANCE, ISelectedOptions } from './../../models/selected-options.interface'
import { VehicleStateService } from './../../services/state/vehicle-state.service'
import { TraficService } from './../../services/trafic/trafic.service'
import { ComponentFixture } from '@angular/core/testing'

import { ContainerComponent } from './container.component'
import { IVehicle } from 'src/app/models/vehicle.interface'
import { BehaviorSubject, Observable, of, Subscriber } from 'rxjs'
import { MockBuilder, MockRender } from 'ng-mocks'

import { subscribeSpyTo } from '@hirez_io/observer-spy'

describe('ContainerComponent', () => {
  const vehicles: IVehicle[] = [
    {
      id: 1,
      type: 'car',
      brand: 'Bugatti Veyron',
      colors: ['red', 'black'],
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg',
    },
    {
      id: 2,
      type: 'airplane',
      brand: 'Boeing 787 Dreamliner',
      colors: ['red', 'white', 'black', 'green'],
      img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg/600px-All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg',
    },
    {
      id: 3,
      type: 'train',
      brand: 'USRA 0-6-6',
      colors: ['yellow', 'white', 'black'],
      img: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/UP_4466_Neil916.JPG/600px-UP_4466_Neil916.JPG',
    },
  ]
  
  describe('On success data from TraficService', () => {
    let component: ContainerComponent
    let fixture: ComponentFixture<ContainerComponent>
    beforeEach(() =>
      MockBuilder(ContainerComponent, AppModule)
        .mock(TraficService, {
          fetchData: () => of(vehicles),
        })
        .mock(VehicleStateService, {
          filterOptions: new BehaviorSubject<ISelectedOptions>(FILTER_OPTIONS_INSTANCE()),
        })
    )

    beforeEach(() => {
      fixture = MockRender(ContainerComponent)
    })

    it('should create', () => {
      component = fixture.componentInstance
      expect(component).toBeDefined()
    })

    it('expect filter options to have values', () => {
      component = fixture.componentInstance
      if (component.data$) {
        const observerSpy = subscribeSpyTo(component.data$)
        const observerData = observerSpy.getFirstValue()
        expect(observerData.filters.brand.length).toBe(4)
        expect(observerData.filters.colors.length).toBe(6)
        expect(observerData.filters.type.length).toBe(4)
        observerSpy.unsubscribe()
      }
    })

    it('expect vehicle list to have values', () => {
      component = fixture.componentInstance
      if (component.data$) {
        const observerSpy = subscribeSpyTo(component.data$)
        const observerData = observerSpy.getFirstValue()
        expect(observerData.vehicles.length).toBe(3)
        observerSpy.unsubscribe()
      }
    })
  })
  
  describe('On success data from TraficService with specific filter', () => {
    let component: ContainerComponent
    let fixture: ComponentFixture<ContainerComponent>
    beforeEach(() =>
      MockBuilder(ContainerComponent, AppModule)
        .mock(TraficService, {
          fetchData: () => of(vehicles),
        })
        .mock(VehicleStateService, {
          filterOptions: new BehaviorSubject<ISelectedOptions>({
            type: 'car',
            brand: 'Bugatti Veyron',
            color: 'black',
          }),
        })
    )

    beforeEach(() => {
      fixture = MockRender(ContainerComponent)
    })

    it('should create', () => {
      component = fixture.componentInstance
      expect(component).toBeDefined()
    })

    it('expect filter options to have values', () => {
      component = fixture.componentInstance
      if (component.data$) {
        const observerSpy = subscribeSpyTo(component.data$)
        const observerData = observerSpy.getFirstValue()
        expect(observerData.filters.brand.length).toBe(2)
        expect(observerData.filters.colors.length).toBe(3)
        expect(observerData.filters.type.length).toBe(2)
        observerSpy.unsubscribe()
      }
    })

    it('expect vehicle list to have values', () => {
      component = fixture.componentInstance
      if (component.data$) {
        const observerSpy = subscribeSpyTo(component.data$)
        const observerData = observerSpy.getFirstValue()
        expect(observerData.vehicles.length).toBe(1)
        observerSpy.unsubscribe()
      }
    })
  })

  describe('On error data from TraficService', () => {
    let component: ContainerComponent
    let fixture: ComponentFixture<ContainerComponent>

    const observableError = new Observable((subscriber: Subscriber<IVehicle[]>) => {
      subscriber.error('Fetch data error')
    })

    beforeEach(() =>
      MockBuilder(ContainerComponent, AppModule)
        .mock(TraficService, {
          fetchData: () => observableError,
        })
        .mock(VehicleStateService, {
          
          filterOptions: new BehaviorSubject<ISelectedOptions>(FILTER_OPTIONS_INSTANCE()),
        })
    )

    beforeEach(() => {
      fixture = MockRender(ContainerComponent)
    })

    it('should create', () => {
      component = fixture.componentInstance
      expect(component).toBeDefined()
    })

    it('expect filter options values to be undefined', () => {
      component = fixture.componentInstance

      if (component.data$) {
        const observerSpy = subscribeSpyTo(component.data$)
        const observerData = observerSpy.getFirstValue()
        if (observerData) {
          expect(observerData).toBe(undefined)
          observerSpy.unsubscribe()
        }
      }
    })

    it('expect vehicle list to be undefined', () => {
      component = fixture.componentInstance
      if (component.data$) {
        const observerSpy = subscribeSpyTo(component.data$)
        const observerData = observerSpy.getFirstValue()
        expect(observerData).toBe(undefined)
        observerSpy.unsubscribe()
      }
    })

    it('should create', () => {
      component = fixture.componentInstance
      component.tryToRecconect();
      expect(component.data$).toBeDefined()
    })
  })
})
