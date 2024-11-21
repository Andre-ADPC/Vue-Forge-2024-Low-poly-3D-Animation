// NOTE: Use: 
// import { useSettingsStore } from '@/pinia_stores/useSettingsStore'
// for all imports.
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
      isModalOpen: false, // Modal state
      showAll: true, // Master visibility toggle
      visibility: {
        coordinates: true,
        airplane: true,
        clouds: true,
        planet: true,
        airplaneAxes: false,
        planetAxes: false,
      },
      rotationSpeed: 0.1, // Adjustable parameters
      airplaneDistance: 5.0,
    }),
    actions: {
      toggleModal() {
        this.isModalOpen = !this.isModalOpen
      },
      setMasterVisibility(newValue: boolean) {
        this.showAll = newValue
        Object.keys(this.visibility).forEach((key) => {
          this.visibility[key as keyof typeof this.visibility] = newValue
        })
      },
      resetSettings() {
        this.showAll = true
        this.visibility = {
          coordinates: true,
          airplane: true,
          clouds: true,
          planet: true,
          airplaneAxes: false,
          planetAxes: false,
        }
        this.rotationSpeed = 0.1
        this.airplaneDistance = 5.0
      },
    },
  })
