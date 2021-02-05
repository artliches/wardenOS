import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SpaceStationGeneratorComponent } from './space-station-generator/space-station-generator.component';
import { TrinketGeneratorComponent } from './trinket-generator/trinket-generator.component';
import { PatchGeneratorComponent } from './patch-generator/patch-generator.component';
import { GenericRandomSearchComponent } from './generic-random-search/generic-random-search.component';
import { ShipGeneratorComponent } from './ship-generator/ship-generator.component';
import { CharacterGeneratorComponent } from './character-generator/character-generator.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    SpaceStationGeneratorComponent,
    TrinketGeneratorComponent,
    PatchGeneratorComponent,
    GenericRandomSearchComponent,
    ShipGeneratorComponent,
    CharacterGeneratorComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
