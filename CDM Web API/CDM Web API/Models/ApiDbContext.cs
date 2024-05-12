using Microsoft.EntityFrameworkCore;
using CDM_Web_API.Models;

namespace CDM_Web_API.Models
{
    public class ApiDbContext:DbContext
    {
        public ApiDbContext(DbContextOptions options):base(options)
        {

        }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Logs> Logs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Customer>()
                .HasKey(c => c.Gstin);

            modelBuilder.Entity<Account>()
                .HasKey(a => a.Email);

            modelBuilder.Entity<Admin>()
                .HasKey(a => a.Email);

            modelBuilder.Entity<Logs>()
                .HasKey(l => l.LogId);

            modelBuilder.Entity<Customer>()
                .HasMany(c => c.Accounts)
                .WithOne(a => a.Customer)
                .HasForeignKey(a => a.Gstin);


        }

    }
}
