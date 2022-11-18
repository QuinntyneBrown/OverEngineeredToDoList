using Microsoft.EntityFrameworkCore;
using OverEngineeredToDoList.Application;
using OverEngineeredToDoList.Application.Interfaces;

namespace OverEngineeredToDoList.Infrastructure.Data;

public class OverEngineeredToDoListDbContext: DbContext, IOverEngineeredToDoListDbContext
{
    public DbSet<ToDo> ToDos { get; private set; }
    public OverEngineeredToDoListDbContext(DbContextOptions options)
        :base(options) { }

}
