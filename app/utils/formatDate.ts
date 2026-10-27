const reviewDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

export function formatReviewDate(isoDate: string): string {
  return reviewDateFormatter.format(new Date(isoDate))
}

export function formatDateAttr(isoDate: string): string {
  return new Date(isoDate).toISOString().slice(0, 10)
}
