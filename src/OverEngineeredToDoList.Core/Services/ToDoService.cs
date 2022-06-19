using Microsoft.EntityFrameworkCore;
using OverEngineeredToDoList.Core.Interfaces;
using System.Threading.Tasks;

namespace OverEngineeredToDoList.Core.Services
{
    public class ToDoService: IToDoService
    {
        private readonly IToDoDbContext _context;

        public ToDoService(IToDoDbContext context)
        {
            _context = context;
        }

        public async Task<bool> ToDoNameExist(string name)
        {
            return await _context.ToDos.AsNoTracking().SingleOrDefaultAsync(x => x.Name == name) != null;
        }
    }
}
