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
