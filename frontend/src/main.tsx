import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter } from "react-router-dom"
import BlockchainProvider from "@/dapp/provider/blockchain-provider"
import App from "./App"
import store from "@/redux/store"

import "@/i18n/config"
import "./style/index.less"
import { LazyLoadComponent } from "./layout"

const LoadingOverlay = React.lazy(() => import("@/shared/components/loading-overlay"))

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BlockchainProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
            <LazyLoadComponent>
              <LoadingOverlay />
            </LazyLoadComponent>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </BlockchainProvider>
  </React.StrictMode>
)
