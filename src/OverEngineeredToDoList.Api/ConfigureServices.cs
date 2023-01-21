using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using System;
using System.IO;
using System.Reflection;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices
{
    public static void AddApiServices(this IServiceCollection services)
    {
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new OpenApiInfo
            {
                Version = "v1",
                Title = "OverEngineeredToDoList",
                Description = "",
                TermsOfService = new Uri("https://example.com/terms"),
                Contact = new OpenApiContact
                {
                    Name = "",
                    Email = ""
                },
                License = new OpenApiLicense
                {
                    Name = "Use under MIT",
                    Url = new Uri("https://opensource.org/licenses/MIT"),
                }
            });

            options.EnableAnnotations();
            
            var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
            options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));

        }).AddSwaggerGenNewtonsoftSupport();

        services.AddCors(options => options.AddPolicy("CorsPolicy",
            builder => builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader()
            .SetIsOriginAllowed(isOriginAllowed: _ => true)
            .AllowCredentials()));

        services.AddHttpContextAccessor();

        services.AddControllers()
            .AddNewtonsoftJson();
    }
}
