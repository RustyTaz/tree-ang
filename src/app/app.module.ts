import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TreeListComponent } from './tree-list/tree-list.component';
import { TreeUniComponent } from './tree-uni/tree-uni.component';
import { TreeComponent } from './tree/tree.component';
import { TreeItemComponent } from './tree/tree-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeListComponent,
    TreeUniComponent,
    TreeComponent,
    TreeItemComponent
  ],
  imports: [
    BrowserModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
