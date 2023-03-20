import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'

import { MockBuilder } from 'ng-mocks'
import { AppComponent } from './app.component'
import { AppModule } from './app.module'

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  

  beforeEach(waitForAsync (() => {
    return MockBuilder(AppComponent, AppModule)
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;    
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })
})
