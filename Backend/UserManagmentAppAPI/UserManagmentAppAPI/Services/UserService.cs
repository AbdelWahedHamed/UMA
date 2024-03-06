using UserManagmentAppAPI.Data;
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

		public async Task<List<User>> GetUsers()
		{
			return await _context.Users.OrderBy(r => r.Name).ToListAsync();
		}

		public async Task<User> GetUsers(int id)
		{
			return await _context.Users.FirstOrDefaultAsync(r => r.Id == id);
		}

		public async Task AddUser(User user)
		{
			await _context.Users.AddAsync(user);
			await _context.SaveChangesAsync();
		}

		public async Task DeleteUser(int id)
		{
			var deletedUser = await GetUsers(id);

			if (deletedUser != null)
			{
				_context.Users.Remove(deletedUser);
				await _context.SaveChangesAsync();
			}
		}
	}
}
