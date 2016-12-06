/** Angular Dependencies */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/** Module Level Dependencies */
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthRoutingModule } from './auth-routes.module';

/** Module Definition */
@NgModule({
    imports: [RouterModule, AuthRoutingModule],
    exports: [],
    declarations: [AuthComponent],
    providers: [AuthService, AuthGuard,],
})
export class AuthModule { }
