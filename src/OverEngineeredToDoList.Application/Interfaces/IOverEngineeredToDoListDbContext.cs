// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Threading;

namespace OverEngineeredToDoList.Application.Interfaces;

public interface IOverEngineeredToDoListDbContext
{
    DbSet<ToDo> ToDos { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    
}

