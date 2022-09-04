import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sideShow = true;
  sideContenet: TreeNode[] = [
    {
      label: 'Inbox'
    },
    {
      label: 'Starred'
    },
    {
      label: 'Snoozed'
    },
    {
      label: 'Categories',
      children: [
        {
          label: 'Social'
        },
        {
          label: 'Updates'
        },
        {
          label: 'Forums'
        },
      ]
    },
  ];
  tabs = [
    { label: 'Primary'},
    { label: 'Promotions'},
    { label: 'Social'},
  ]

  activeTab: any = this.tabs[0];

  constructor() { }

  ngOnInit(): void {
    this.activeTab = this.tabs.find(ele => ele.label.toLowerCase() === location.pathname.slice(1))
  }

}
