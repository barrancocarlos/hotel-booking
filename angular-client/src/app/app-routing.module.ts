import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListRoomsComponent } from './components/list-rooms/list-rooms.component';
import { SingleRoomComponent } from './components/single-room/single-room.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'rooms',
    component: ListRoomsComponent
  },
  {
    path: 'room:id',
    component: SingleRoomComponent
  },
  {
    path: 'search-results',
    component: SearchResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
