const MINUTES_IN_HOUR = 60
const SECONDS_IN_MINUTE = 60
const SECONDS_IN_HOUR = SECONDS_IN_MINUTE * MINUTES_IN_HOUR

export function formatRunTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / MINUTES_IN_HOUR)
  const minutes = totalMinutes % MINUTES_IN_HOUR

  if (hours === 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

export function formatPlayerRunTime(totalSeconds: number): string {
  const roundedSeconds = Math.floor(totalSeconds)

  const hours = Math.floor(roundedSeconds / SECONDS_IN_HOUR)
  const minutes = Math.floor((roundedSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE)
  const seconds = roundedSeconds % SECONDS_IN_MINUTE

  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')

  return `${hours}:${mm}:${ss}`
}
