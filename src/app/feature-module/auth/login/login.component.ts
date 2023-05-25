import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { WebStorage } from "src/app/core/services/storage/web.storage";
import { Router } from '@angular/router';
import { ApiService } from "src/app/core/services/Api-Services/api.service";
import jwtDecode from 'jwt-decode';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public CustomControler : any;
  public subscription: Subscription;
  public Toggledata=true;
  public successMessage: string = '';
  form = new FormGroup({
    email: new FormControl("abdullah@izylogic.com", [Validators.required]),
    password: new FormControl('abdullah?123', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private storage: WebStorage,private router: Router, private apiService : ApiService) {
    this.subscription = this.storage.Loginvalue.subscribe((data) => { 
      if(data != 0){
        this.CustomControler = data;
      }
    });
  }

  ngOnInit() {
    // this.storage.Checkuser();
   localStorage.removeItem('LoginData');
  }

  // submit() {
  //   this.storage.Login(this.form.value);
  // }
  submit() {
    const loginData = this.form.value;
    const email = loginData.email || '';
  const password = loginData.password || '';
   // const apiUrl =  this.apiService.login(email , password);
  
    // Make a GET request to the API endpoint
    this.apiService.login(email, password)
    .subscribe(
      (data: any) => {
        console.log(data);
        if (data.isSuccess && data.statusCode === 200) {
          this.successMessage = 'Login successful.';
          this.router.navigate(['/dashboard/admin']);
          // Handle successful login
          const token = data.data.token;
          const role = data.data.role;
          console.log(role);
          const decodedToken = jwtDecode(token) as { [key: string]: any };
          const jti = decodedToken['jti'];
          const userId = decodedToken['UserId'];
          const userRole = decodedToken['UserRole'];
          const nbf = decodedToken['nbf'];
          const exp = decodedToken['exp'];
          const iat = decodedToken['iat'];

          const expTimestamp = decodedToken['exp'] * 1000; // Multiply by 1000 to convert seconds to milliseconds
          const expDate = new Date(expTimestamp);
          const expString = expDate.toISOString();

          sessionStorage.setItem('jti:', jti);
          sessionStorage.setItem('role:', role);
          sessionStorage.setItem('UserId:', userId);
          sessionStorage.setItem('UserRole:', userRole);
          sessionStorage.setItem('nbf:', nbf);
          sessionStorage.setItem('exp:', expString);
          sessionStorage.setItem('iat:', iat);
          console.log(decodedToken);
          // Save the token and role to the desired location (e.g., localStorage or a state management library)
          // ...
         this.Createtoken(token);
         //localStorage.setItem('logintime',Date());
         sessionStorage.setItem('LoginTime', Date());
          // Redirect the user to another page based on their role
          if (role === 'admin') {
            this.router.navigate(['/dashboard/admin']);
          } else if (role === 'user') {
            this.router.navigate(['/dashboard/user']);
          } else {
            // Handle other roles or scenarios
          }
        } else {
          // Handle failed login
          console.log('Login failed');
        }
      },
      (error: any) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      }
    );
  }
  
  public Createtoken(token:any) {
    sessionStorage.setItem('LoginData', token);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  iconLogle(){
    this.Toggledata = !this.Toggledata
  }
}
