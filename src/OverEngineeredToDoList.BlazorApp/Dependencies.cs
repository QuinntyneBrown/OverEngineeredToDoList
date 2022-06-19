using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using OverEngineeredToDoList.Core.Interfaces;
using OverEngineeredToDoList.Infrastructure.Data;

public static class Dependencies
    {
        public static void Configure(IServiceCollection services)
        {

            services.AddHttpContextAccessor();

            services.AddMediatR(typeof(IOverEngineeredToDoListDbContext));

            services.AddTransient<IOverEngineeredToDoListDbContext, OverEngineeredToDoListDbContext>();

            services.AddDbContext<OverEngineeredToDoListDbContext>(options =>
            {
                options.UseInMemoryDatabase(nameof(OverEngineeredToDoList.BlazorApp))
                .LogTo(Console.WriteLine)
                .EnableSensitiveDataLogging();
            });
        }
    }