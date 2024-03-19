import { Component , OnDestroy} from '@angular/core';
import { BlogAdd } from '../blog/blogAdd';
import { Subscription } from 'rxjs';
import { BlogService } from 'src/app/Service/Blog/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnDestroy{

  newBlog : BlogAdd
  unsubscribe? : Subscription

  constructor(private blogservice:BlogService , private router : Router)
  {
    this.newBlog ={
      title:"",
      content:""
    }
  }


  onFormSubmit()
  {
    this.unsubscribe = this.blogservice.addBlog(this.newBlog).subscribe({
      next: (response) =>{
        console.log('Success!!')
        this.router.navigateByUrl("/Blog")
      },
      error: (response) =>{
        this.router.navigateByUrl("/Blog")

      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.unsubscribe();
  }


}
