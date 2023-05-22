import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"
import * as path from "path"
import { resolve } from "path"
import vitePluginImp from "vite-plugin-imp"

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      react(),
      vitePluginImp({
        libList: [
          {
            libName: "antd",
            style: (name) => {
              if (name === "col" || name === "row") {
                return "antd/lib/style/index.less"
              }
              return `antd/es/${name}/style/index.less`
            },
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
    define: { "process.env": process.env },
    build: {
      commonjsOptions: {
        include: ["tailwind.config.js", "node_modules/**"],
      },
    },
    optimizeDeps: {
      include: ["tailwind.config.js"],
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "tailwind.config.js": path.resolve(__dirname, "tailwind.config.js"),
        stream: "stream-browserify",
        https: "agent-base",
        http: "agent-base",
      },
    },
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
  })
}
