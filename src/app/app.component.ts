import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { PRIMARY_OUTLET } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links = ['About', 'Dashboard'];
  activeLink = this.links[0];
  background: ThemePalette = "primary";
  title = 'cpet-dashboard';
  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }
}
