import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    "name": "LinkedIn-AI-Reply",
    "version": "1.0.0",
    "description": "Chrome extension that runs on LinkedIn and assists users in generating replies to messages. This is a demo extension, It actually won't generate the reply.",
  }
});
