import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class Item {
  Id: number;
  Description: string;
  ImageLocation: string;
  MenuId: number;
  Name: string;
  PreparationTime: number;
  Price: number;

  constructor (description, imageLocation, menuId, name, preparationTime, price)
  {
    this.Description = description;
    this.ImageLocation = imageLocation;
    this.MenuId = menuId;
    this.Name = name;
    this.PreparationTime = preparationTime;
    this.Price = price;
  }
}

@Injectable()
export class MenuService {
  dataSource: any;
  url = "http://192.168.2.100:9999/MenuService.svc";
  item = {"Id":696,"Description":"Nhan test","ImageLocation":"http:\/\/barcodedc.com\/wp-content\/gallery\/food\/03.jpg","MenuId":14,"Name":"Pho Nam Dinh","PreparationTime":null,"Price":2.0000};
  httpOpinions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private http: HttpClient) { 
    
  }

  getMenuItems(): Observable<any> {
    return this.http.get(this.url + "/GetMenuItems");
  }

  addMenuItem(item: Item){
    this.http.post(this.url + "/AddMenuItem", item, this.httpOpinions).subscribe();
  }

  deleteMenuItem(id: number) {
    this.http.post(this.url + "/DeleteMenuItem/?menuItemId=" + id, this.httpOpinions)
      .subscribe();
  }

  updateMenuItem(item: Item) {
    this.http.post(this.url + "/UpdateMenuItem", item);
  }

}
