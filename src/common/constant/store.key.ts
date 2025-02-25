import type { SelectedCity } from '../../context/setting.context'
import type { Todo } from '../../layouts/calendar/interface/todo.interface'
import type { FetchedCurrency } from '../../services/getMethodHooks/getCurrencyByCode.hook'
import type { FetchedWeather } from '../../services/getMethodHooks/weather/weather.interface'

export interface StorageKV {
  CURRENCIES: string[]
  hasShownPwaModal: boolean
  CURRENCY_UPDATED_AT: string
  SELECTED_CITY: SelectedCity
  CURRENT_WEATHER: FetchedWeather
  LAYOUT_ORDER: string[]
  Todos: Todo[]
  [key: `currency:${string}`]: FetchedCurrency
}
