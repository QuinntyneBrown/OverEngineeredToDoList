using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Threading;

namespace OverEngineeredToDoList.Application
{
    public static class ToDoExtensions
    {
        public static ToDoDto ToDto(this ToDo toDo)
        {
            return new ()
            {
                ToDoId = toDo.ToDoId,
                Name = toDo.Name,
                Complete = toDo.Complete
            };
        }
        
        public static async Task<List<ToDoDto>> ToDtosAsync(this IQueryable<ToDo> toDos, CancellationToken cancellationToken)
        {
            return await toDos.Select(x => x.ToDto()).ToListAsync(cancellationToken);
        }
        
        public static List<ToDoDto> ToDtos(this IEnumerable<ToDo> toDos)
        {
            return toDos.Select(x => x.ToDto()).ToList();
        }       
    }
}
