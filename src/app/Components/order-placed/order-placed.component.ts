import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss']
})
export class OrderPlacedComponent implements OnInit {

  // Id: any = this.route.snapshot.paramMap.get('Id');  option-1
  Id:any=this.route.snapshot.params['Id'];
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
  }

}
