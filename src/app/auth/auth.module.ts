import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        SignUpComponent,
        SignInComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        AuthRoutingModule
    ]
})
export class AuthModule {}