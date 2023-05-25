import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:7268';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const url = `${this.baseUrl}/api/Account/Login`;
    const params: { email: string, password: string } = {
      email: email || '',
      password: password || '',
    };

    return this.http.get(url, { params });
  }
  register(formData: any) {
    const url = `${this.baseUrl}/api/Account/Register`;

    return this.http.post(url, formData);
  }
  loggedInUserDetail(empId: number) {
    const userId = sessionStorage.getItem('UserId:');
    const token = sessionStorage.getItem('LoginData');
    
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    
    const url = `${this.baseUrl}/api/User/GetById?id=${empId}`;

    return this.http.get<any>(url, { headers });
  }

}
