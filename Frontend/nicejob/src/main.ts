import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';




BsDatepickerModule.forRoot()

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
