import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { GameService } from '../services/game.service';
import { delay } from 'rxjs/operators';
import {IconName, IconPrefix, IconProp} from "@fortawesome/fontawesome-svg-core";


@Component({
  selector: 'memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss']
})
export class MemoryCardComponent implements OnInit, DoCheck {

  constructor(private gameService: GameService) { }

  @Input() type: string = null;
  @Input() code: string = null;
  @Input() id: number;

  icon = [this.type, this.code] as IconProp;
  isRotated: boolean;

  ngOnInit(): void {
    this.gameService.getCoveredCards().subscribe(r=>r.map(v=>this.isRotated=(v.id==this.id)?false:this.isRotated));
  }

  ngDoCheck(): void {
    this.icon = [this.type as IconPrefix, this.code as IconName];
  }

  undo() {
    this.isRotated = false;
  }

  onClick() {
    this.isRotated = true;
    this.gameService.controlCards({ id: this.id, code: this.code, type: this.type });
  }

}
