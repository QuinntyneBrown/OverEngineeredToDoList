// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using MediatR;
using OverEngineeredToDoList.Application.AggregatesModel.ToDoAggregate.Events;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace OverEngineeredToDoList.Application.AggregatesModel.ToDoAggregate;

internal class ToDoEventHandler : INotificationHandler<NameChangeRequest>
{
    public Task Handle(NameChangeRequest notification, CancellationToken cancellationToken)
    {
        throw new NotImplementedException();
    }
}

