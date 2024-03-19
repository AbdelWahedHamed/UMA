using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserManagmentAppAPI.Data;
using UserManagmentAppAPI.Dto;
using UserManagmentAppAPI.Models;
using UserManagmentAppAPI.Services;

namespace UserManagmentAppAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class RoleController : ControllerBase
	{
		private readonly RoleService _roleService;
		public RoleController(RoleService roleService)
		{
			_roleService = roleService;
		}

		[HttpGet]
		public IActionResult GetRoles()
		{
			var roles = _roleService.GetRoles();
			return Ok(roles);
		}

		[HttpPost]
		public IActionResult CreateRole(RoleDto request)
		{
			if (request == null)
				return BadRequest(ModelState);

			var role = _roleService.GetRoleByName(request.Name);
			if (role != null)
			{
				ModelState.AddModelError("", "Role already exists");
				return StatusCode(422, ModelState);
			}

			role = new Role
			{
				Name = request.Name
			};


			if (!_roleService.AddRole(role))
			{
				ModelState.AddModelError("", "Something went wrong while saving");
				return StatusCode(500, ModelState);
			}
			return Ok("Added Successfully");
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteRole(int id)
		{
			var deletedRole = _roleService.GetRole(id);
			if (deletedRole == null)
				return NotFound();

			if (!_roleService.DeleteRole(id))
			{
				ModelState.AddModelError("", "Something went wrong while deleting the role");
			}
			return Ok("Deleted Successfully");
		}
	}
}
