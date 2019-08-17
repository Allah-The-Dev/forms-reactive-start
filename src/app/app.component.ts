import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { resolve, reject } from 'q';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  genders = ['male', 'female'];
  signupForm : FormGroup;
  forbiddenNames = ['Neelesh','Neel']

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userdata': new FormGroup({
        'username': new FormControl(null,[Validators.required,this.checkForbiddenNames.bind(this)]),
        'email': new FormControl(null,[Validators.required,Validators.email]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
  }

  onSubmit(){
    console.log(this.signupForm)
  }

  onAddHobby(){
    const control = new FormControl(null,Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  checkForbiddenNames(control:FormControl):{[s:string]:boolean}{
    if(this.forbiddenNames.indexOf(control.value) !== -1){
      return {'nameIsForbidden':true};
    }
    return null;
  }

  //asynchronous validator method
  //which will return a promise after some time
  //or after a rest call
  checkForbiddenEmails(control:FormControl):Promise<any> | Observable<any>{
    const promise = new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value === 'neel@neel.com'){
          resolve({'emailIsForbidden':true});
        }
        else{
          resolve(null)
        }
      },1500);
    });
    return promise;
  }
}
