import { IVehicle } from './../../models/vehicle.interface'
import { Component,  Input,  } from '@angular/core'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() vehicle: IVehicle | undefined

  onImageError(event: any) {
    let htmlElement: HTMLImageElement = event.target
    htmlElement.src = './assets/img/not-found.png'
    htmlElement.style.width = '100px'
    htmlElement.style.height = '100px'
    htmlElement.style.margin = 'auto'
    htmlElement.style.marginTop = '4rem'
    htmlElement.style.marginBottom = '4rem'
  }
}
