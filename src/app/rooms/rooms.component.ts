import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room.service';

/**
 * Display the overview of each room with it's id.
 * Support the functionality of navigating to detailed view of each room after clicking.
 */
@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})

export class RoomsComponent implements OnInit {
  rooms: Room[];
  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }
}
