import {Component, OnInit} from '@angular/core';
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";
import {Apollo, gql} from "apollo-angular";

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
export class SearchFlightComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  //https://l-lin.github.io/angular-datatables/#/basic/with-ajax
  //https://l-lin.github.io/angular-datatables/#/basic/new-server-side
  private data: any = {};

  constructor(private apollo: Apollo) {}


  ngOnInit(): void {
    debugger;
    const query = `query ExampleQuery {
  company {
    ceo
  }
  roadster {
    apoapsis_au
  }
  capsulesUpcoming {
    id
    landings
    missions {
      name
    }
  }
  rockets {
    country
    cost_per_launch
    company
    boosters
    active
    first_flight
    first_stage {
      burn_time_sec
      engines
    }
  }
}`;
    this.apollo
    .watchQuery({
      query: gql`${query}`,
    })
    .valueChanges.subscribe((result: any) => {
      console.table(result);
      debugger;
      this.data = result.data || {};


    });

    const columnDefinition=[{data:'departureCityName'},{data:'arrivalCityName'}];

    this.dtOptions = {
      destroy: true,
      lengthChange : false,
      processing: true,
      serverSide: true,
      columnDefs: [{defaultContent: "-", targets: "_all"}],
      ordering: false, searching: false,  info: true, paging: true, pagingType: "full",
      ajax: function (data:any, callback, settings) {

        const sigma= {departureCityName: "Mumbai", arrivalCityName:"Delhi"};
        const pageNumber = Math.ceil(data.start / data.length );
        const url=`assets/data/data.json?page=${pageNumber}&size=10`;


        const result=
          { recordsTotal: 100,
          recordsFiltered: 3,
          data: [sigma,sigma,sigma],
            }
        callback( result);
      },
      columns: columnDefinition
    };
  }

}
