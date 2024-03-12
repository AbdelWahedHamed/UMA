import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BlogGet } from 'src/app/components/Blog/blog/blogGet';
import { BlogAdd } from 'src/app/components/Blog/blog/blogAdd';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  blogs:BlogGet[] =[]
  url = 'https://localhost:7256/api/Blog';


  constructor(private http:HttpClient) { }

  addBlog(newBlog:BlogAdd): Observable<void>
  {
    return this.http.post<void>(this.url,newBlog);
  }
  
  getBlogs(): Observable<any>
  {
    return this.http.get<any>(this.url);
  }

  deleteBlog(deletedBlogId: number): Observable<void> 
  { 
    return this.http.delete<void>(this.url + '/' + deletedBlogId);
  }
}
