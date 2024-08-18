export function formatSSN(value: string) {
  const cleaned = value.replace(/\D/g, '') // Remove all non-digit characters
  const match = cleaned.match(/^(\d{3})(\d{2})(\d{0,4})$/)
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`
  }
  return value
}
