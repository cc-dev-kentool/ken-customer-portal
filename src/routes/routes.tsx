import React, { Suspense } from "react";
import ROUTES, { RenderRoutes } from "./RenderRoutes";
import SuspenseSpinner from "components/SuspenseFallback";

// A function that renders a tree of <Route> components, with the specified routes as props.
export function routes() {
    // Uses a <Suspense> component to display a spinner while the client-side app loads asynchronously.
    return (
        <Suspense fallback={<SuspenseSpinner />}>
            <RenderRoutes routes={ROUTES} />
        </Suspense>
    );
}