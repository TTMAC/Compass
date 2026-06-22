import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";
import type { MiddlewareHandler } from "astro";

/**
 * Auth gate for the Reform section.
 *
 * Only `/reform/*` routes are protected. They are rendered on-demand
 * (`prerender = false`) so this middleware actually runs for them at request
 * time — prerendered public pages never reach it.
 *
 * Dormant when unconfigured: if no publishable key is present (dev, open deploy
 * previews) we skip Clerk entirely and pass every request through, so those
 * environments stay open and build without credentials. The gate only engages
 * once Clerk keys are set (production).
 */
const isReform = createRouteMatcher(["/reform(.*)"]);
const enabled = !!import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

const passthrough: MiddlewareHandler = (_context, next) => next();

export const onRequest: MiddlewareHandler = enabled
  ? clerkMiddleware((auth, context) => {
      if (isReform(context.request) && !auth().userId) {
        return auth().redirectToSignIn({ returnBackUrl: context.request.url });
      }
    })
  : passthrough;
