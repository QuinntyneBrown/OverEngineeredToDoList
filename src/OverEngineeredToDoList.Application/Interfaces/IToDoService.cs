// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using System.Threading.Tasks;

namespace OverEngineeredToDoList.Application.Interfaces;

public interface IToDoService
{
    Task<bool> ToDoNameExist(string name);
}

