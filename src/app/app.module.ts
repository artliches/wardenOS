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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CbRedMockComponent } from './cb-red-mock/cb-red-mock.component';
import { AddCustomComponent } from './add-custom/add-custom.component';
import { FunnelComponent } from './funnel/funnel.component';

@NgModule({
  declarations: [
    AppComponent,
    SpaceStationGeneratorComponent,
    TrinketGeneratorComponent,
    PatchGeneratorComponent,
    GenericRandomSearchComponent,
    ShipGeneratorComponent,
    CharacterGeneratorComponent,
    CbRedMockComponent,
    AddCustomComponent,
    FunnelComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
