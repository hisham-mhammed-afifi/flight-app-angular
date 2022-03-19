import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { FlightCriteria } from '../../models/flightCriteria';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
})
export class SearchFormComponent implements OnInit {
  searchFlightForm: FormGroup;

  showBack = true;
  showConnection = true;

  company: string;
  flightType: string;
  tripType: string;

  @Output() onSearch = new EventEmitter<FlightCriteria>();

  timeTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#3f51b5',
      buttonColor: '#fff',
    },
    dial: {
      dialBackgroundColor: '#b2cdd7',
      dialEditableBackgroundColor: '#000',
    },
    clockFace: {
      clockFaceBackgroundColor: '#F1F1F1',
      clockHandColor: '#3f51b5',
      clockFaceTimeInactiveColor: '#000000',
    },
  };
  constructor(private readonly sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.createSearchCriteresForm();
    this.searchFlightForm = this.sharedService.searchCriteresForm;
  }

  selectedTripType(value) {
    this.tripType = value;
    if (value === 'ONEWAYTICKET') {
      this.showBack = false;
    } else {
      this.showBack = true;
    }
  }
  selectedFlightType(value) {
    this.flightType = value;
    if (value === 'DIRECT') {
      this.showConnection = false;
    } else {
      this.showConnection = true;
    }
  }
  selectedCompanyName(value) {
    this.company = value;
  }

  searchFlights() {
    const searchFlightValues = this.searchFlightForm.value;
    searchFlightValues.company = this.company;
    searchFlightValues.flightType = this.flightType;
    searchFlightValues.travelType = this.tripType;
    this.onSearch.emit(searchFlightValues);
  }

  resetForm(form: FormGroup) {
    form.reset();
  }
}
