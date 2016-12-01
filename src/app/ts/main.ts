import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
import './extensions';

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);
