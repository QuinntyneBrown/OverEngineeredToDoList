// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.EntityFrameworkCore;
using OverEngineeredToDoList.Application.Interfaces;
using System;
using System.Threading.Tasks;

namespace OverEngineeredToDoList.Application.Services;

public class ToDoService: IToDoService
{
    private readonly IOverEngineeredToDoListDbContext _context;

    public ToDoService(IOverEngineeredToDoListDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<bool> ToDoNameExist(string name)
    {
        return await _context.ToDos.AsNoTracking().SingleOrDefaultAsync(x => x.Name == name) != null;
    }
}

