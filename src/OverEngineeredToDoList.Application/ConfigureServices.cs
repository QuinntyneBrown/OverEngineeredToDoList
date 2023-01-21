using MediatR;
using OverEngineeredToDoList.Application.Extensions;
using OverEngineeredToDoList.Application.Interfaces;
using OverEngineeredToDoList.Application.Services;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices { 

    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddValidation(typeof(ToDoService));

        services.AddMediatR(typeof(IOverEngineeredToDoListDbContext));

    }
}
