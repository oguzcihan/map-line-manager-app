using Microsoft.AspNetCore.Mvc;
using WebApplicationMap.Models;
using WebApplicationMap.Services;

namespace WebApplicationMap.Controllers;

[ApiController]
[Route("api/drawings")]
public class DrawingsController : ControllerBase
{
    private readonly IFileService _fileService;

    public DrawingsController(IFileService fileService)
    {
        _fileService = fileService;
    }

    [HttpPost("add")]
    public IActionResult AddDrawing([FromBody] Drawing drawing)
    {
        _fileService.SaveDrawing(drawing);
        return Ok();
    }

    [HttpGet("get")]
    public IActionResult GetDrawings()
    {
        var drawings = _fileService.GetDrawings();
        return Ok(drawings);
    }
}