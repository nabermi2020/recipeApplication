import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { ShoppingListReducer } from './shopping-list/store/shopping-list.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot({shoppingList: ShoppingListReducer}),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
