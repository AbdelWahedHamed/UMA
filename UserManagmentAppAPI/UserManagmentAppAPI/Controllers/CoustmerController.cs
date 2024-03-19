using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;


namespace UserManagmentAppAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CoustmerController : ControllerBase
	{

		[HttpGet, Authorize]
		public IEnumerable<string> Get()
			{
				return new string[] { "John Doe", "Jane Doe" };
			}
	}
}
