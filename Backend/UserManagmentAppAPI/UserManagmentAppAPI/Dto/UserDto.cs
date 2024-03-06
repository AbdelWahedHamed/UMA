namespace UserManagmentAppAPI.Dto
{
	public class UserDto
	{
		public string Name { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public DateTime DateOfBirth { get; set; }
		public int RoleId { get; set; }
	}
}
