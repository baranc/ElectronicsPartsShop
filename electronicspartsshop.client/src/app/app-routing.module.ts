import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ShopComponent } from './shop/ShopComponent';

const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'admin', component: AdminPanelComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
