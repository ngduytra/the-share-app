export const shortenAddress = (address: string, num = 4, delimiter = '...') => {
  return (
    address.substring(0, num) +
    delimiter +
    address.substring(address.length - num, address.length)
  )
}
