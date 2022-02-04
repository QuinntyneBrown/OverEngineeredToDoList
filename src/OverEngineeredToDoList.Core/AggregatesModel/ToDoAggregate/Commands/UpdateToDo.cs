using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OverEngineeredToDoList.Core.Interfaces;
using OverEngineeredToDoList.SharedKernal;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace OverEngineeredToDoList.Core
{

    public class UpdateToDoValidator: AbstractValidator<UpdateToDoRequest>
    {
        public UpdateToDoValidator()
        {
            RuleFor(x => x.Name).NotNull().NotEmpty();
            RuleFor(x => x.Complete).Equal(false);
        }
    }

    public class UpdateToDoRequest: IRequest<UpdateToDoResponse>
    {
        public Guid ToDoId { get; set; }
        public string Name { get; set; }
        public bool Complete { get; set; }
    }
    public class UpdateToDoResponse: ResponseBase
    {
        public ToDoDto ToDo { get; set; }
    }
    public class UpdateToDoHandler: IRequestHandler<UpdateToDoRequest, UpdateToDoResponse>
    {
        private readonly IOverEngineeredToDoListDbContext _context;
        private readonly ILogger<UpdateToDoHandler> _logger;
    
        public UpdateToDoHandler(IOverEngineeredToDoListDbContext context, ILogger<UpdateToDoHandler> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
    
        public async Task<UpdateToDoResponse> Handle(UpdateToDoRequest request, CancellationToken cancellationToken)
        {
            var toDo = await _context.ToDos.SingleAsync(x => x.ToDoId == request.ToDoId);

            toDo.Update(request.Name, request.Complete);

            await _context.SaveChangesAsync(cancellationToken);
            
            return new ()
            {
                ToDo = toDo.ToDto()
            };
        }
        
    }

}
