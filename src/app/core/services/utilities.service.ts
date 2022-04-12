import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import Swal from "sweetalert2";


@Injectable({providedIn:'root'})
export class UtilitiesService{

  constructor(private _router:Router){}

  showNotification(type,message){
    Swal.fire({
      confirmButtonColor: "#03a9f4",
      text: message,
      icon: type,
      confirmButtonText: 'ok'
    });
  }
}