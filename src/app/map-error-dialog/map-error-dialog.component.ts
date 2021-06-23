import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {MapWarning} from "../map/models/map-warning";

@Component({
  selector: 'app-map-error-dialog',
  templateUrl: './map-error-dialog.component.html',
  styleUrls: ['./map-error-dialog.component.css']
})
export class MapErrorDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: MapWarning) { }

  ngOnInit(): void {
  }

}
