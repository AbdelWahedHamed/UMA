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

		public async Task<List<Blog>> GetBlogs()
		{
			return await _context.Blogs.OrderBy(r => r.Id).ToListAsync();
		}

		public async Task<Blog> GetBlog(int id)
		{
			return await _context.Blogs.FirstOrDefaultAsync(r => r.Id == id);
		}

		public async Task AddBlog(Blog blog)
		{
			await _context.Blogs.AddAsync(blog);
			await _context.SaveChangesAsync();
		}

		public async Task DeleteBlog(int id)
		{
			var deletedBlog = await GetBlog(id);

			if (deletedBlog != null)
			{
				_context.Blogs.Remove(deletedBlog);
				await _context.SaveChangesAsync();
			}
		}
	}
}
