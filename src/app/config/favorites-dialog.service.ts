import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FavoritesDialogComponent } from '../favorites-dialog/favorites-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class FavoritesDialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(message: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = message;
    const dialogRef = this.dialog.open(FavoritesDialogComponent, dialogConfig);

    setTimeout(() => {
      dialogRef.close();
    }, 2000); // Close the dialog after 2 seconds
  }
}
