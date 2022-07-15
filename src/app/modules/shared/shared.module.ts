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


@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    HeaderComponent,
    HighlightDirective,
    AlertDialogComponent,
    MenuItemComponent,
    SideNavComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
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
  ]
})
export class SharedModule { }
