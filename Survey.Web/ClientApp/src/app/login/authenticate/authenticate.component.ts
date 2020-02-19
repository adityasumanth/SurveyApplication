import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkedInService } from '../../services/linked-in.service';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models';

@Component({
    selector: 'app-authenticate',
    templateUrl: './authenticate.component.html',
    styleUrls: ['./authenticate.component.css']
})
/** authenticate component*/
export class AuthenticateComponent {
/** authenticate ctor */
  code: string;
  state: string;
  constructor(private route: ActivatedRoute, private linkedInService: LinkedInService, private authenticationService: AuthenticationService) {

  }
  ngOnInit() {
    debugger;
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      if (params['state'] != null) {
        this.state = params['state'];
      }
      this.linkedInService.getAccessToken(this.code, this.state).subscribe(response => {
        this.linkedInService.setAccessToken(response);
        this.linkedInService.getUserData().subscribe(data => {
          this.authenticationService.CreateOrUpdateUserWithLinkedIn(data, response['access_token']).subscribe(response => {
            this.authenticationService.setLinkedInUser(response);
            window.opener.location = ' ';
            window.close();
          });
        });
      });     
      
    });
   
  }

}
