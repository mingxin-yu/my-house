import { Component } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})

/**
 * Display a view of create room feature
 * Take a name of a room and add to the room list
 */
export class RoomCreateComponent {
  constructor(private roomService: RoomService) { }
  sampleRoom = 'Living Room';
  submitted = false;

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.roomService.addRoom( {name} as Room ).subscribe();
  }

  onSubmit() { this.submitted = true; }
}
