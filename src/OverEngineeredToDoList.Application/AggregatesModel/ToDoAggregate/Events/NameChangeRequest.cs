using MediatR;

namespace OverEngineeredToDoList.Application.AggregatesModel.ToDoAggregate.Events
{
    public class NameChangeRequest: INotification
    {
        public string Name { get; set; }
    }
}
