
export interface Country {
  id: string
  name: string
}

export interface City {
  id: string
  name: string
  state: State
}

export interface State {
  id ?: string
  name?: string
  country?: Country
}

export interface Airport {
  name: string
  city: City
}


///////////////////
export interface Plane{
  id: string
  name: string
}

export interface ScheduleContent {
  id: string
  airportDeparture: Airport
  airportArrival: Airport
  plane: Plane
}

export interface TableSearchFlight {
    id: string
    departureCityName: string
    arrivalCityName: string
    departureAirportName: string
    arrivalAirportName: string
    flightNumber: string
}

