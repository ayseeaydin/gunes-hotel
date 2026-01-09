import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getRoomsData } from '@data/rooms'

/**
 * Custom hook to get translated rooms data
 * @returns {Array} Translated rooms with localized names, descriptions and features
 */
export const useRooms = () => {
  const { t } = useTranslation()

  const rooms = useMemo(() => {
    return getRoomsData(t).map(room => ({
      ...room,
      name: t(room.nameKey),
      description: t(room.descKey),
      features: room.features.map(feature => ({
        icon: feature.icon,
        text: feature.count 
          ? `${feature.count} ${t(feature.textKey)}`
          : t(feature.textKey)
      }))
    }))
  }, [t])

  return rooms
}
