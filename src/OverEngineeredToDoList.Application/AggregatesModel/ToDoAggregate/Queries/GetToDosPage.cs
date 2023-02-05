// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OverEngineeredToDoList.Application.Interfaces;
using OverEngineeredToDoList.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace OverEngineeredToDoList.Application
{

    public class GetToDosPageRequest: IRequest<GetToDosPageResponse>
    {
        public int PageSize { get; set; }
        public int Index { get; set; }
    }
    public class GetToDosPageResponse: ResponseBase
    {
        public int Length { get; set; }
        public List<ToDoDto> Entities { get; set; }
    }
    public class GetToDosPageHandler: IRequestHandler<GetToDosPageRequest, GetToDosPageResponse>
    {
        private readonly IOverEngineeredToDoListDbContext _context;
        private readonly ILogger<GetToDosPageHandler> _logger;
    
        public GetToDosPageHandler(IOverEngineeredToDoListDbContext context, ILogger<GetToDosPageHandler> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }
    
        public async Task<GetToDosPageResponse> Handle(GetToDosPageRequest request, CancellationToken cancellationToken)
        {
            var query = from toDo in _context.ToDos
                select toDo;
            
            var length = await _context.ToDos.AsNoTracking().CountAsync();
            
            var toDos = await query.Page(request.Index, request.PageSize).AsNoTracking()
                .Select(x => x.ToDto()).ToListAsync();
            
            return new ()
            {
                Length = length,
                Entities = toDos
            };
        }
        
    }

}

