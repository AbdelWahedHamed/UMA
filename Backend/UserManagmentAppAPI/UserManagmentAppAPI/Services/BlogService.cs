using UserManagmentAppAPI.Data;
using UserManagmentAppAPI.Models;
using Microsoft.EntityFrameworkCore;


namespace UserManagmentAppAPI.Services
{
	public class BlogService
	{
		private readonly DataContext _context;
		public BlogService(DataContext context)
		{
			_context = context;
		}

		public List<Blog> GetBlogs()
		{
			return  _context.Blogs.OrderBy(r => r.Id).ToList();
		}

		public Blog GetBlog(int id)
		{
			return  _context.Blogs.FirstOrDefault(r => r.Id == id);
		}

		public  bool AddBlog(Blog blog)
		{
			if (blog != null)
			{

				_context.Blogs.Add(blog);
				_context.SaveChanges();
				return true;
			}
			return true;
		}

		public bool DeleteBlog(int id)
		{
			var deletedBlog =  GetBlog(id);

			if (deletedBlog != null)
			{
				_context.Blogs.Remove(deletedBlog);
				 _context.SaveChanges();
				return true;
			}
			return false;
		}
	}
}
