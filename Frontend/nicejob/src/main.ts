import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { registerLicense } from '@syncfusion/ej2-base';

// Registering Syncfusion license key
registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF1cVGhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjWn1YcnRXT2FbVURzWQ==');




BsDatepickerModule.forRoot()

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
