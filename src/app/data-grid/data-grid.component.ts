import { Component, OnInit } from '@angular/core';
import { MenuService, Item } from '../menu.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css'],
  providers: [MenuService]
})
export class DataGridComponent {
  dataSource: any;
  url = "http://192.168.2.100:9999/MenuService.svc";
  menuIds = [12, 13, 14, 15, 16, 20, 2112];

  constructor(private service: MenuService, private http: HttpClient)
  {
    this.dataSource = service.getMenuItems().subscribe(item => this.dataSource = item);
    
  }

    ngOnInit() {
      
    }
    onRowInserted(e) {
      let item: Item = new Item(
        e.data.Description, e.data.ImageLocation, e.data.MenuId, e.data.Name,
        e.data.PreparationTime, e.data.Price);
        this.service.addMenuItem(item);
    }

    onRowUpdated(e) {
      let item = e.newData;
      this.service.updateMenuItem(item);
    }

    onRowRemoved(e) {
      let id = e.data.Id;
      this.service.deleteMenuItem(id);
    }

}
