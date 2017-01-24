import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing } from './features.routes';
import { AuthModule } from './core/auth/auth.module';
import { DashboardModule } from './core/dashboard/dashboard.module';
import { CorporateModule } from './corporate/index';
@NgModule({
    imports: [
        AuthModule,
        DashboardModule,
        routing,
        FormsModule,
        CorporateModule
    ],
    exports: [],
    providers: [],
})
export class FeaturesModule { }
