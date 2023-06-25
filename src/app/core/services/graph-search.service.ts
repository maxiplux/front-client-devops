import { Injectable } from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {CityData, DataSchedule} from "../models/real.model";
import {map, Observable} from "rxjs";
import Swal from 'sweetalert2'



@Injectable({
  providedIn: 'root'
})
export class GraphSearchService {


  constructor(private apollo: Apollo) {}

  getCities():Observable<CityData>  {
  const cityQuery:string=`{findAllCities(page:0,size:5000){size,totalPages,number,first,empty,last,hasNext,hasPrevious,numberOfElements,content{id,name,state{id,name,country{id,name}}}}}`;
    return this.apollo
    .watchQuery<CityData>({
      query: gql`${cityQuery}`,
    })
    .valueChanges.pipe(map(result =>
      {
        return result.data;
      }
    ));
  }

  searchByCityDepartureAndCityArrival(departure:string,arrival:string,page:number):Observable<DataSchedule>
  {

    //Swal.fire('Any fool can use a computer')

    const querySearchByCityDepartureAndCityArrival:String=`{ findScheduleByCustomArguments(  queries: [{key:"airportArrival.city.name", value:"${arrival}"},{key:"airportDeparture.city.name", value:"${departure}"}]    page: ${page}    size: 100  ) {    numberOfElements,    totalElements,    totalPages,    content {departureDateTime,arrivalDateTime,plane{id,name},id,airportDeparture {name,city {name}      },airportArrival {name,city {name} } }  }}`;
    return this.apollo
    .watchQuery<DataSchedule>({
      query: gql`${querySearchByCityDepartureAndCityArrival}`,
    })
    .valueChanges.pipe(map(result =>
      {

        return result.data;
      }
    ));
  }

}
