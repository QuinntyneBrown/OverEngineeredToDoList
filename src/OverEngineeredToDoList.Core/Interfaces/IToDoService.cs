using System.Threading.Tasks;

namespace OverEngineeredToDoList.Core.Interfaces
{
    public interface IToDoService
    {
        Task<bool> ToDoNameExist(string name);
    }
}
