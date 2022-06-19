using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;

namespace OverEngineeredToDoList.Core.Interfaces
{
    public interface IToDoDbContext
    {
        DbSet<ToDo> ToDos { get; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        
    }
}
