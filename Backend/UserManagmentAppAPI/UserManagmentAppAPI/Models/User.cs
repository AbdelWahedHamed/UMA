﻿namespace UserManagmentAppAPI.Models
{
	public class User
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }
		public DateTime DateOfBirth { get; set; }
		public DateTime RegisterationDate { get; set; } = DateTime.Now;
		public int RoleId { get; set; }
		public Role Role { get; set; }
	}
}
