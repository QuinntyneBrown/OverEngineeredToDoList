using Microsoft.EntityFrameworkCore;
using OverEngineeredToDoList.Core;
using OverEngineeredToDoList.Core.Interfaces;

namespace OverEngineeredToDoList.Infrastructure.Data
{
    public class ToDoDbContext: DbContext, IToDoDbContext
    {
        public DbSet<ToDo> ToDos { get; private set; }
        public ToDoDbContext(DbContextOptions options)
            :base(options) { }

    }
}
