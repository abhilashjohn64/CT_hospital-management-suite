import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router : Router, public dialog: MatDialog) { }
  @Output() logOut = new EventEmitter();
  ngOnInit(): void {
  }
  onLogOut(){
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      width: '300px',
      data: { dialogTitle: 'Logout', dialogContent: 'Are you sure ?' },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        window.localStorage.clear();
        this.router.navigate([""])
      }
    });

  }
}
