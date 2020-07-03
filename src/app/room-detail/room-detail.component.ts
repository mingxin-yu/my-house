import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { Furniture } from '../furniture';
import { FurnitureService } from '../furniture.service';
import { RoomService } from '../room.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  furnitures: Furniture[];
  room: Room;
  submitted = false;

  constructor(private route: ActivatedRoute,
              private furnitureService: FurnitureService,
              private roomService: RoomService) { }

  ngOnInit(): void {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.getRoom(id);
    this.getFurnituresByRoomId(id);
    console.log(this.furnitures);
  }

  getRoom(id: number): void {
    this.roomService.getRoom(id)
      .subscribe(room => this.room = room);
  }

  getFurnituresByRoomId(roomId: number){
    this.furnitureService.getFurnituresByRoomId(roomId).subscribe(furnitures => this.furnitures = furnitures);
  }

  update(): void {
    this.roomService.updateRoom(this.room).subscribe();
  }

  delete(id: number){
    for (const furniture of this.furnitures){
      furniture.roomId = 0;
    }
    for (const furniture of this.furnitures){
      this.furnitureService.updateFurniture(furniture).subscribe();
    }
    this.roomService.deleteRoom(id).subscribe();
  }

  onSubmit() { this.submitted = true; }

}
