import { Component, OnInit } from '@angular/core';
import {FurnitureService} from '../furniture.service';
import {Furniture} from '../furniture';
import {Room} from '../room';
import {RoomService} from '../room.service';

@Component({
  selector: 'app-furniture-create',
  templateUrl: './furniture-create.component.html',
  styleUrls: ['./furniture-create.component.css']
})

/**
 * Display a view of create furniture feature
 * Take a name of a furniture and add to the furniture list
 */
export class FurnitureCreateComponent implements OnInit {
  constructor(private furnitureService: FurnitureService,
              private roomService: RoomService) {}
  furnitureName;
  // Set default roomId for new furniture as 0 (Not belongs to any room)
  roomId = 0;
  rooms: Room[];
  submitted = false;
  ngOnInit() {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }

  add(name: string, roomId: number): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.furnitureService.addFurniture({name, roomId} as Furniture).subscribe();
  }
  onSubmit() { this.submitted = true; }
}
