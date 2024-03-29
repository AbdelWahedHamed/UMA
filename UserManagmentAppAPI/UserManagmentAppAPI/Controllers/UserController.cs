﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserManagmentAppAPI.Dto;
using UserManagmentAppAPI.Models;
using UserManagmentAppAPI.Services;
using Newtonsoft.Json;
using EmailService;


namespace UserManagmentAppAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly UserService _userService;
		private readonly RoleService _roleService;
		private readonly IEmailSender _emailSender;

		public UserController(UserService userService, RoleService roleService, IEmailSender emailSender)
		{
			_userService = userService;
			_roleService = roleService;
			_emailSender = emailSender;
		}

		[HttpGet]
		public IActionResult GetUsers()
		{
			//var message = new Message(new string[] { "a.wahed.hamedh@gmail.com" }, "Test email", "This is the content from our email.");
			//_emailSender.SendEmail(message);

			var users = _userService.GetUsers();

			// Configure Newtonsoft.Json settings
			var jsonSettings = new JsonSerializerSettings
			{
				ReferenceLoopHandling = ReferenceLoopHandling.Ignore
			};

			// Serialize the array of objects to JSON with the specified settings
			var json = JsonConvert.SerializeObject(users, jsonSettings);

			return Ok(json);
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
				PasswordHash = request.Password,
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
