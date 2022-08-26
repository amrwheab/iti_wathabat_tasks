import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../interfaces/User';
import { UserService } from './../../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit, OnDestroy {

  userForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  loading = false;
  user: User = {
    id: 0,
    name: '',
    email: '',
    address: '',
    phone: '',
    gender: ''
  };

  edit = false;

  userSub: Subscription;

  constructor(
    private fb: FormBuilder,
    private userSer: UserService,
    private snackBar: MatSnackBar,
    private actRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    const url = new URL(location.href);
    if (url.pathname.split('/')[1] === 'edituser') {
      this.edit = true;
      this.actRoute.params.subscribe(({id}) => {
        this.loading = true;
        this.userSub = this.userSer.getOneUser(id).subscribe(user => {
          this.user = user;
          this.loading = false;
          this.userForm = this.fb.group({
            name: [this.user.name, Validators.required],
            email: [this.user.email, [Validators.email, Validators.required]],
            phone: [this.user.phone, Validators.required],
            address: [this.user.address, Validators.required],
            gender: [this.user.gender, Validators.required]
          });
        }, err => {
          confirm('some thing went wrong');
          this.router.navigateByUrl('/');
        });
      });
    }
    this.userForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.email, Validators.required]],
      phone: [this.user.phone, Validators.required],
      address: [this.user.address, Validators.required],
      gender: [this.user.gender, Validators.required]
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  onSubmit(): void {
    this.loading = true;
    if (this.edit) {
      this.userSer.editUser(this.userForm.value, this.user.id).subscribe(() => {
        this.loading = false;
        this.snackBar.open('updated successfully!', 'done', {
          duration: 2000,
        });
      });
    } else {
      this.userSer.addUser(this.userForm.value).subscribe(() => {
        this.loading = false;
        this.userForm.reset();
        this.snackBar.open('added successfully!', 'done', {
          duration: 2000,
        });
      });
    }
  }

}
