import { injectContent, MarkdownComponent } from '@analogjs/content';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface PostAttributes {
  title: string;
  slug: string;
  description: string;
  coverImage: string;
}

@Component({
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, NgIf],
  template: `
    <ng-container *ngIf="post$ | async as post">
      <h1>{{ post.attributes.title }}</h1>
      <analog-markdown [content]="post.content"></analog-markdown>
    </ng-container>
  `,
})
export default class BlogPostComponent {
  // directory is src/content/posts/article-1/article-1.md
  // :slug is article-1
  readonly route = inject(ActivatedRoute);
  readonly post$ = injectContent<PostAttributes>({
    param: 'slug',
    subdirectory: `posts/${this.route.snapshot.paramMap.get('slug')}`,
  });
}