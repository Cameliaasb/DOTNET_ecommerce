using SogeVet.Server.Data;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(
    options =>
   {
       options.AddPolicy(name: "AdminClient", policy => {
           policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
       });
   }
) ;

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<StoreContext>();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AdminClient");
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
