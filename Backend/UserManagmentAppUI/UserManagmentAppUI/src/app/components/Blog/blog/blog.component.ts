import { Component , OnInit } from '@angular/core';
import { BlogGet } from './blogGet';
import { BlogService } from 'src/app/Service/Blog/blog.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit{
  blogs:BlogGet[] = []
  
  constructor(private blogservice:BlogService
    , private location: Location , private router : Router) {
    
  }

  ngOnInit(): void {
    this.GetBlogs();
  }

  GetBlogs():void
  { 
     this.blogservice?.getBlogs().subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          this.blogs = response;
          console.log('Blogs:', this.blogs);
        } else {
          this.blogs = response.$values;
          console.log('Blogs:', this.blogs);

        }
      },
    (error) => {
      console.error('Error fetching Blogs:', error);
    }
    );
     
  }

  DeleteBlogs(blogId : number)
  {
    this.blogservice.deleteBlog(blogId).subscribe(
      () => {
        console.log('Blog deleted successfully.');
        window.location.reload();
      },
      (error) => {
        console.error(error);
        window.location.reload();
      }
    );
  }
}
