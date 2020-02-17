import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class LinkedInService {
  private clientId: string = "81w5cpurquq645";
  private clientSecret: string = "MDHyGwC1Ttmdm9t9";
  private scope: string = "r_liteprofile r_emailaddress w_member_social";
  private requestBaseUrl: string = "https://api.linkedin.com/oauth/v2/";
  private redirectUrl: string = "https://localhost:44384/";
  constructor(private http: HttpClient) {

  }
  login() {
    return this.requestBaseUrl + "authorization?response_type=code&client_id=" + this.clientId + "&redirect_uri=" + this.redirectUrl + "&scope=" + this.scope;
  }
}
