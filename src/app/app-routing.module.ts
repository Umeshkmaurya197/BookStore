import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { OrderPlacedComponent } from './Components/order-placed/order-placed.component';

const routes: Routes = [{path:'',redirectTo:'/dashboard',pathMatch:'full'},
                        {path:'dashboard',component:DashboardComponent},
                        {path:'cart',component:CartComponent},
                        {path:'order-placed',component:OrderPlacedComponent}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
