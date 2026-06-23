import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

// The Reform section is gated: visitors must be signed in to view it.
// Each of these pages also sets `export const prerender = false` so it renders
// on-demand and this middleware runs per request.
const isProtectedRoute = createRouteMatcher([
  "/reform-programme(.*)",
  "/leading-and-lagging-metrics(.*)",
  "/reform-scorecard(.*)",
  "/diagnostic-frameworks(.*)",
  "/real-steps-to-reform(.*)",
]);

export const onRequest = clerkMiddleware((auth, context, next) => {
  if (isProtectedRoute(context.request) && !auth().userId) {
    return auth().redirectToSignIn();
  }
  return next();
});
