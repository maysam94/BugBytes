import { Component, Input } from '@angular/core';
import { SdgInterface } from './interfaces/sdgInterface';

@Component({
  selector: 'app-sdg',
  templateUrl: './sdg.component.html',
  styleUrls: ['./sdg.component.css']
})
export class SdgComponent {
  @Input() sdgId!: SdgInterface["sdgId"];
  @Input() sdgName!: SdgInterface["sdgName"];
  @Input() sdgColor!: string;
}
