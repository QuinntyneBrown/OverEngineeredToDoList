using MediatR;

namespace OverEngineeredToDoList.Core.AggregatesModel.ToDoAggregate.Events
{
    public class NameChangeRequest: INotification
    {
        public string Name { get; set; }
    }
}
