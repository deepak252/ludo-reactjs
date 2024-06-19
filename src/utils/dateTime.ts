declare global {
  interface Date {
    /**
     *  eg. Janury, February,...
     */
    getMonthString(): string
    /**
     *  eg. January 2024
     */
    getMonthYearString(): string
    /**
     *  eg. jan 2024
     */
    getMonthYearShort(): string
    /**
     *  eg. Sunday, Monday,...
     */
    getWeekdayString(): string
    /**
     *  eg. 2024-04-29
     */
    formatDateY4M2D2(): string
    /**
     *  eg. 04 Apr 2024
     */
    formatDateD2M3Y4(): string

    /**
     *  eg. 2024-04-04 to Apr 04, 2024
     */
    formatDateM3D2Y4(): string

    /**
     *  eg. 1st, 2nd, 3rd, ...
     */
    getOridinalDate(): string

    getAge(): number
  }
}

Date.prototype.getMonthString = function (): string {
  return this.toLocaleString('default', { month: 'long' })
}

Date.prototype.getMonthYearString = function (): string {
  return `${this.getMonthString()} ${this.getFullYear()}`
}

Date.prototype.getMonthYearShort = function (): string {
  return `${this.getMonthString().toLowerCase().slice(0, 3)} ${this.getFullYear()}`
}

Date.prototype.getWeekdayString = function (): string {
  return this.toLocaleString('default', { weekday: 'long' })
}

Date.prototype.formatDateY4M2D2 = function (): string {
  const y = this.getFullYear()
  const m = this.getMonth() + 1
  const d = this.getDate()
  return `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`
}

Date.prototype.formatDateD2M3Y4 = function (): string {
  const day = this.toLocaleString('default', { day: '2-digit' })
  const month = this.toLocaleString('default', { month: 'short' })
  const year = this.toLocaleString('default', { year: 'numeric' })
  return `${day} ${month} ${year}`
}

Date.prototype.formatDateM3D2Y4 = function (): string {
  return this.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

Date.prototype.getOridinalDate = function (): string {
  return oridinalDate(this.getDate())
}

Date.prototype.getAge = function () {
  const today = new Date()
  let age = today.getFullYear() - this.getFullYear()
  const m = today.getMonth() - this.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < this.getDate())) {
    age--
  }
  return age
}

export const monthsLong = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const monthsShort = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]

/**
 *  eg. 22:00:00 to 10:00 PM
 */
export const formatTime = (timeStr: string) => {
  const date = new Date(`2000-01-01T${timeStr}`)

  const hours = date.getHours()
  const minutes = date.getMinutes()

  const amOrPm = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12

  return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${amOrPm}`
}

/**
 *  eg. 22:00:00 - 23:30:00 -> 90
 */
export const getMinutesDiff = (startTime: string, endTime: string) => {
  const startDate = new Date(`2000-01-01T${startTime}`)
  const endDate = new Date(`2000-01-01T${endTime}`)
  // diff in millisecs
  const diff = endDate.getTime() - startDate.getTime()
  return diff / 60000
}

/**
 *  eg. 22:00:00 - 23:30:00 -> 1hr 30 mins
 */
export const getDuration = (startTime: string, endTime: string) => {
  let mins = getMinutesDiff(startTime, endTime)
  const hrs = Math.floor(mins / 60)
  mins = Math.floor(mins % 60)
  return `${hrs}hrs ` + (mins > 0 ? `${mins}mins` : '')
}

export const oridinalDate = (date: number) => {
  let ordinalIndicator
  if (date === 1 || date === 21 || date === 31) {
    ordinalIndicator = 'st'
  } else if (date === 2 || date === 22) {
    ordinalIndicator = 'nd'
  } else if (date === 3 || date === 23) {
    ordinalIndicator = 'rd'
  } else {
    ordinalIndicator = 'th'
  }
  return `${date}${ordinalIndicator}`
}

export const getDatesInMonth = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0).getDate()
  const daysArray = []

  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(oridinalDate(day))
  }

  return daysArray
}
