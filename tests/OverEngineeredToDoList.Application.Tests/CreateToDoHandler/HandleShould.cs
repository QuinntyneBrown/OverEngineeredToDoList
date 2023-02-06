// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using Microsoft.Extensions.DependencyInjection;
using Moq;
using OverEngineeredToDoList.Application.Interfaces;

namespace OverEngineeredToDoList.Application.Tests.CreateToDoHandler;

using CreateToDoHandler = OverEngineeredToDoList.Application.CreateToDoHandler;

public class HandleShould
{
    [Fact]
    public async Task PersistToDto()
    {
        // ARRANGE
        var services = new ServiceCollection();

        services.AddLogging();

        var mockDbContext = new Mock<IOverEngineeredToDoListDbContext>();

        services.AddSingleton<IOverEngineeredToDoListDbContext>(mockDbContext.Object);

        var container = services.BuildServiceProvider();

        var sut = ActivatorUtilities.CreateInstance<CreateToDoHandler>(container);

        // ACT

        

        // ASSERT

    }

}


