using Microsoft.EntityFrameworkCore;
using UserManagmentAppAPI.Models;

namespace UserManagmentAppAPI.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions options) : base(options)
		{

		}
		public DbSet<Blog> Blogs { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<Role> Roles { get; set; }
	}
}
