import { Component } from '@angular/core';
import {environment} from "../environments/environment";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {

  environment:object = environment;
  title:string = 'app';

}
