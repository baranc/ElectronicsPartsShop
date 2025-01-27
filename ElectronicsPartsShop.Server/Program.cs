using ElectronicsPartsShop.Server.Data;
using ElectronicsPartsShop.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ShopDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
//builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
//{
//    options.Password.RequireDigit = false;
//    options.Password.RequireLowercase = false;
//    options.Password.RequireUppercase = false;
//    options.Password.RequireNonAlphanumeric = false;
//    options.Password.RequiredLength = 6;
//})
//.AddEntityFrameworkStores<ShopDbContext>() 
//.AddDefaultTokenProviders();


/*builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
    options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
    options.DefaultSignInScheme = IdentityConstants.ApplicationScheme;
}).AddCookie(IdentityConstants.ApplicationScheme);*/

/*builder.Services.AddIdentity<AppUser, IdentityRole>()
            .AddEntityFrameworkStores<ShopDbContext>()
            .AddDefaultTokenProviders();
*/

builder.Services.AddDirectoryBrowser();
builder.Services.AddSingleton<System.TimeProvider>(System.TimeProvider.System);
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<AppUser>()
    .AddEntityFrameworkStores<ShopDbContext>();
var app = builder.Build();
app.MapIdentityApi<AppUser>();
app.UseCors();
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseStaticFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
            Path.Combine(builder.Environment.ContentRootPath, "wwwroot2")),
    RequestPath = "/wwwroot2"
});
app.UseRouting();
app.MapControllers();
app.MapFallbackToFile("index.html");
app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
        c.RoutePrefix = string.Empty; // Pozwala na dostêp do Swaggera pod "/" zamiast "/swagger"
    });
}

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();

    // Tworzenie ról
    string[] roles = { "Admin", "User" };
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }

    // Tworzenie u¿ytkownika administratora (opcjonalnie)
    var adminUser = await userManager.FindByNameAsync("admin");
    if (adminUser == null)
    {
        var newAdmin = new AppUser { UserName = "admin", Email = "admin@example.com" };
        await userManager.CreateAsync(newAdmin, "123456");
        await userManager.AddToRoleAsync(newAdmin, "Admin");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"B³¹d podczas seedowania ról lub u¿ytkownika: {ex.Message}");
}
var dbContext = scope.ServiceProvider.GetRequiredService<ShopDbContext>();
if (!dbContext.Products.Any())
{
    dbContext.Products.AddRange(
        new Product { Name = "Product 1", Description = "Description 1", Price = 19.99M, ImagePath = "img/098_01.jpg" },
        new Product { Name = "Product 2", Description = "Description 2", Price = 29.99M, ImagePath = "D:\\informatyka - studia\\semestr_5\\Technologie webowe\\Projekt\\ElectronicsPartsShop\\electronicspartsshop.client\\img\\098_01.jpg" }
    );
    dbContext.SaveChanges();
}
app.Run();