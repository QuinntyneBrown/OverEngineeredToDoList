using System.Net;
using System.Threading;
using System.Threading.Tasks;
using OverEngineeredToDoList.Application;
using MediatR;
using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;
using System.Net.Mime;

namespace OverEngineeredToDoList.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Produces(MediaTypeNames.Application.Json)]
[Consumes(MediaTypeNames.Application.Json)]
public class ToDoController
{
    private readonly IMediator _mediator;
    private readonly ILogger<ToDoController> _logger;

    public ToDoController(IMediator mediator, ILogger<ToDoController> logger)
    {
        _mediator = mediator ?? throw new ArgumentNullException(nameof(mediator));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    [SwaggerOperation(
        Summary = "Get ToDo by id.",
        Description = @"Get ToDo by id."
    )]
    [HttpGet("{toDoId:guid}", Name = "getToDoById")]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.NotFound)]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetToDoByIdResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetToDoByIdResponse>> GetById([FromRoute]Guid toDoId, CancellationToken cancellationToken)
    {
        var request = new GetToDoByIdRequest() { ToDoId = toDoId };
    
        var response = await _mediator.Send(request, cancellationToken);
    
        if (response.ToDo == null)
        {
            return new NotFoundObjectResult(request.ToDoId);
        }
    
        return response;
    }
    
    [SwaggerOperation(
        Summary = "Get ToDos.",
        Description = @"Get ToDos."
    )]
    [HttpGet(Name = "getToDos")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetToDosResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetToDosResponse>> Get(CancellationToken cancellationToken)
    {
        return await _mediator.Send(new GetToDosRequest(), cancellationToken);
    }
    
    [SwaggerOperation(
        Summary = "Create ToDo.",
        Description = @"Create ToDo."
    )]
    [HttpPost(Name = "createToDo")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(CreateToDoResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<CreateToDoResponse>> Create([FromBody]CreateToDoRequest request, CancellationToken cancellationToken)
    {
        _logger.LogInformation(
            "----- Sending command: {CommandName}: ({@Command})",
            nameof(CreateToDoRequest),
            request);
    
        return await _mediator.Send(request, cancellationToken);
    }
    
    [SwaggerOperation(
        Summary = "Get ToDo Page.",
        Description = @"Get ToDo Page."
    )]
    [HttpGet("page/{pageSize}/{index}", Name = "getToDosPage")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(GetToDosPageResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<GetToDosPageResponse>> Page([FromRoute]int pageSize, [FromRoute]int index, CancellationToken cancellationToken)
    {
        var request = new GetToDosPageRequest { Index = index, PageSize = pageSize };
    
        return await _mediator.Send(request, cancellationToken);
    }
    
    [SwaggerOperation(
        Summary = "Update ToDo.",
        Description = @"Update ToDo."
    )]
    [HttpPut(Name = "updateToDo")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(UpdateToDoResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<UpdateToDoResponse>> Update([FromBody]UpdateToDoRequest request, CancellationToken cancellationToken)
    {
        _logger.LogInformation(
            "----- Sending command: {CommandName} - {IdProperty}: {CommandId} ({@Command})",
            nameof(UpdateToDoRequest),
            nameof(request.ToDoId),
            request.ToDoId,
            request);
    
        return await _mediator.Send(request, cancellationToken);
    }
    
    [SwaggerOperation(
        Summary = "Delete ToDo.",
        Description = @"Delete ToDo."
    )]
    [HttpDelete("{toDoId:guid}", Name = "removeToDo")]
    [ProducesResponseType((int)HttpStatusCode.InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType(typeof(RemoveToDoResponse), (int)HttpStatusCode.OK)]
    public async Task<ActionResult<RemoveToDoResponse>> Remove([FromRoute]Guid toDoId, CancellationToken cancellationToken)
    {
        var request = new RemoveToDoRequest() { ToDoId = toDoId };
    
        _logger.LogInformation(
            "----- Sending command: {CommandName} - {IdProperty}: {CommandId} ({@Command})",
            nameof(RemoveToDoRequest),
            nameof(request.ToDoId),
            request.ToDoId,
            request);
    
        return await _mediator.Send(request, cancellationToken);
    }
    
}
