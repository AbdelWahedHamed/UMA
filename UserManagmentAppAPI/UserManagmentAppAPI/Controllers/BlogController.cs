using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserManagmentAppAPI.Dto;
using UserManagmentAppAPI.Models;
using UserManagmentAppAPI.Services;

namespace UserManagmentAppAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BlogController : ControllerBase
	{
		private readonly BlogService _blogService;
		public BlogController(BlogService blogService)
		{
			_blogService = blogService;
		}

		[HttpGet]
		public IActionResult GetBlogs()
		{
			var blogs = _blogService.GetBlogs();
			return Ok(blogs);
		}

		[HttpPost]
		public IActionResult CreateBlog(BlogDto request)
		{
			if (request == null)
				return BadRequest(ModelState);

			var blog = new Blog
			{
				Title = request.Title,
				Content = request.Content
			};


			if (!_blogService.AddBlog(blog))
			{
				ModelState.AddModelError("", "Something went wrong while saving");
				return StatusCode(500, ModelState);
			}
			return Ok("Added Successfully");
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteBlog(int id)
		{
			var deletedBlog = _blogService.GetBlog(id);
			if (deletedBlog == null)
				return NotFound();

			if (!_blogService.DeleteBlog(id))
			{
				ModelState.AddModelError("", "Something went wrong while deleting the role");
			}
			return Ok("Deleted Successfully");
		}
	}
}
