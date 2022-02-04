using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging;
using OverEngineeredToDoList.Core.Interfaces;
using OverEngineeredToDoList.SharedKernal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OverEngineeredToDoList.Core
{

    public class GetToDosRequest: IRequest<GetToDosResponse> { }
    public class GetToDosResponse: ResponseBase
    {
        public List<ToDoDto> ToDos { get; set; }
    }
    public class GetToDosHandler: IRequestHandler<GetToDosRequest, GetToDosResponse>
    {
        private readonly IOverEngineeredToDoListDbContext _context;
        private readonly ILogger<GetToDosHandler> _logger;
    
        public GetToDosHandler(IOverEngineeredToDoListDbContext context, ILogger<GetToDosHandler> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
    
        public async Task<GetToDosResponse> Handle(GetToDosRequest request, CancellationToken cancellationToken)
        {
            return new () {
                ToDos = await _context.ToDos.AsNoTracking().ToDtosAsync(cancellationToken)
            };
        }
        
    }

}
