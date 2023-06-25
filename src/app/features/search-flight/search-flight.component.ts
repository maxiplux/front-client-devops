import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";
import {Apollo, gql} from "apollo-angular";
import {GraphSearchService} from "../../core/services/graph-search.service";
import {CityData, DataSchedule, FindScheduleByCustomArguments} from "../../core/models/real.model";
import {City, ScheduleContent, TableSearchFlight} from "../../core/models/base.models";
import {FormBuilder, Validators} from "@angular/forms";
import {DataTableDirective} from "angular-datatables";
import {Subject} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";
import Swal from "sweetalert2";

interface DataTablesAjaxType {
  columns:[];
  draw:number;
  length:number;
  order:[];
  search:any;
  start:number;}
@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html'
})
export class SearchFlightComponent implements  OnInit {







  pageNumber:number=0;




  private columnDefinition=[       { title: 'ID',data: 'id'},
    { title: 'Departure City',data: 'departureCityName'},
    { title: 'Arrival City',data: 'arrivalCityName'},
    { title: 'Departure Airport',data: 'departureAirportName'},

    { title: 'Arrival Airport',data: 'arrivalAirportName'},
    { title: 'Flight Number',data: 'flightNumber'},
    { title: 'Get My ticket',data: 'actionComponent'},

  ];
  private tableConfig={columns: this.columnDefinition, bDestroy:true,pagingType:"simple",lengthChange:false,searching:false,info:false,pageLength:10,serverSide:true,processing:true,columnDefs:[{"defaultContent": "-","targets": "_all"}]};
  cities: City[] = [];
  SearchForm = this.fb.group({    cityDeparture: ['', [Validators.required]],    cityArrival: ['', [Validators.required]]  });

  constructor(private apollo: Apollo, private graphSearchService:GraphSearchService, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadCities();

  }


  onSubmit() {
    //

    this.stopOrStartSpinner();

    this.graphSearchService.searchByCityDepartureAndCityArrival(this.SearchForm.value.cityDeparture||'',this.SearchForm.value.cityArrival||'',this.pageNumber).subscribe(
      (response:DataSchedule)=>
    {
      $('#myTable').DataTable({ ...this.tableConfig, ajax:(data:any, callback, settings)=>{
        this.pageNumber= Math.ceil(data.start / data.length );
        const contentToDraw:TableSearchFlight[]= response.findScheduleByCustomArguments.content.map((scheduleContent:ScheduleContent)=>this.transformFromScheduleContentToTableSearchFlight(scheduleContent));

        const result= {recordsTotal: response.findScheduleByCustomArguments.totalElements,recordsFiltered: response.findScheduleByCustomArguments.numberOfElements,data: contentToDraw};
        callback(result);
        this.stopOrStartSpinner(false);



        }});

    });



  }
  createTicket($event:any):void
  {
    debugger;
    Swal.fire(`Ticket created! `);
  }

  private transformFromScheduleContentToTableSearchFlight(scheduleContent:ScheduleContent):TableSearchFlight{


    const baseObject={id: scheduleContent.id,
      departureCityName: scheduleContent.airportDeparture.city.name,
      arrivalCityName: scheduleContent.airportArrival.city.name,
      departureAirportName: scheduleContent.airportDeparture.name,
      arrivalAirportName: scheduleContent.airportArrival.name,
      flightNumber: scheduleContent.plane.name};
    return {
      ...baseObject,
      actionComponent: `<button class="btn btn-primary"   onclick='createTicket({arrivalDateTime:"${scheduleContent.arrivalDateTime}",departureDateTime:"${scheduleContent.departureDateTime}",flightNumber:"${scheduleContent.plane.name}",id:${scheduleContent.id},departureAirportName:"${scheduleContent.airportDeparture.name}",arrivalAirportName:"${scheduleContent.airportArrival.name.replace("'",'`')}", email:"IamARealCustomer@email.com"})' >Get This fligh!</button>`
    };
  }




  private stopOrStartSpinner(forceStop:boolean = true){
    if(forceStop){
      Swal.fire('Please wait');
      Swal.showLoading()
    }
    else{
      Swal.close();
    }

  }

  private loadCities() {
    this.stopOrStartSpinner();
    this.graphSearchService.getCities().subscribe((response:CityData) => {
      this.cities = response.findAllCities.content;
      this.stopOrStartSpinner(false);
    });
  }
}
