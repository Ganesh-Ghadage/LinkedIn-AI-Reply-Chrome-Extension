import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    "name": "LinkedIn-AI-Reply",
    "version": "1.0.0",
    "description": "LinkedIn AI Reply is a Chrome extension that generates professional, context-aware replies for LinkedIn messages and posts using Google Gemini AI. Save time, maintain professionalism, and engage effectively with your network.",
  }
});
