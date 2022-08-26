import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './../../services/user.service';
import { User } from './../../interfaces/User';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  users: User[] = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'address', 'gender', 'action'];

  userSub: Subscription;
  page = 1;
  count = 0;
  loading = true;
  deleteUserId: number;

  constructor(
    private userServ: UserService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.actRoute.queryParams.subscribe(({page}) => {
      this.page = page || 1;
      this.userSub = this.userServ.getUsers(this.page).subscribe(res => {
        this.users = res.body;
        this.count = +res.headers.get('X-Total-Count');
        this.loading = false;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  changeTable(e: any): void {
    this.router.navigate([], {queryParams: {page: e.pageIndex + 1}});
  }

  deleteConfirm(ref: any): void {
    this.dialog.open(ref);
  }

  deleteUser(): void {
    this.loading = true;
    this.userServ.deleteUser(this.deleteUserId).subscribe(() => {
      this.loading = false;
      this.users = this.users.filter(ele => ele.id !== this.deleteUserId);
      this.count--;
    });
  }

}
