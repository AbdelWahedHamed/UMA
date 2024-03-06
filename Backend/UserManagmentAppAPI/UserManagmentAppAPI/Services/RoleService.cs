using Microsoft.EntityFrameworkCore;
using UserManagmentAppAPI.Data;
using UserManagmentAppAPI.Models;

namespace UserManagmentAppAPI.Services
{
	public class RoleService
	{
		private readonly DataContext _context;
		public RoleService(DataContext context)
		{
			_context = context;
		}

		public async Task<List<Role>> GetRoles()
		{
			return await _context.Roles.OrderBy(r => r.Name).ToListAsync();
		}

		public async Task<Role> GetRole(int id)
		{
			return await _context.Roles.FirstOrDefaultAsync(r => r.Id == id);
		}

		public async Task<Role> GetRoleByName(string name)
		{
			return await _context.Roles.FirstOrDefaultAsync(r => r.Name == name);
		}

		public async Task AddRole(Role role)
		{
			await _context.Roles.AddAsync(role);
			await _context.SaveChangesAsync();
		}

		public async Task DeleteRole(int id) 
		{
			var deletedRole = await GetRole(id);

			if (deletedRole != null)
			{
				_context.Roles.Remove(deletedRole); 
				await _context.SaveChangesAsync(); 
			}
		}
	}
}
