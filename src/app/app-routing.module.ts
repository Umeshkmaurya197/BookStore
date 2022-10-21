import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { OrderPlacedComponent } from './Components/order-placed/order-placed.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [{path:'',redirectTo:'/dashboard',pathMatch:'full'},
                        {path:'dashboard',component:DashboardComponent},
                        {path:'login',component:LoginComponent},
                        {path:'cart',component:CartComponent},
                        {path:'order-placed',component:OrderPlacedComponent},
                        {path:'order-placed/:Id',component:OrderPlacedComponent},
                        {path:'wishlist',component:WishlistComponent}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
