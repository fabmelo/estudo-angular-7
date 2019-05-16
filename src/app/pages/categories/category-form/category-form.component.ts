// Angular
import { Component, OnInit } from '@angular/core';

// FontAwesome
import { faChevronCircleLeft, faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {
  // FontAwesome
  faChevronCircleLeft = faChevronCircleLeft;
  faSave = faSave;

  constructor() {}

  ngOnInit() {}
}
