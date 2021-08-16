import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { PRIMARY_OUTLET } from '@angular/router';

type Links ={
  name: string;
  link: string;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menu: MenuObject = [
    { "name": "Dashboard", "link": "Dashboard" ,"active":true},
    { "name": "SHAP plots", "link": "ShapPlots", "active":false },
    { "name": "Dynamic plot", "link": "DynamicPlot", "active":false },
    { "name": "Try it", "link": "TryIt", "active":false },
    { "name": "About", "link": "About", "active":false }
  ];
  links = ['Dashboard','About', 'ShapPlots'];
  textLinks = ['Dashboard','About', 'SHAP plots'];
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
type MenuObject = Array<{ name: string, link: string, active:boolean }>;
