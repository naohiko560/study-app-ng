import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { Tashizan1Component } from './components/tashizan1/tashizan1.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tashizan1', component: Tashizan1Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
