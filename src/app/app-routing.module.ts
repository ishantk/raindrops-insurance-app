import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { PlansComponent } from './pages/plans/plans.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full'
   },
  { 
    path: 'home', 
    component: HomeComponent, 
   },
   { 
    path: 'about', 
    component: AboutComponent
   },
  {
    path : 'contact',
    component: ContactComponent
  },
  {
    path : 'plans',
    component: PlansComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
