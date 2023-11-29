import { LayoutRoutingModule } from './layout.routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [NavComponent, SidenavComponent, LayoutComponent],
  imports: [CommonModule, LayoutRoutingModule],
  exports: [NavComponent, SidenavComponent],
})
export class LayoutModule {}
