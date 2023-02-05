// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using MediatR;
using System;
using System.Threading.Tasks;

namespace OverEngineeredToDoList.Domain;

public static class DomainEvents
{
    public static Func<IMediator> Mediator { get; set; }
    public static async Task Raise<T>(T args) where T : INotification
    {
        var mediator = Mediator.Invoke();
        await mediator.Publish<T>(args);
    }
}

