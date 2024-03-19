using System.ComponentModel.DataAnnotations;

namespace UserManagmentAppAPI.Dto
{
	public class ForgetPasswordDto
	{
		[Required]
		[EmailAddress]
		public string? Email { get; set; }
		[Required]
		public string? ClientURI { get; set; }
	}
}
