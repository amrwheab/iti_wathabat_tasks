import { Post } from './../../interfaces/Post';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.css']
})
export class PostcardComponent implements OnInit {

  @Input() post: Post;
  @Output() goToPost = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
