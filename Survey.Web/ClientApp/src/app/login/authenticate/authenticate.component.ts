import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LinkedInService } from '../../services/linked-in.service';

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
  constructor(private route: ActivatedRoute,private linkedInService:LinkedInService) {

  }
  ngOnInit() {
    console.log(this.route.queryParams);
    this.route.queryParams.subscribe(params => {
      this.code = params['code'];
      if (params['state'] != null) {
        this.state = params['state'];
      }
      this.linkedInService.getAccessToken(this.code, this.state).subscribe(response => {
        window.close();
        localStorage.setItem('userAccessToken', JSON.stringify(response));
        debugger;
        window.location.replace(' ');
      });
      
      
    });
   
  }
}
