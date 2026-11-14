import { defineConfig, devices } from "@playwright/test";
import { defineBddConfig } from "playwright-bdd";

const port = Number(process.env.E2E_PORT ?? 4173);
const baseURL = `http://localhost:${port}`;
const tags = process.env.E2E_TAGS === undefined ? "not @unverified" : process.env.E2E_TAGS;

const testDir = defineBddConfig({
  features: "specs/truth/features/**/*.feature",
  steps: ["e2e/steps/**/*.ts", "e2e/fixtures.ts"],
  tags: tags || undefined,
  outputDir: ".features-gen",
});

export default defineConfig({
  testDir,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  outputDir: "test-results",
  use: {
    baseURL,
    locale: "zh-TW",
    timezoneId: "Asia/Taipei",
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "chrome",
      use: { ...devices["Desktop Chrome"], channel: "chrome" },
    },
  ],
  webServer: {
    command: "node e2e/support/github-pages-server.ts",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    env: { E2E_PORT: String(port) },
  },
});
