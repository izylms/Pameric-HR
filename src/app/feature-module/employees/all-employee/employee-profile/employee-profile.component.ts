import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ApiService } from "src/app/core/services/Api-Services/api.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent implements OnInit {
  public addEmployeeForm: FormGroup | any;
  public firstName : string = '';
  public lastName : string = '';
  public addressLine1 : string = '';
  public addressLine2 : string = '';
  public city : string = '';
  public cnic : string = '';
  public country : string = '';
  public email : string = '';
  public password : string = '';
  public phoneNo : string = '';
  public role : string = '';
  public state : string = '';
  public zip : string = '';
  empId: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params) {
        const empIdParam = params.get('empId');
        this.empId = empIdParam ? +empIdParam : 0;
        this.loggedInUser(this.empId);
      }
    });
  
    this.addEmployeeForm = this.formBuilder.group({
      client: ["", [Validators.required]],
    });
  }
 
  loggedInUser(empId: number) {
    this.apiService.loggedInUserDetail(empId).subscribe(
      (user) => {
        console.log(user);
        this.addressLine1 = user.data.addressLine1;
        this.addressLine2 = user.data.addressLine2;
        this.city = user.data.city;
        this.cnic = user.data.cnic;
        this.country = user.data.country;
        this.email = user.data.email;
        this.firstName = user.data.firstName;
        this.lastName = user.data.lastName;
        this.password = user.data.password;
        this.phoneNo = user.data.phoneNo;
        this.role = user.data.role;
        this.state = user.data.state;
        this.zip = user.data.zip;
        },
        (error) => {
          console.error('Error:', error.message);
        }
      );
  }

}
