import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { Tashizan1Component } from './components/tashizan1/tashizan1.component';
import { Tashizan2Component } from './components/tashizan2/tashizan2.component';
import { Tashizan3Component } from './components/tashizan3/tashizan3.component';
import { Hikizan1Component } from './components/hikizan1/hikizan1.component';
import { Hikizan2Component } from './components/hikizan2/hikizan2.component';
import { Hikizan3Component } from './components/hikizan3/hikizan3.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tashizan1', component: Tashizan1Component },
  { path: 'tashizan2', component: Tashizan2Component },
  { path: 'tashizan3', component: Tashizan3Component },
  { path: 'hikizan1', component: Hikizan1Component },
  { path: 'hikizan2', component: Hikizan2Component },
  { path: 'hikizan3', component: Hikizan3Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
