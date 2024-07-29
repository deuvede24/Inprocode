import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { FullcalendarComponent } from './components/fullcalendar/fullcalendar.component';
import { ChartsComponent } from './components/charts/charts.component';
import { UsersComponent } from './components/users/users.component';
import { UserListComponent } from './components/user-list/user-list.component'; // Importar UserListComponent

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'fullcalendar', component: FullcalendarComponent },
  { path: 'charts', component: ChartsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user-list', component: UserListComponent } // Añadir UserListComponent a las rutas
];
