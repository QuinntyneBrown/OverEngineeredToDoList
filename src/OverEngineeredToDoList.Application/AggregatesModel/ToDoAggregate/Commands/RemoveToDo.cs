using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using OverEngineeredToDoList.Application.Interfaces;
using OverEngineeredToDoList.Domain;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace OverEngineeredToDoList.Application
{
    public class RemoveToDoValidator : AbstractValidator<RemoveToDoRequest>
    {
        public RemoveToDoValidator()
        {
            RuleFor(x => x.ToDoId)
                .NotEqual(default(Guid));
        }
    }

    public class RemoveToDoRequest: IRequest<RemoveToDoResponse>
    {
        public Guid ToDoId { get; set; }
    }

    public class RemoveToDoResponse: ResponseBase
    {
        public ToDoDto ToDo { get; set; }
    }

    public class RemoveToDoHandler: IRequestHandler<RemoveToDoRequest, RemoveToDoResponse>
    {
        private readonly IOverEngineeredToDoListDbContext _context;
        private readonly ILogger<RemoveToDoHandler> _logger;
    
        public RemoveToDoHandler(IOverEngineeredToDoListDbContext context, ILogger<RemoveToDoHandler> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
    
        public async Task<RemoveToDoResponse> Handle(RemoveToDoRequest request, CancellationToken cancellationToken)
        {
            var toDo = await _context.ToDos.FindAsync(request.ToDoId);
            
            _context.ToDos.Remove(toDo);
            
            await _context.SaveChangesAsync(cancellationToken);
            
            return new ()
            {
                ToDo = toDo.ToDto()
            };
        }
        
    }

}
