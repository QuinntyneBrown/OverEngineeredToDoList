using FluentValidation;
using MediatR;
using Microsoft.Extensions.Logging;
using OverEngineeredToDoList.Core.Interfaces;
using OverEngineeredToDoList.SharedKernal;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace OverEngineeredToDoList.Core
{

    public class CreateToDoValidator: AbstractValidator<CreateToDoRequest>
    {
        public CreateToDoValidator()
        {
            RuleFor(x => x.Name)
                .NotNull()
                .NotEmpty();
        }
    }

    public class CreateToDoRequest: IRequest<CreateToDoResponse>
    {
        public string Name { get; set; }
    }

    public class CreateToDoResponse: ResponseBase
    {
        public ToDoDto ToDo { get; set; }
    }

    public class CreateToDoHandler: IRequestHandler<CreateToDoRequest, CreateToDoResponse>
    {
        private readonly IOverEngineeredToDoListDbContext _context;
        private readonly ILogger<CreateToDoHandler> _logger;
    
        public CreateToDoHandler(IOverEngineeredToDoListDbContext context, ILogger<CreateToDoHandler> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
    
        public async Task<CreateToDoResponse> Handle(CreateToDoRequest request, CancellationToken cancellationToken)
        {
            var toDo = new ToDo(request.Name);

            _context.ToDos.Add(toDo);
            
            await _context.SaveChangesAsync(cancellationToken);
            
            return new ()
            {
                ToDo = toDo.ToDto()
            };
        }
        
    }

}
