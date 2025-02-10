import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { TabBarPage } from './tab-bar.page';

const routes: Routes = [
  {
    path: '',
    component: TabBarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabBarPageRoutingModule {}
