using OverEngineeredToDoList.Core;
using OverEngineeredToDoList.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;

namespace OverEngineeredToDoList.Infrastructure.Data
{
    public class OverEngineeredToDoListDbContext: DbContext, IOverEngineeredToDoListDbContext
    {
        public DbSet<ToDo> ToDos { get; private set; }
        public OverEngineeredToDoListDbContext(DbContextOptions options)
            :base(options) { }

    }
}
