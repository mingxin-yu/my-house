import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Room } from './room';
import { Furniture } from './furniture';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const rooms: Room[] = [
      { roomId: 1, name: 'Living Room' },
      { roomId: 2, name: 'Bed Room' },
    ];
    const furnitures: Furniture[] = [
      { furnitureId: 1, roomId: 1, name: 'Bed' },
      { furnitureId: 2, roomId: 1, name: 'Desk' },
      { furnitureId: 3, roomId: 0, name: 'TV' },
      { furnitureId: 4, roomId: 0, name: 'Sofa' },
    ];

    return {rooms, furnitures};
  }

  // Overrides the genRoomId method to ensure that a room always has an id.
  genRoomId(rooms: Room[]): number {
    return rooms.length > 0 ? Math.max(...rooms.map(room => room.roomId)) + 1 : 11;
  }
  // Overrides the genFurnitureId method to ensure that a furniture always has an id.
  genFurnitureId(furnitures: Furniture[]): number {
    return furnitures.length > 0 ? Math.max(...furnitures.map(furniture => furniture.furnitureId)) + 1 : 11;
  }
}
