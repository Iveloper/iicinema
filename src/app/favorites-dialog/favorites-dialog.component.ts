import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-favorites-dialog',
  templateUrl: './favorites-dialog.component.html',
  styleUrls: ['./favorites-dialog.component.less'],
})
export class FavoritesDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
