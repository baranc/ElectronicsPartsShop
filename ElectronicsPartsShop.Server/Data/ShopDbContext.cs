using Microsoft.EntityFrameworkCore;
using ElectronicsPartsShop.Server.Models;
using System.Collections.Generic;

namespace ElectronicsPartsShop.Server.Data
{
    public class ShopDbContext : DbContext
    {
        public ShopDbContext(DbContextOptions<ShopDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
    }
}
