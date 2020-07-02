import { Component, OnInit } from '@angular/core';
import { Furniture } from '../furniture';
import { FurnitureService } from '../furniture.service';

/**
 * Display the overview of each furniture with it's id.
 * Support the functionality of navigating to detailed view of each furniture after clicking.
 */
@Component({
  selector: 'app-furnitures',
  templateUrl: './furnitures.component.html',
  styleUrls: ['./furnitures.component.css']
})
export class FurnituresComponent implements OnInit {
  furnitures: Furniture[];
  constructor(private furnitureService: FurnitureService) { }

  ngOnInit() {
    this.getFurnitures();
  }

  getFurnitures(): void {
    this.furnitureService.getFurnitures()
      .subscribe(furnitures => this.furnitures = furnitures);
  }
}
