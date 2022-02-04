using System;

namespace OverEngineeredToDoList.Core
{
    public class ToDo
    {
        public Guid ToDoId { get; set; }
        public string Name { get; set; }
        public bool Complete { get; set; }
    }
}
