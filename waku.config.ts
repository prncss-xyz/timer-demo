import { defineConfig } from "waku/config";
import viteConfig from "./vite.config";

export default defineConfig({
  basePath: "/timer-demo/",
  vite: viteConfig,
});
