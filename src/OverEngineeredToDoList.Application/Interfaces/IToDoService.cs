using System.Threading.Tasks;

namespace OverEngineeredToDoList.Application.Interfaces
{
    public interface IToDoService
    {
        Task<bool> ToDoNameExist(string name);
    }
}
