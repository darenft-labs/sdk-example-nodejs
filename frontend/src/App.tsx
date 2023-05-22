import { lazy } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import GameLayout from "./layout"

const ListingNft = lazy(() => import("@/features/listing-nft"))
const NftDetail = lazy(() => import("@/features/nft-detail"))

function App() {
  return (
    <>
      <Routes>
        <Route
          element={
            <GameLayout>
              <Outlet />
            </GameLayout>
          }
        >
          <Route path="/" element={<ListingNft />} />
          <Route path="/nft-detail/:contractAddress/:tokenId" element={<NftDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
