import { City, ScheduleContent} from "./base.models";



export interface CityData {
  findAllCities: FindAllCities
}

export interface FindAllCities {
  size: number
  totalPages: number
  number: number
  first: boolean
  empty: boolean
  last: boolean
  hasNext: any
  hasPrevious: any
  numberOfElements: number
  content: City[]
}

export interface DataSchedule {
  findScheduleByCustomArguments: FindScheduleByCustomArguments
}

export interface FindScheduleByCustomArguments {
  size: number
  totalPages: number
  number: number
  totalElements: number
  first: boolean
  empty: boolean
  last: boolean
  hasNext: any
  hasPrevious: any
  numberOfElements: number
  content: ScheduleContent[]
}

