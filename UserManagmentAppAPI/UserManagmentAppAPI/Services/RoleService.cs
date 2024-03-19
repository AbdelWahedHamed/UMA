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

		public List<Role> GetRoles()
		{
			var roles =  _context.Roles.OrderBy(r => r.Name).ToList();
			return  roles;
        }

		public  Role GetRole(int id)
		{
			return  _context.Roles.FirstOrDefault(r => r.Id == id);
		}

		public Role GetRoleByName(string name)
		{
			return _context.Roles.FirstOrDefault(r => r.Name == name);
		}

		public bool AddRole(Role role)
		{

			if (role != null )
			{
				_context.Roles.Add(role);
				_context.SaveChanges();
				return true;
			}
			return false;
		}

		public bool DeleteRole(int id) 
		{
			var deletedRole =  GetRole(id);

			if (deletedRole != null)
			{
				_context.Roles.Remove(deletedRole); 
				 _context.SaveChanges(); 
				return true;
			}
			return false;
		}
	}
}
