import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './guards/admin.guard';
import { authenticationGuard } from './guards/authentication.guard';
import { MoviecarddetailsComponent } from './components/moviecarddetails/moviecarddetails.component';
import { MoviesListComponent } from './components/admin/movies-list/movies-list.component';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authenticationGuard],
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'dashboard/Movielist',
    component: MoviesListComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'home/movie/:id',
    component: MoviecarddetailsComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'home/searchmovie',
    component: SearchMoviesComponent,
    canActivate: [authenticationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
