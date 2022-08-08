import { Subscription } from 'rxjs';
import { PostService } from './../../services/post.service';
import { Post } from './../../interfaces/Post';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  post: Post = {};
  postSub: Subscription;

  constructor(
    private actRoute: ActivatedRoute,
    private postServ: PostService
  ) { }

  ngOnInit(): void {
    this.actRoute.params.subscribe(({id}) => {
      this.postSub = this.postServ.getOnePost(id).subscribe(post => {
        this.post = post;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.postSub) {
      this.postSub.unsubscribe();
    }
  }

}
