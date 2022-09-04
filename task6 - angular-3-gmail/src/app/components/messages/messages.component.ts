import { MessagesService } from './../../services/messages.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {

  messages: any = []
  likedMessages: number[] = [1]
  bookMarkMsgs: number[] = [2]
  page = 1
  selectAll = false
  loading = false
  total: any = 0
  first= 0
  messSub?: Subscription;

  constructor(
    private actRoute: ActivatedRoute,
    private messageServ: MessagesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(({type}) => {
      this.loading = true;
      this.actRoute.queryParams.subscribe(({page}) => {
        this.page = +page || 1
        this.first = (this.page-1) * 5
        this.messages = []
        this.messSub = this.messageServ.getMessages(type, this.page).subscribe(msgs => {
          this.messages = msgs.body;
          this.total = msgs.headers.get('X-Total-Count');
          this.loading = false;
        })
      })
    })
  }

  ngOnDestroy(): void {
    if (this.messSub) {
      this.messSub.unsubscribe()
    }
  }

  gDate() {
    return new Date(new Date(2012, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2012, 0, 1).getTime()));
  }

  like (like: boolean, id: number) {
    if (like) this.likedMessages.push(id)
    else this.likedMessages = this.likedMessages.filter(ele => ele !== id)
  }

  bookmark (booked: boolean, id: number) {
    if (booked) this.bookMarkMsgs.push(id)
    else this.bookMarkMsgs = this.bookMarkMsgs.filter(ele => ele !== id)
  }

  changePage(e: any) {
    const page = +(e.first / 5).toFixed(0) + 1
    this.router.navigate([], {queryParams: {page}})
  }
}
