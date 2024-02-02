import { SearchBarber } from "./components/search-barber"
import { Welcome } from "./components/welcome"
import { Header } from "@/components/header"

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto container">
      <Header />

      <div className="space-y-6 py-5 ">
        <Welcome />
        <SearchBarber />
      </div>
    </div>
  )
}

export default Home
