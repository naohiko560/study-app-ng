import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { Tashizan1Component } from './components/tashizan1/tashizan1.component';
import { Tashizan2Component } from './components/tashizan2/tashizan2.component';
import { Tashizan3Component } from './components/tashizan3/tashizan3.component';
import { TashizanDojoComponent } from './components/tashizan-dojo/tashizan-dojo.component';
import { TashizanDojo2Component } from './components/tashizan-dojo2/tashizan-dojo2.component';
import { Hikizan1Component } from './components/hikizan1/hikizan1.component';
import { Hikizan2Component } from './components/hikizan2/hikizan2.component';
import { Hikizan3Component } from './components/hikizan3/hikizan3.component';
import { HikizanDojoComponent } from './components/hikizan-dojo/hikizan-dojo.component';
import { HikizanDojo2Component } from './components/hikizan-dojo2/hikizan-dojo2.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tashizan1', component: Tashizan1Component },
  { path: 'tashizan2', component: Tashizan2Component },
  { path: 'tashizan3', component: Tashizan3Component },
  { path: 'tashizan-dojo', component: TashizanDojoComponent },
  { path: 'tashizan-dojo2', component: TashizanDojo2Component },
  { path: 'hikizan1', component: Hikizan1Component },
  { path: 'hikizan2', component: Hikizan2Component },
  { path: 'hikizan3', component: Hikizan3Component },
  { path: 'hikizan-dojo', component: HikizanDojoComponent },
  { path: 'hikizan-dojo2', component: HikizanDojo2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
