using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Configurar la sesión      RELV     19/09/2024
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();

// Añadir IHttpContextAccessor      RELV     19/09/2024
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Se le da uso a la sesión      RELV     19/09/2024
app.UseSession();

app.UseAuthorization();

app.MapControllerRoute(
    name: "MACOBETA",
    pattern: "{controller=Home}/{action=Login}/{id?}");

app.Run();
