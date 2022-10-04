import { Component, OnInit } from '@angular/core';

interface SortBy {
  value: string;
  viewValue:string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sortsBy: SortBy[] = [
    {value: '',viewValue:'Sort by relevance'},
    {value: 'Price : High to Low',viewValue:'Price : High to Low'},
    {value: 'Price : Low to High',viewValue:'Price : Low to Heigh'},
    {value: 'Newest Arrivals',viewValue:'Newest Arrivals'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
