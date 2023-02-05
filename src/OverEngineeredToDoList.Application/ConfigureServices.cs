using FluentValidation;
using MediatR;
using OverEngineeredToDoList.Application.Behaviors;
using OverEngineeredToDoList.Application.Interfaces;
using OverEngineeredToDoList.Application.Services;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace Microsoft.Extensions.DependencyInjection;

public static class ConfigureServices { 

    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddValidation(typeof(ToDoService));

        services.AddMediatR(typeof(IOverEngineeredToDoListDbContext));

    }

    public static IServiceCollection AddValidation(this IServiceCollection services, Type type)
    {
        services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

        foreach (var requestType in GetAllTypesImplementingOpenGenericType(typeof(IRequest<>), type.Assembly))
        {
            var validatorType = typeof(IValidator<>).MakeGenericType(requestType);

            foreach (var validatorImpl in Assembly.GetExecutingAssembly().GetTypes().Where(v => validatorType.IsAssignableFrom(v)))
            {
                services.AddTransient(validatorType, validatorImpl);
            }
        }
        return services;
    }

    public static IEnumerable<Type> GetAllTypesImplementingOpenGenericType(Type openGenericType, Assembly assembly)
    {
        return from types in assembly.GetTypes()
               from interfaces in types.GetInterfaces()
               let baseType = types.BaseType
               where
               (baseType != null && baseType.IsGenericType &&
               openGenericType.IsAssignableFrom(baseType.GetGenericTypeDefinition())) ||
               (interfaces.IsGenericType &&
               openGenericType.IsAssignableFrom(interfaces.GetGenericTypeDefinition()))
               select types;
    }
}
