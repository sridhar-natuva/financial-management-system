import {
    Routes,
    provideRouter,
    withComponentInputBinding,
    withEnabledBlockingInitialNavigation,
    withInMemoryScrolling,
    withRouterConfig,
} from '@angular/router';
import {
    provideEnvironmentInitializer,
    provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';

export interface CoreOptions {
    routes: Routes;
}

export function provideCore({ routes }: CoreOptions) {
    return [
        provideZonelessChangeDetection(),
        provideHttpClient(withFetch()),
        provideRouter(
            routes,
            withRouterConfig({
                onSameUrlNavigation: 'reload',
            }),
            withComponentInputBinding(),
            withEnabledBlockingInitialNavigation(),
            withInMemoryScrolling({
                anchorScrolling: 'enabled',
                scrollPositionRestoration: 'enabled',
            }),
        ),

        // other 3rd party libraries providers like NgRx, provideStore()

        // other application-specific providers and setup

        // perform initialization, has to be last
        provideEnvironmentInitializer(() => {
            // add init logic here...
            // kickstart processes, trigger initial requests or actions, ...
        }),
    ];
}
