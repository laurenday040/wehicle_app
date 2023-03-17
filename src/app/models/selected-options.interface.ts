import { ALL } from './../consts/filter.const'
export interface ISelectedOptions {
  type: string
  brand: string
  color: string
}

export const FILTER_OPTIONS_INSTANCE = (): ISelectedOptions => {
  return { type: ALL.key, brand: ALL.key, color: ALL.key }
}
