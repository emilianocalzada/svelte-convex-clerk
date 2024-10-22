// place files you want to import through the `$lib` alias in this folder.
import { PUBLIC_CONVEX_URL } from '$env/static/public';
import { ConvexClient } from 'convex/browser';

export const convexClient = new ConvexClient(PUBLIC_CONVEX_URL, {
    verbose: true,
});
