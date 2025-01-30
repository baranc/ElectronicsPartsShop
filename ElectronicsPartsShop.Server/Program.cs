using ElectronicsPartsShop.Server.Data;
using ElectronicsPartsShop.Server.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using System;

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

builder.Services.AddAuthentication();
builder.Services.AddLogging(logging =>
{
    logging.AddConsole();
    logging.AddDebug();
});

builder.Services.AddDirectoryBrowser();
builder.Services.AddSingleton<System.TimeProvider>(System.TimeProvider.System);
builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<AppUser>().AddRoles<IdentityRole>().AddEntityFrameworkStores<ShopDbContext>();
builder.Services.ConfigureApplicationCookie(options => { options.Cookie.SameSite = SameSiteMode.None; });
var app = builder.Build();
app.MapIdentityApi<AppUser>();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials()
    .WithOrigins("http://localhost:4200", "https://localhost:4200"));
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
        c.RoutePrefix = string.Empty; 
    });
}

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();

    string[] roles = { "Admin", "User" };
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }

    
}
catch (Exception ex)
{
    Console.WriteLine($"B³¹d podczas seedowania ról lub u¿ytkownika: {ex.Message}");
}
try
{
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    var adminUser = await userManager.FindByNameAsync("admin9@a.pl");
    if (adminUser == null)
    {
        var newAdmin = new AppUser
        {
            Email = "admin9@a.pl",
            EmailConfirmed = true 
        };

        var createResult = await userManager.CreateAsync(newAdmin, "A1!aaa");

        if (createResult.Succeeded)
        {
            var roleResult = await userManager.AddToRoleAsync(newAdmin, "Admin");
            if (!roleResult.Succeeded)
            {
                throw new Exception($"Nie uda³o siê przypisaæ roli: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
            }
        }
        else
        {
            throw new Exception($"Nie uda³o siê utworzyæ u¿ytkownika: {string.Join(", ", createResult.Errors.Select(e => e.Description))}");
        }
    }
    else
    {
        Console.WriteLine("U¿ytkownik ju¿ istnieje.");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"B³¹d podczas tworzenia u¿ytkownika lub przypisywania roli: {ex.Message}");
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