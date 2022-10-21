import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss']
})
export class OrderPlacedComponent implements OnInit {
  // id: any=this.route.snapshot.params['Id'];
// Id: any = this.route.snapshot.paramMap.get('Id');

  Id:any=this.route.snapshot.params['id'];
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    // this.id =
  }

}
