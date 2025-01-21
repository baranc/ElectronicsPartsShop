using ElectronicsPartsShop.Server.Data;
using ElectronicsPartsShop.Server.Models;
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
builder.Services.AddDirectoryBrowser();
var app = builder.Build();
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


using var scope = app.Services.CreateScope();
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