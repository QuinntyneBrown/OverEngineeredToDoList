using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OverEngineeredToDoList.Application.Interfaces;
using OverEngineeredToDoList.Domain;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace OverEngineeredToDoList.Application
{

    public class GetToDoByIdRequest: IRequest<GetToDoByIdResponse>
    {
        public Guid ToDoId { get; set; }
    }
    public class GetToDoByIdResponse: ResponseBase
    {
        public ToDoDto ToDo { get; set; }
    }
    public class GetToDoByIdHandler: IRequestHandler<GetToDoByIdRequest, GetToDoByIdResponse>
    {
        private readonly IOverEngineeredToDoListDbContext _context;
        private readonly ILogger<GetToDoByIdHandler> _logger;
    
        public GetToDoByIdHandler(IOverEngineeredToDoListDbContext context, ILogger<GetToDoByIdHandler> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
    
        public async Task<GetToDoByIdResponse> Handle(GetToDoByIdRequest request, CancellationToken cancellationToken)
        {
            return new () {
                ToDo = (await _context.ToDos.AsNoTracking().SingleOrDefaultAsync(x => x.ToDoId == request.ToDoId)).ToDto()
            };
        }
        
    }

}
