// Copyright (c) Quinntyne Brown. All Rights Reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

using System.Collections.Generic;

namespace OverEngineeredToDoList.Domain;

public class ResponseBase
{
    public List<string> ValidationErrors { get; set; }
}

