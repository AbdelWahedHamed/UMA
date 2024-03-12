using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserManagmentAppAPI.Dto;
using UserManagmentAppAPI.Models;
using UserManagmentAppAPI.Services;

namespace UserManagmentAppAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly UserService _userService;
		private readonly RoleService _roleService;

		public UserController(UserService userService, RoleService roleService)
		{
			_userService = userService;
			_roleService = roleService;
		}

		[HttpGet]
		public IActionResult GetUsers()
		{
			var users = _userService.GetUsers();
			return Ok(users);
		}

		[HttpPost]
		public IActionResult CreateUser(UserDto request)
		{
			if (request == null)
				return BadRequest(ModelState);

			var user = _userService.GetUserByName(request.Name);
			if (user != null)
			{
				ModelState.AddModelError("", "User already exists");
				return StatusCode(422, ModelState);
			}

			 user = new User
			{
				Name = request.Name,
				Email = request.Email,
				Password = request.Password,
				DateOfBirth = request.DateOfBirth,
				RoleId = request.RoleId,

			};
			user.Role = _roleService.GetRole(user.RoleId);



			if (!_userService.AddUser(user))
			{
				ModelState.AddModelError("", "Something went wrong while saving");
				return StatusCode(500, ModelState);
			}
			return Ok("Added Successfully");
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteRole(int id)
		{
			var deletedUser = _userService.GetUser(id);
			if (deletedUser == null)
				return NotFound();

			if (!_userService.DeleteUser(id))
			{
				ModelState.AddModelError("", "Something went wrong while deleting the role");
			}
			return Ok("Deleted Successfully");
		}

		[HttpGet("{email}/{password}")]
		public IActionResult SignIn(string email, string password)
		{
			if (_userService.SignIn(email, password))
				return Ok();

			return NotFound();
		}
	}
}
