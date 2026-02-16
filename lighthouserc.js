module.exports = {
  ci: {
    collect: {
      url: [
        "http://localhost:4321/",
        "http://localhost:4321/articles/1-1-architecture-of-the-state/",
        "http://localhost:4321/series/",
      ],
      startServerCommand: "npm run preview",
      startServerReadyPattern: "Local",
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
        "first-contentful-paint": ["error", { maxNumericValue: 1500 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-byte-weight": ["error", { maxNumericValue: 460800 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
