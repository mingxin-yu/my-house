import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomCreateComponent } from './room-create/room-create.component';
import { FormsModule } from '@angular/forms';
import { FurnituresComponent } from './furnitures/furnitures.component';
import { FurnitureCreateComponent } from './furniture-create/furniture-create.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FurnitureDetailComponent } from './furniture-detail/furniture-detail.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RoomDetailComponent } from './room-detail/room-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    RoomCreateComponent,
    FurnituresComponent,
    FurnitureCreateComponent,
    PageNotFoundComponent,
    FurnitureDetailComponent,
    RoomDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    ),
    FormsModule,
    RouterModule.forRoot([
      {path: 'rooms', component: RoomsComponent},
      {path: 'room/:id', component: RoomDetailComponent },
      {path: 'furnitures', component: FurnituresComponent},
      {path: 'room_create', component: RoomCreateComponent},
      {path: 'furniture/:id', component: FurnitureDetailComponent },
      {path: 'furniture_create', component: FurnitureCreateComponent},
      {path: '', redirectTo: '/rooms', pathMatch: 'full'},
      {path: '**', component: PageNotFoundComponent}
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
