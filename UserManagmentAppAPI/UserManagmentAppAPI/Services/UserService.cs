﻿using UserManagmentAppAPI.Data;
using UserManagmentAppAPI.Models;
using Microsoft.EntityFrameworkCore;


namespace UserManagmentAppAPI.Services
{
	public class UserService
	{
		private readonly DataContext _context;
		public UserService(DataContext context)
		{
			_context = context;
		}

		public List<User> GetUsers()
		{
			return  _context.Users.Include(u => u.Role).ToList();
		}

		public User GetUser(int id)
		{
			return  _context.Users.FirstOrDefault(r => r.Id == id);
		}
		public User GetUserByName(string name)
		{
			return _context.Users.FirstOrDefault(r => r.Name == name);
		}
		public User GetUserByEmail(string email)
		{
			return _context.Users.FirstOrDefault(r => r.Email == email);
		}

		public bool AddUser(User user)
		{
			if (user != null)
			{
				_context.Users.Add(user);
				_context.SaveChanges();
				return true;
			}
			return false;
		}
		
		public bool SignIn(string email , string password)
		{

			if((_context.Users.FirstOrDefault(u => u.Email == email) != null) && (_context.Users.FirstOrDefault(u => u.PasswordHash == password)) != null)
				return true;

			return false;
		}

		public bool ResetPassword(string newPassword , string email)
		{
			var user = _context.Users.FirstOrDefault(u => u.Email == email);
			if(user != null)
			{
				user.PasswordHash = newPassword;
				_context.SaveChanges();
				return true;
			}
			return false;
		}

		public bool EmailThere(string email)
		{
			if (_context.Users.FirstOrDefault(u => u.Email == email) != null)
				return true;

			return false;
		}
		public bool DeleteUser(int id)
		{
			var deletedUser =  GetUser(id);

			if (deletedUser != null)
			{
				_context.Users.Remove(deletedUser);
				 _context.SaveChanges();
				return true;
			}
			return false;
		}
	}
}
