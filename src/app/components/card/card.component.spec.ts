import { style } from '@angular/animations'
import { AppModule } from './../../app.module'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks'
import { CardComponent } from './card.component'

describe('CardComponent', () => {
  let component: CardComponent
  let fixture: ComponentFixture<CardComponent>

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent)
  })

  it('should create', () => {
    component = fixture.componentInstance
    expect(component).toBeTruthy()
  })

  it('should use onImageError', () => {
    component = fixture.componentInstance
    const mock = {
      target: {
        src: '',
        style: {
          width: '',
          height: '',
          margin: '',
        },
      },
    }
    const onImageErrorSpy = jest.spyOn(component,'onImageError')
    component.onImageError(mock)
    expect(onImageErrorSpy).toHaveBeenCalledWith(mock)
  })
})
