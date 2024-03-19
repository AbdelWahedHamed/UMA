using EmailService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserManagmentAppAPI.Dto;
using UserManagmentAppAPI.Models;
using UserManagmentAppAPI.Services;

namespace UserManagmentAppAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private const int MinKeySizeInBits = 256;
		private readonly UserService _userService;
		private readonly IEmailSender _emailSender;


		public AuthController(UserService userService, IEmailSender emailSender)
		{
			_userService = userService;
			_emailSender = emailSender;
		}


		[HttpPost("login")]
		public IActionResult Login([FromBody] LoginModel user)
		{
			if (user == null)
			{
				return BadRequest("Invalid client request");
			}

			if (_userService.SignIn(user.UserName,user.Password))
			{
				var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom Secret key for authentication"));				

				//var secretKey = new SymmetricSecurityKey(key);
				var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
				var tokeOptions = new JwtSecurityToken(
					issuer: "https://localhost:5001",
					audience: "https://localhost:5001",
					claims: new List<Claim>(),
					expires: DateTime.Now.AddMinutes(5),
					signingCredentials: signinCredentials
				);
				var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
				return Ok(new AuthenticatedResponse { Token = tokenString });
			}

			return Unauthorized();
		}
		[HttpPost("ForgotPassword")]
		public  IActionResult ForgotPassword([FromBody] ForgetPasswordDto forgotPasswordDto)
		{
			if (!ModelState.IsValid)
				return BadRequest();

			  
			if (!_userService.EmailThere(forgotPasswordDto.Email))
				 return BadRequest("Invalid Request");

			var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this is my custom Secret key for authentication"));

			//var secretKey = new SymmetricSecurityKey(key);
			var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
			var tokeOptions = new JwtSecurityToken(
				issuer: "https://localhost:5001",
				audience: "https://localhost:5001",
				claims: new List<Claim>(),
				expires: DateTime.Now.AddMinutes(5),
				signingCredentials: signinCredentials
			);

			var token = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
			var param = new Dictionary<string, string?>
			{
				{"token", token },
				{"email", forgotPasswordDto.Email }
			};

			var callback = QueryHelpers.AddQueryString(forgotPasswordDto.ClientURI, param);
			var message = new Message(new string[] { forgotPasswordDto.Email }, "Reset password token", callback);
			_emailSender.SendEmail(message);

			return Ok();
		}

		[HttpPost("ResetPassword")]
		public  IActionResult ResetPassword([FromBody] ResetPasswordDto resetPasswordDto)
		{
			if (!ModelState.IsValid)
				return BadRequest();

			var user =  _userService.GetUserByEmail(resetPasswordDto.Email);

			if (user == null)
				return BadRequest("Invalid Request");

			if (resetPasswordDto.Password != resetPasswordDto.ConfirmPassword) return BadRequest("Invalid Request");


			if (!_userService.ResetPassword(resetPasswordDto.Password, resetPasswordDto.Email))
			{
				return BadRequest("Couldn't change password");
			}
			return Ok();
		}
	}
	
}
