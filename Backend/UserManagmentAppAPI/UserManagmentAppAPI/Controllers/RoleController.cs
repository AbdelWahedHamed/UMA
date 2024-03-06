using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserManagmentAppAPI.Data;
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
		public async Task<IActionResult> GetRoles()
		{
			var roles = _roleService.GetRoles();
			return Ok(roles);
		}

        [HttpPost]
		public async Task<IActionResult> CreateRole (Role request)
		{
			if(request == null)
				return BadRequest(ModelState);

			var role = _roleService.GetRoleByName(request.Name);
			if(role != null)
			{
				ModelState.AddModelError("", "Role already exists");
				return StatusCode(422, ModelState);
			}
			_roleService.AddRole(request);
			return Ok(role);
		}
	}
}
