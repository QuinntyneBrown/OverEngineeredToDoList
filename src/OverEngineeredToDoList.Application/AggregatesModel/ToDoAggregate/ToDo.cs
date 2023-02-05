// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using System;

namespace OverEngineeredToDoList.Application
{
    public class ToDo
    {
        public Guid ToDoId { get; private set; }
        public string Name { get; private set; }
        public bool Complete { get; private set; }

        public ToDo(string name)
        {
            Name = name;
        }

        public void Update(string name, bool complete)
        {
            Name = name;
            Complete = complete;    
        }

        private ToDo()
        {

        }
    }
}

