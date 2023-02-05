// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using MediatR;

namespace OverEngineeredToDoList.Application.AggregatesModel.ToDoAggregate.Events;

public class NameChangeRequest: INotification
{
    public string Name { get; set; }
}

