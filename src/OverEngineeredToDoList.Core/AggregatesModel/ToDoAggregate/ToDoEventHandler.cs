using MediatR;
using OverEngineeredToDoList.Core.AggregatesModel.ToDoAggregate.Events;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace OverEngineeredToDoList.Core.AggregatesModel.ToDoAggregate
{
    internal class ToDoEventHandler : INotificationHandler<NameChangeRequest>
    {
        public Task Handle(NameChangeRequest notification, CancellationToken cancellationToken)
        {
            throw new NotImplementedException();
        }
    }
}
