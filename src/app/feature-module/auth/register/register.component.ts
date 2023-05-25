import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { WebStorage } from "src/app/core/services/storage/web.storage";
import { HttpClient } from '@angular/common/http';
import { ApiService } from "src/app/core/services/Api-Services/api.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public isvalidconfirmpassword: boolean = false;
  public subscription: Subscription;
  public CustomControler: any;
  public successMessage: string = '';
  public errorMessage: string = '';

  form = new FormGroup({
    firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      phoneNo: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      addressLine1: new FormControl('', Validators.required),
      addressLine2: new FormControl(''),
      cnic: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebStorage,private http: HttpClient, private apiService : ApiService) {
    this.subscription = this.storage.Createaccountvalue.subscribe((data) => {
      this.CustomControler = data;
    });
  }

  ngOnInit() {}



  submit(){
    if (this.form.value.password != this.form.value.confirmPassword) {
      this.isvalidconfirmpassword = true;
    } else {
      this.isvalidconfirmpassword = false;
    }
    if (this.form.valid) {
      const formData = this.form.value;

      this.apiService.register(formData).subscribe(
        (response : any) => {
          // Handle successful response
          console.log('Registration successful', response.message);
          if(response.message !== null){
            this.errorMessage = response.message;
          }
          else
          {
            this.successMessage = 'Your registration was successful.';
          }
          // Reset the form
          this.form.reset();
        },
        (error) => {
          // Handle error
          this.errorMessage = error.statusText;
          console.error('Registration failed', error);
        }
      );
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
  // submit() {
  //   if (this.form.value.password != this.form.value.confirmPassword) {
  //     this.isvalidconfirmpassword = true;
  //   } else {
  //     this.isvalidconfirmpassword = false;
  //     this.storage.Createaccount(this.form.value);
  //   }
  // }