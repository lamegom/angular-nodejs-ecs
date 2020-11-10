import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { AppService } from './app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { User } from './app-state/models';
import { OnInit, enableProdMode } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy , OnInit {

  constructor(private appService: AppService,
     private formBuilder: FormBuilder, ) {
      
     }
    ngOnInit() {
      setTimeout(() => {
        console.log(this.form.controls);
      console.log(typeof this.form.controls);
      console.log(Object.keys(this.form.controls));
  
      console.log(this.form.controls.myname);
      console.log(this.form.controls['myname']);
      })

  }
  @ViewChild('f')
  form: NgForm 
  title = 'angular-nodejs-example';
;
  users: any[] = [];
  userCount = 0;
  user : User = new User();

  destroy$: Subject<boolean> = new Subject<boolean>();

  onSubmit(){

    this.appService.addUser(this.user).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log('messadatage::::', data);
      this.userCount = this.userCount + 1;
      console.log(this.userCount);
      this.form.reset();
    });
  }

  

  getAllUsers() {
    this.appService.getUsers().pipe(takeUntil(this.destroy$)).subscribe((users: any[]) => {
        this.users = users;

    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
