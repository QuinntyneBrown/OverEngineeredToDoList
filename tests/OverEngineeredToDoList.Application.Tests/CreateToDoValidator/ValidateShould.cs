// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

namespace OverEngineeredToDoList.Application.Tests.CreateToDoValidator;

using CreateToDoValidator = OverEngineeredToDoList.Application.CreateToDoValidator;

public class ValidateShould {

    [Fact]
    public void ReturnInvalidResult_GivenInvalidRequest()
    {
        // ARRANGE
        var sut = new CreateToDoValidator();

        // ACT
        var validationResult = sut.Validate(new CreateToDoRequest()
        {
            Name = null
        });

        // ASSERT
        Assert.False(validationResult.IsValid);
    }
}