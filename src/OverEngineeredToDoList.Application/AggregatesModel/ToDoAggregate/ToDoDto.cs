// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using System;

namespace OverEngineeredToDoList.Application
{
    public class ToDoDto
    {
        public Guid ToDoId { get; set; }
        public string Name { get; set; }
        public bool Complete { get; set; }
    }
}

