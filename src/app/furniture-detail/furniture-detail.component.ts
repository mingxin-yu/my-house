import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Furniture } from '../furniture';
import { FurnitureService } from '../furniture.service';
import { RoomService } from '../room.service';
import { Room } from '../room';

/**
 * Display detailed information of a single furniture
 * Allow change name and room for current furniture or delete the furniture
 */
@Component({
  selector: 'app-furniture-detail',
  templateUrl: './furniture-detail.component.html',
  styleUrls: ['./furniture-detail.component.css']
})
export class FurnitureDetailComponent implements OnInit {
  furniture: Furniture;
  rooms: Room[];
  submitted = false;

  constructor(private route: ActivatedRoute,
              private furnitureService: FurnitureService,
              private roomService: RoomService) {}

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.getFurniture(id);
    this.getRooms();
  }

  getFurniture(id: number): void {
    this.furnitureService.getFurniture(id)
      .subscribe(furniture => this.furniture = furniture);
  }

  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }

  update(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.furnitureService.updateFurniture(this.furniture).subscribe();
  }

  delete(id: number): void {
    this.furnitureService.deleteFurniture(id).subscribe();
  }

  onSubmit() { this.submitted = true; }
}
