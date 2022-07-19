import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { HeaderComponent } from './components/header/header.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HighlightDirective } from './directives/highlight.directive';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TokenService } from './services/token.service';
import {MatSelectModule} from '@angular/material/select';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { InputDialogComponent } from './components/input-dialog/input-dialog.component';
import { CustomMatIconComponent } from './components/custom-mat-icon/custom-mat-icon.component';


@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    HeaderComponent,
    HighlightDirective,
    AlertDialogComponent,
    MenuItemComponent,
    SideNavComponent,
    CustomInputComponent,
    InputDialogComponent,
    CustomMatIconComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule
  ],
  exports:[
    ButtonComponent,
    InputComponent,
    HighlightDirective,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    HeaderComponent,
    AlertDialogComponent,
    SideNavComponent,
    CustomInputComponent,
    InputDialogComponent,
    CustomMatIconComponent
  ]
})
export class SharedModule { }
