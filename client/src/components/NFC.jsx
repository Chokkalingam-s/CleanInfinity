import Card from './Card'
import VerticalCard from './VerticalCard'

export default function NFCPage() {
  const NFCtitles = ['Pair with Biodegradable', 'Pair with Non-Biodegradable']
  return (
    <>
      <h1>NFC</h1>
      <Card />
      <VerticalCard titles={NFCtitles} />
    </>
  )
}
