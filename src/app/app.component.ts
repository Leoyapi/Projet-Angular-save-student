import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { EleveService } from './core/sevices/eleve';
import { FooterComponent } from './widget/footer/footer.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule,FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Appsave';

  constructor(private eleveService: EleveService) { }

  ngOnInit() {
    console.log('on init .....');
    this.eleveService.getEleves().subscribe(data => {
      console.log(data);
    });
  }
}
