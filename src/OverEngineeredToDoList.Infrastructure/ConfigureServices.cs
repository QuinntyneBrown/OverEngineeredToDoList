// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.EntityFrameworkCore;
using OverEngineeredToDoList.Application.Interfaces;
using OverEngineeredToDoList.Infrastructure.Data;
using System;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices { 

    public static void AddInfrastructureServices(this IServiceCollection services)
    {
        services.AddTransient<IOverEngineeredToDoListDbContext, OverEngineeredToDoListDbContext>();

        services.AddDbContext<OverEngineeredToDoListDbContext>(options =>
        {
            options.UseInMemoryDatabase(nameof(OverEngineeredToDoList))
            .LogTo(Console.WriteLine)
            .EnableSensitiveDataLogging();
        });
    }
}

