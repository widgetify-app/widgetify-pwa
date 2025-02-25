import { DragDropContext, Draggable, type DropResult, Droppable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { RxDragHandleDots2 } from 'react-icons/rx'

import { getFromStorage, setToStorage } from '../common/storage'
import { storeContext } from '../context/setting.context'
import { ArzLiveLayout } from '../layouts/arzLive/arzLive.layout'
import CalendarLayout from '../layouts/calendar/calendar'
import { WeatherLayout } from '../layouts/weather/weather.layout'

type LayoutItem = {
  id: string
  component: React.ReactNode
}

export function HomePage() {
  const defaultCurrencies = ['USD', 'EUR', 'GRAM']
  const storedCurrencies = getFromStorage('CURRENCIES')
  const [selectedCurrencies, setSelectedCurrencies] = useState(
    storedCurrencies && storedCurrencies.length > 0 ? storedCurrencies : defaultCurrencies
  )

  const city = getFromStorage('SELECTED_CITY')
  const [selectedCity, setSelectedCity] = useState(
    city || {
      city: 'Tehran',
      lat: 35.6892523,
      lon: 51.3896004
    }
  )

  const initialLayouts: LayoutItem[] = [
    {
      id: 'arz-live',
      component: <ArzLiveLayout />
    },
    {
      id: 'weather',
      component: <WeatherLayout />
    },
    {
      id: 'calendar',
      component: <CalendarLayout />
    }
  ]

  const storedOrder = getFromStorage('LAYOUT_ORDER')
  const [layouts, setLayouts] = useState(() => {
    if (storedOrder) {
      return storedOrder
        .map(id => initialLayouts.find(layout => layout.id === id))
        .filter((layout): layout is LayoutItem => layout !== undefined)
    }
    return initialLayouts
  })

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) return

    const items = Array.from(layouts)
    const [reorderedItem] = items.splice(source.index, 1)
    items.splice(destination.index, 0, reorderedItem)

    setLayouts(items)
    setToStorage(
      'LAYOUT_ORDER',
      items.map(item => item.id)
    )
  }

  useEffect(() => {
    setToStorage('CURRENCIES', selectedCurrencies)
  }, [selectedCurrencies])

  return (
    <storeContext.Provider
      value={{
        selectedCurrencies,
        setSelectedCurrencies,
        selectedCity,
        setSelectedCity
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='layouts'>
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef} className='space-y-4'>
              {layouts.map((layout, index) => (
                <Draggable key={layout.id} draggableId={layout.id} index={index}>
                  {provided => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <div {...provided.dragHandleProps} className='p-2 cursor-move w-60'>
                        <RxDragHandleDots2 className='text-gray-700 dark:text-gray-300' size={20} />
                      </div>
                      <div>
                        <div>{layout.component}</div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </storeContext.Provider>
  )
}
