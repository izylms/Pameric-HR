import { Component, OnInit } from '@angular/core';

import { SideBarService } from 'src/app/core/services/side-bar/side-bar.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { WebStorage } from 'src/app/core/services/storage/web.storage';
import { HttpClient } from '@angular/common/http';
import { ApiService } from "src/app/core/services/Api-Services/api.service";

@Component({
  selector: 'app-header-one',
  templateUrl: './header-one.component.html',
  styleUrls: ['./header-one.component.scss']
})
export class HeaderOneComponent implements OnInit {
  public base ='';
  public page ='';
  public miniSidebar: boolean = false;
  public baricon: boolean = false;
  public firstName: string = '';
  public lastName: string = '';
  public empId: number | null = null;

  constructor( private sideBar: SideBarService, private router : Router, private web : WebStorage,private http: HttpClient,private apiService: ApiService) {
    this.sideBar.toggleSideBar.subscribe((res: any) => {
      if (res == 'true') {
        this.miniSidebar = true;
      } else {
        this.miniSidebar = false;
      }
    });
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        let splitVal = event.url.split('/');
        this.base = splitVal[1];
        this.page = splitVal[2];
        if (this.base === 'components' || this.page === 'tasks' || this.page === 'email') {
          this.baricon = false
          localStorage.setItem('baricon', 'false');
        }
        else {
          this.baricon = true
          localStorage.setItem('baricon', 'true');
        }
      }
    });
    if(localStorage.getItem('baricon')== 'true') {
      this.baricon = true;
    }
    else {
      this.baricon = false
    }
  }

  ngOnInit(): void {
  this.loggedInUser();
  const userId = sessionStorage.getItem('UserId:');
  this.empId = userId !== null ? parseInt(userId, 10) : null;
  }

  public toggleSideBar(): void {
    this.sideBar.switchSideMenuPosition();
  }


  public togglesMobileSideBar(): void {
    this.sideBar.switchMobileSideBarPosition();
  }

  logout() {
    localStorage.removeItem("LoginData");
    this.router.navigate(["/login"]);
  } 
  
  loggedInUser() {
    const userIdString = sessionStorage.getItem('UserId:');
    const userId = userIdString ? parseInt(userIdString) : 0;
    this.apiService.loggedInUserDetail(userId).subscribe(
      (user) => {
          console.log(user);
          const addressLine1 = user.data.addressLine1;
          const addressLine2 = user.data.addressLine2;
          const city = user.data.city;
          const cnic = user.data.cnic;
          const country = user.data.country;
          const createdBy = user.data.createdBy;
          const createdDate = user.data.createdDate;
          const email = user.data.email;
          this.firstName = user.data.firstName;
          this.lastName = user.data.lastName;
          const password = user.data.password;
          const phoneNo = user.data.phoneNo;
          const role = user.data.role;
          const state = user.data.state;
          const zip = user.data.zip;
        },
        (error) => {
          console.error('Error:', error.message);
        }
      );
  }

}
