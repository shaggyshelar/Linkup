import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routing } from './features.routes';
import { AuthModule } from './core/auth/auth.module';
import { DashboardModule } from './core/dashboard/dashboard.module';
@NgModule({
    imports: [
        AuthModule,
        DashboardModule,
        routing,
        FormsModule
    ],
    exports: [],
    providers: [],
})
export class FeaturesModule { }
