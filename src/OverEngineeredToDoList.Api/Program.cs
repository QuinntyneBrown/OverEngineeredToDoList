// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.AspNetCore.Builder;
using Serilog.Events;
using Serilog;
using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using OverEngineeredToDoList.Infrastructure.Data;

Log.Logger = new LoggerConfiguration()
.MinimumLevel.Override("Microsoft", LogEventLevel.Information)
.Enrich.FromLogContext()
.WriteTo.Console()
.CreateBootstrapLogger();

try
{
    Log.Information("Starting web host");

    var builder = WebApplication.CreateBuilder(args);

    builder.Services.AddApplicationServices();

    builder.Services.AddInfrastructureServices();

    builder.Services.AddApiServices();

    var app = builder.Build();

    ProcessDbCommands(args, app);

    app.UseSerilogRequestLogging(configure =>
    {
        configure.MessageTemplate = "HTTP {RequestMethod} {RequestPath} ({UserId}) responded {StatusCode} in {Elapsed:0.0000}ms";
    });

    app.UseSwagger(options => options.SerializeAsV2 = true);

    app.UseCors("CorsPolicy");

    app.UseRouting();

    app.MapControllers();

    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "OverEngineeredToDoList");
        options.RoutePrefix = string.Empty;
        options.DisplayOperationId();
    });

    app.Run();

}
catch (Exception ex)
{
    Log.Fatal(ex, "Host terminated unexpectedly");

}
finally
{
    Log.CloseAndFlush();
}

static void ProcessDbCommands(string[] args, IHost host)
{
    var services = (IServiceScopeFactory)host.Services.GetService(typeof(IServiceScopeFactory));

    using (var scope = services.CreateScope())
    {
        var context = scope.ServiceProvider.GetRequiredService<OverEngineeredToDoListDbContext>();

        var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();

        SeedData.Seed(context);
    }
}



