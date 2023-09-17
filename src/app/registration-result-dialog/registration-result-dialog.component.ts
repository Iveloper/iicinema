import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-result-dialog',
  templateUrl: './registration-result-dialog.component.html',
  styleUrls: ['./registration-result-dialog.component.less']
})

export class RegistrationResultDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

}
