import { ALL } from './../consts/filter.const'
export interface ISelectedOptions {
  type: string
  brand: string
  color: string
}

export const FILTER_OPTIONS_INSTANCE = (): ISelectedOptions => {
  return { type: ALL, brand: ALL, color: ALL }
}
