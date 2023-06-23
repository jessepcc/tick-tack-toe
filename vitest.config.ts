import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        // exclude the e2e "tests" from the test runner
        exclude: [
            "**/tests/**",
            "**/node_modules/**",
            "**/dist/**",
            "**/cypress/**",
            "**/.{idea,git,cache,output,temp}/**",
            "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
        ],
    },
});
