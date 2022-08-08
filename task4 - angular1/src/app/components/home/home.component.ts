import { PostService } from './../../services/post.service';
import { Subscription } from 'rxjs';
import { Post } from './../../interfaces/Post';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postSub: Subscription;

  constructor(
    private postServ: PostService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.postSub = this.postServ.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }

  goToPost(id: number): void {
    this.router.navigateByUrl(`post/${id}`);
  }

}
