import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [AppRoutingModule, ComponentsModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
