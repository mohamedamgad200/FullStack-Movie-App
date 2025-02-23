import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeComponent } from './components/home/home.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { MoviecardComponent } from './components/moviecard/moviecard.component';
import { MatIconModule } from '@angular/material/icon';
import { MoviecarddetailsComponent } from './components/moviecarddetails/moviecarddetails.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { tokenHttpInterceptor } from './core/token-http.interceptor';
import { MoviesListComponent } from './components/admin/movies-list/movies-list.component';
import { SideBarComponent } from './components/admin/side-bar/side-bar.component';
import { ManageMovieCardComponent } from './components/admin/manage-movie-card/manage-movie-card.component';
import { SideBarUserComponent } from './components/side-bar-user/side-bar-user.component';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';
import { RateDialogComponent } from './components/rate-dialog/rate-dialog.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSliderModule } from '@angular/material/slider';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MoviecardComponent,
    MoviecarddetailsComponent,
    AdminDashboardComponent,
    MoviesListComponent,
    SideBarComponent,
    ManageMovieCardComponent,
    SideBarUserComponent,
    SearchMoviesComponent,
    RateDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    MatButtonModule,
    MatIconButton,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatSnackBarModule,
    MatPaginatorModule,
  ],
  providers: [provideHttpClient(withInterceptors([tokenHttpInterceptor]))],
  bootstrap: [AppComponent],
})
export class AppModule {}
