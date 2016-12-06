/** Angular Dependencies */
import { NgModule } from '@angular/core';

/** Module Level Dependencies*/
import { DashboardComponent } from './components/dashboard.component';
import { DashboardContainerComponent } from './components/container.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopNavigationBarComponent } from './layout/top-navigation-bar/top-navigation-bar.component';
import { CommonModule } from '../shared/common.module';

/** Module Definition */
@NgModule({
    //imports: [CommonModule, TranslateModule],
    imports: [CommonModule],
    exports: [],
    declarations: [
        DashboardContainerComponent,
        DashboardComponent,
        FooterComponent,
        TopNavigationBarComponent,
        SidebarComponent
    ],
    providers: [],
})
export class DashboardModule { }
